package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.exception.CustomSignatureException;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
public class MyInfoController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public Optional<User> getMyInformation(@RequestHeader(value="Authorization") String accessToken) {
        log.info("받아온 토큰 = {}", accessToken);
        try {
            return userService.getMyInfo(accessToken);
        }
        catch (SignatureException e){
            log.info("커스텀 시그니쳐 실행");
            throw new CustomSignatureException();
        }
    }


    @PutMapping("/user")
    public Optional<User> modifyMyInformation(@RequestHeader(value="Authorization") String accessToken, @RequestBody UserDTO userDTO){
        
       Optional<User> user =  userService.updateUser(accessToken, userDTO);

        return user;
    }

}
