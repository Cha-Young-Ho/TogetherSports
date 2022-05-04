package com.togethersports.tosproejct.chat.handler;

import lombok.Getter;

@Getter
public class ApiError {


    String errorMessage;
    public ApiError(String errorMessage){

        this.errorMessage = errorMessage;
    }
}
