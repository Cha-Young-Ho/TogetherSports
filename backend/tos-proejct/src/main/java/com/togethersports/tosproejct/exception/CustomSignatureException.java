package com.togethersports.tosproejct.exception;

public class CustomSignatureException extends RuntimeException {
    private static final String MESSAGE = "이미 등록된 이메일 입니다.";
    public CustomSignatureException () {
        super(MESSAGE);
    }
}
