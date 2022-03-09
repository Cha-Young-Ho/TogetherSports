package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.user.User;
import lombok.Getter;
import lombok.ToString;

import java.util.Optional;

@ToString
@Getter
public class UserResponse extends DefaultResponse {

    private Optional<User> user;
    private String result;

    public UserResponse(Code code, Optional<User> user){
        super(code);
        this.user = user;
    }

    public UserResponse(Code code, String result){
        super(code);
        this.result = result;
    }
}
