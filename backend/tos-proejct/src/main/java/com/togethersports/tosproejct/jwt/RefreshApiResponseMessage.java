package com.togethersports.tosproejct.jwt;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Setter
@Getter
@ToString
public class RefreshApiResponseMessage {

    // HttpStatus
    private String status;

    // Http Default Message
    private String message;

    // Error Code
    private String errorCode;

    // Access Token
    private String accessToken;

    public RefreshApiResponseMessage() {}

    public RefreshApiResponseMessage(Map<String, String> source) {
        this.status = source.get("status");
        this.message = source.get("message");
        this.errorCode = source.get("errorCode");
        this.accessToken = source.get("accessToken");
    }

}