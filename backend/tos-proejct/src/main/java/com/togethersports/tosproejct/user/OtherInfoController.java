package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.response.DefaultResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OtherInfoController {

    @Autowired
    private UserService userService;

    @GetMapping("/other")
    public ResponseEntity<DefaultResponse> getOtherInformation(@RequestBody String userNickname){


        DefaultResponse<OtherUserDTO> otherInfoResponse =
                new DefaultResponse<>(Code.GOOD_REQUEST,userService.getOtherInformationByUserNickname(userNickname).get());



        return new ResponseEntity<>(otherInfoResponse, HttpStatus.OK);

    }
}
