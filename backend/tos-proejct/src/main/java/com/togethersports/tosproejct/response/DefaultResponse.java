package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class DefaultResponse {
    // HttpStatus
    private int code;

    // Http Default Message
    private String message;


    public DefaultResponse(Code code){
        this.code = code.getCode();
        this.message = code.getMessage();
    }

}
