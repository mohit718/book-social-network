package com.ms.bsn.handler;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

public enum BusinessErrorCodes {

    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    INCORRECT_PASSWORD(300, BAD_REQUEST, "Password is incorrect."),
    PASSWORD_MISMATCH(301, BAD_REQUEST, "Password does not match."),
    ACCOUNT_LOCKED(302, FORBIDDEN, "User account locked"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Email / Password is incorrect"),
    DUPLICATE_ACCOUNT(305, BAD_REQUEST, "Account already exists."),
    INTERNAL_ERROR(500, INTERNAL_SERVER_ERROR, "Internal error, please contact admin.")
    ;


    @Getter
    private final int code;
    @Getter
    private final HttpStatus httpStatus;
    @Getter
    private final String description;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}
