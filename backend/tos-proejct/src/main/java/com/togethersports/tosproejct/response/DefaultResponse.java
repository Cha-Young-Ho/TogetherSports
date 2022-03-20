package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class DefaultResponse<T> {
    // HttpStatus
    private int code;

    // Http Default Message
    private String message;

    private T additionalMessage;

    public DefaultResponse(Code code){
        this.code = code.getCode();
        this.message = code.getMessage();
    }

    public DefaultResponse(Code code, T additionalMessage){
        this.code = code.getCode();
        this.message = code.getMessage();
        this.additionalMessage = additionalMessage;
    }


}
