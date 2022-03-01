package com.togethersports.tosproejct.exception;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class ErrorResponse {
    // HttpStatus
    private String status;

    // Http Default Message
    private String message;

    // Error Code
    private String errorCode;


    public ErrorResponse() {
        this.status = "403";
        this.message = "잘못된 요청입니다.";
        this.errorCode = "403";
    }

}
