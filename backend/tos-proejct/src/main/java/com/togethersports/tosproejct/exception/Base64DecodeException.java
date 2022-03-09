package com.togethersports.tosproejct.exception;

public class Base64DecodeException extends RuntimeException{
    private static final String MESSAGE = "잘못된 형식의 이미지 소스가 요청되었습니다.";
    public Base64DecodeException () {
        super(MESSAGE);
    }
}
