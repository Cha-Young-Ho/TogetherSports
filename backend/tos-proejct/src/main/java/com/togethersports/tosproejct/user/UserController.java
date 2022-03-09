package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.file.FileHandler;
import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.jwt.JwtService;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.jwt.Token;
import com.togethersports.tosproejct.response.TokenResponse;
import com.togethersports.tosproejct.response.UserResponse;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

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
    public ResponseEntity userSignup(@Valid @RequestBody UserDTO userDTO) {

        log.info("/user 요청됨");
        log.info("userDTO ----> {}", userDTO);

        UserResponse userResponse = null;

        try {
            String result = userService.userSignup(userDTO);

            if (result.equals("SUCCESS")) {
                userResponse = new UserResponse(
                        Code.GOOD_REQUEST,
                        result
                );
            }
            
            if (result.equals("FAIL")) {
               userResponse = new UserResponse(
                        Code.BAD_REQUEST,
                        result
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody Map<String, String> user, @RequestHeader("User-Agent") String userAgent) {
        log.info("user email = {}", user.get("userEmail"));
        User member = userRepository.findByUserEmail(user.get("userEmail"))
                .orElseThrow(() -> new UsernameNotFoundException("가입되지 않은 E-MAIL 입니다."));
       // return jwtService.login(member);
        Token tokenDto = jwtTokenProvider.createAccessToken(member.getUsername(), member.getRoles());
        log.info("getroleeeee = {}", member.getRoles());
        jwtService.login(tokenDto, userAgent);
        TokenResponse tokenResponse = new TokenResponse(Code.GOOD_REQUEST, tokenDto);
        return new ResponseEntity<>(tokenResponse, HttpStatus.OK);
    }

    // 회원 유무 확인 (이메일로 회원 조회)
    @GetMapping("/user/check")
    public ResponseEntity userCheck(@RequestBody UserDTO userDTO) {

        UserResponse userResponse = new UserResponse(Code.GOOD_REQUEST, userService.findByUserEmail(userDTO.getUserEmail()));

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    // 닉네임 중복 확인 (닉네임으로 회원 조회)
    @GetMapping("/duplication")
    public ResponseEntity findByUserNickname(@RequestBody UserDTO userDTO) {

        UserResponse userResponse = new UserResponse(Code.GOOD_REQUEST, userService.findByUserNickname(userDTO.getUserNickname()));

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }


}

