package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.response.OtherInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class OtherInfoController {

    @Autowired
    private UserService userService;

    @GetMapping("/other")
    public ResponseEntity<OtherInfoResponse> getOtherInformation(@RequestBody String userNickname){


        OtherInfoResponse otherInfoResponse =
                new OtherInfoResponse(Code.GOOD_REQUEST,
                        userService.getOtherInformationByUserNickname(userNickname));

        return new ResponseEntity<>(otherInfoResponse, HttpStatus.OK);

    }
}
