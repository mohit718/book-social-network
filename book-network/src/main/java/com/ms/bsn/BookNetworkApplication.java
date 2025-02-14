package com.ms.bsn;

import com.ms.bsn.constant.ROLE;
import com.ms.bsn.role.Role;
import com.ms.bsn.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
public class BookNetworkApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookNetworkApplication.class, args);
    }

    @Bean
    public CommandLineRunner init(RoleRepository roleRepository) {
        return args -> {
            if(roleRepository.findByName(ROLE.USER).isEmpty())
                roleRepository.save(new Role(ROLE.USER));
            if(roleRepository.findByName(ROLE.MANAGER).isEmpty())
                roleRepository.save(new Role(ROLE.MANAGER));
            if(roleRepository.findByName(ROLE.ADMIN).isEmpty())
                roleRepository.save(new Role(ROLE.ADMIN));
            if(roleRepository.findByName(ROLE.AUTHOR).isEmpty())
                roleRepository.save(new Role(ROLE.AUTHOR));
        };
    }
}
