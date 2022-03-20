package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.exception.CustomSignatureException;
import com.togethersports.tosproejct.response.DefaultResponse;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
public class MyInfoController {


    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<DefaultResponse> getMyInformation(@RequestHeader(value="Authorization") String accessToken) {
        log.info("받아온 토큰 = {}", accessToken);
        try {
            DefaultResponse<User> myInfoResponse = new DefaultResponse(Code.GOOD_REQUEST);
            myInfoResponse.setT(userService.getMyInfo(accessToken).get());
            return new ResponseEntity(myInfoResponse, HttpStatus.OK);
        }
        catch (SignatureException e){
            throw new CustomSignatureException();
        }
    }


    @PutMapping("/user")
    public ResponseEntity<DefaultResponse> modifyMyInformation(@RequestHeader(value="Authorization") String accessToken, @RequestBody UserDTO userDTO){
        
       Optional<User> user =  userService.updateUser(accessToken, userDTO);

       DefaultResponse defaultResponse = new DefaultResponse(Code.GOOD_REQUEST);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

}
