package com.togethersports.tosproejct.response;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.user.OtherUserDTO;

import java.util.Optional;

public class OtherInfoResponse extends DefaultResponse{

    private Optional<OtherUserDTO> otherUserDTO;
    public OtherInfoResponse(Code code, Optional<OtherUserDTO> otherUserDTO) {
        super(code);
        this.otherUserDTO = otherUserDTO;
    }
}
