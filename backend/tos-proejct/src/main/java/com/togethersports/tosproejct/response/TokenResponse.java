package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.jwt.Token;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class TokenResponse extends DefaultResponse{

    private String accessToken;

    private String refreshToken;


    public TokenResponse(Code code, Token token){
        super(code);
        this.accessToken = token.getAccessToken();
        this.refreshToken = token.getRefreshToken();
    }
}
