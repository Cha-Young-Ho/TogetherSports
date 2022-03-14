package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class RefreshApiResponse extends DefaultResponse {


    // Access Token
    private String accessToken;


    public RefreshApiResponse(Code code, String accessToken) {
        super(code);
        this.accessToken = accessToken;
    }

    public RefreshApiResponse(Code code){
        super(code);
    }

}