package com.togethersports.tosproejct.common;

import com.togethersports.tosproejct.common.code.ResponseCode;

public enum CommonCode implements ResponseCode {

    GOOD_REQUEST(5000, "올바른 요청입니다.");

    private final int code;
    private final String message;

    CommonCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public int getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
