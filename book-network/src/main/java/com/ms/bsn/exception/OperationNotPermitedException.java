package com.ms.bsn.exception;

public class OperationNotPermitedException extends RuntimeException {
    public OperationNotPermitedException(String msg) {
        super(msg);
    }
}
