package com.togethersports.tosproejct.jwt;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.response.DefaultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RefreshController {


    private final JwtService jwtService;

    @PostMapping("/refresh")
    public ResponseEntity<DefaultResponse> validateRefreshToken(@RequestBody HashMap<String, String> bodyJson){

        log.info("refresh controller 실행");
        Map<String, String> map = jwtService.validateRefreshToken(bodyJson.get("refreshToken"));

        if(map.get("status").equals("402")){
            log.info("RefreshController - Refresh Token 이 만료.");
            DefaultResponse refreshApiResponseMessage = new DefaultResponse(Code.EXPIRED_TOKEN);
            return new ResponseEntity(refreshApiResponseMessage, HttpStatus.UNAUTHORIZED);
        }

        log.info("RefreshController - Refresh Token 이 유효.");
        DefaultResponse<String> refreshApiResponseMessage = new DefaultResponse<>(Code.GOOD_REQUEST, map.get("accessToken"));

        return new ResponseEntity(refreshApiResponseMessage, HttpStatus.OK);

    }
}