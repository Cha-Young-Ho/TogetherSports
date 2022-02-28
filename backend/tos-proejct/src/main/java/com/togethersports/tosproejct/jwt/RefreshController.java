package com.togethersports.tosproejct.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class RefreshController {


    private final JwtService jwtService;
    @PostMapping("/refresh")
    public ResponseEntity<RefreshApiResponseMessage> validateRefreshToken(@RequestBody String refreshToken){

        Map<String, String> map = jwtService.validateRefreshToken(refreshToken);

        if(map.get("code").equals("402")){
            RefreshApiResponseMessage refreshApiResponseMessage = new RefreshApiResponseMessage(map);
            return new ResponseEntity<RefreshApiResponseMessage>(refreshApiResponseMessage, HttpStatus.UNAUTHORIZED);
        }
        RefreshApiResponseMessage refreshApiResponseMessage = new RefreshApiResponseMessage(map);
        return new ResponseEntity<RefreshApiResponseMessage>(refreshApiResponseMessage, HttpStatus.OK);

    }
}
