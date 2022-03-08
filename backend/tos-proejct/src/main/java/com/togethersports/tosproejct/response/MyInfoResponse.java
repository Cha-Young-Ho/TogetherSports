package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserDTO;
import lombok.Getter;
import lombok.ToString;

import java.util.Optional;

@ToString
@Getter
public class MyInfoResponse extends DefaultResponse{


    private Optional<User> user;

    public MyInfoResponse(Code code, Optional<User> user){
        super(code);
        this.user = user;
    }
}
