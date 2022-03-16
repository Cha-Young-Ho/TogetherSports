package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.jwt.JwtService;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.jwt.Token;
import com.togethersports.tosproejct.response.DefaultResponse;
import com.togethersports.tosproejct.response.TokenResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    // 회원가입 요청
    @PostMapping("/user")
    public ResponseEntity<DefaultResponse> userSignup(@RequestBody UserDTO userDTO) {

        log.info("/user 요청됨");
        log.info("userDTO ----> {}", userDTO);

        userService.userSignup(userDTO);

        DefaultResponse response = new DefaultResponse(Code.GOOD_REQUEST);

        return new ResponseEntity<>(response, HttpStatus.OK);


    }

    // 로그인
    @GetMapping("/login")
    public ResponseEntity<TokenResponse> login(String userEmail, @RequestHeader("User-Agent") String userAgent) {
        log.info("받은 userEmail = {}", userEmail);
        User member = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 E-MAIL 입니다."));

        Token tokenDto = jwtTokenProvider.createAccessToken(member.getUsername(), member.getRoles());

        jwtService.login(tokenDto, userAgent);
        TokenResponse tokenResponse = new TokenResponse(Code.GOOD_REQUEST, tokenDto);
        return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
    }

    // 회원 유무 확인 (이메일로 회원 조회)
    @GetMapping("/user/check")
    public ResponseEntity userCheck(String userEmail, String userName, String provider) {


        if(userService.sinUpCheck(userEmail)){

            DefaultResponse userResponse = new DefaultResponse(Code.GOOD_REQUEST);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }


        DefaultResponse userResponse = new DefaultResponse(Code.SIGNED_UP_USER);

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    // 닉네임 중복 확인 (닉네임으로 회원 조회)
    @GetMapping("/duplication")
    public ResponseEntity findByUserNickname(String userNickname) {

        if(userService.duplicationCheck(userNickname)){
            DefaultResponse response = new DefaultResponse(Code.GOOD_REQUEST);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }


        DefaultResponse response = new DefaultResponse(Code.DUPLICATED_NICKNAME);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

