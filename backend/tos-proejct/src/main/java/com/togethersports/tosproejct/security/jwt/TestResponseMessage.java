package com.togethersports.tosproejct.security.jwt;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TestResponseMessage {

    private String signUpCheckValue;
    public TestResponseMessage(String sign){
        this.signUpCheckValue = sign;
    }
}
