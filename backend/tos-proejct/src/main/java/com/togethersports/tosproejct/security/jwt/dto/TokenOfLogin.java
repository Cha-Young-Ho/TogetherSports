package com.togethersports.tosproejct.security.jwt.dto;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class TokenOfLogin {

    private String refreshToken;
    private String accessToken;

}
