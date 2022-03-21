package com.togethersports.tosproejct.security;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.response.DefaultResponse;
import com.togethersports.tosproejct.security.jwt.Token;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import com.togethersports.tosproejct.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {


//    private final ;

//    // 로그인
//    @GetMapping("/login")
//    public ResponseEntity<DefaultResponse> login(@RequestParam String userEmail, @RequestHeader("User-Agent") String userAgent) {
//        // log.info("받은 userEmail = {}", userEmail);
//        User member = userRepository.findByUserEmail(userEmail)
//                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 E-MAIL 입니다."));
//
//        Token tokenDto = jwtTokenProvider.createAccessToken(member.getUsername(), member.getRoles());
//
//        jwtService.login(tokenDto, userAgent);
//        DefaultResponse<Token> tokenResponse = new DefaultResponse<>(Code.GOOD_REQUEST, tokenDto);
//
//        return new ResponseEntity(tokenResponse, HttpStatus.OK);
//    }


//    @PostMapping("/logout")
//    public ResponseEntity logout(@RequestHeader("Authorization") String accessToken, @RequestHeader("User-Agent") String userAgent) {
//        log.info("logout 작동");
//        if (accessToken == null) {
//            DefaultResponse response = new DefaultResponse(Code.UNKNOWN_ERROR);
//            return new ResponseEntity<>(response, HttpStatus.OK);
//        }
//
//        jwtService.logout(accessToken, userAgent);
//
//        DefaultResponse response = new DefaultResponse(Code.GOOD_REQUEST);
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//
//
//    }
}
