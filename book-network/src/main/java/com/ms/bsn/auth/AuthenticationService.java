package com.ms.bsn.auth;

import com.ms.bsn.constant.ROLE;
import com.ms.bsn.email.EmailService;
import com.ms.bsn.email.EmailTemplateName;
import com.ms.bsn.role.RoleRepository;
import com.ms.bsn.security.JwtService;
import com.ms.bsn.user.Token;
import com.ms.bsn.user.TokenRepository;
import com.ms.bsn.user.User;
import com.ms.bsn.user.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.Local;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final JwtService jwtService;
    @Value("${application.mailing.frontend.activation-url}")
    private String activationUrl;

    public void register(RegistrationRequest request) throws MessagingException {
        var roles = roleRepository.findByName(ROLE.USER).orElseThrow(() -> new IllegalStateException("Role " + ROLE.USER + " was not initialised."));
        var user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .accountLocked(false)
            .enabled(false)
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(List.of(roles))
            .build();
        userRepository.save(user);
        sendValidationMail(user);
    }

    private void sendValidationMail(User user) throws MessagingException {
        var token = generateAndSaveActivationToken(user);
        emailService.sendEmail(user.getEmail(), user.getFullName(), EmailTemplateName.ACTIVATE_ACCOUNT, activationUrl, token, "Account Activation");
    }

    private String generateAndSaveActivationToken(User user) {
        String activationCode = generateActivationCode(6);

        var token = Token.builder()
            .token(activationCode)
            .createdAt(LocalDateTime.now())
            .expiresAt(LocalDateTime.now().plusMinutes(10))
            .user(user)
            .build();
        tokenRepository.save(token);

        return activationCode;
    }

    private String generateActivationCode(int length) {
        String characters = "0123456789";
        StringBuilder codeBuilder = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();
        for(int i=0; i<length; i++){
            int randomIndex = secureRandom.nextInt(characters.length());
            codeBuilder.append(characters.charAt(randomIndex));
        }
        return codeBuilder.toString();
    }

    public AuthenticationResponse authenticate(@Valid AuthenticationRequest request) {
        var auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        var claims = new HashMap<String, Object>();
        var user = (User)auth.getPrincipal();
        claims.put("fullName", user.getFullName());

        var jwtToken = jwtService.generateToken(claims, user);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public void activateAccount(String inputToken) throws MessagingException {
        Token token = tokenRepository.findByToken(inputToken).orElseThrow(()->new RuntimeException("Invalid Token"));
        if(LocalDateTime.now().isAfter(token.getExpiresAt())) {
            sendValidationMail(token.getUser());
            throw new RuntimeException("Activation token expired, new token sent to the email.");
        }
        var user = userRepository.findById(token.getUser().getId()).orElseThrow(()->new RuntimeException("User not found"));
        user.setEnabled(true);
        userRepository.save(user);
        token.setValidatedAt(LocalDateTime.now());
        tokenRepository.save(token);
    }
}
