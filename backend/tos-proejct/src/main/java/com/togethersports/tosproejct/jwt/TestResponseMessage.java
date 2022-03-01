package com.togethersports.tosproejct.jwt;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class TestResponseMessage {

    private String signUpCheckValue;

    public TestResponseMessage(){
        ;
    }
    public TestResponseMessage(String sign){
        this.signUpCheckValue = sign;
    }
}
