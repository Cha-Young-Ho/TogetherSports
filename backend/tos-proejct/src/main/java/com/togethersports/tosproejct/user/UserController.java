package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.jwt.JwtService;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.jwt.Token;
import com.togethersports.tosproejct.response.TokenResponse;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

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
    public Map<String, String> userSignup(@RequestBody UserDTO userDTO) {

        log.info("/user 요청됨");
        log.info("userDTO ----> {}", userDTO);

        Map<String, String> map = new HashMap<>();

        map.put("userSignup", "true");

        try {
            userService.userSignup(userDTO);
        } catch (IllegalArgumentException e) {
            e.getMessage();
            map.put("userSignup", "false");
        }

        return map;
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

    @GetMapping("/user/check")
    public Map<String, String> userCheck(@RequestBody UserDTO userDTO) {

        Map<String, String> map = new HashMap<>();

        try {
            Optional<User> user = userService.getUserFindByEmail(userDTO.getUserEmail());

            // 회원 조회에 성공했을 경우. (데이터가 있을 경우)
            if (user.isPresent()) {
                map.put("userCheck", "true");
                return map;

            }
                map.put("userCheck", "false");
                return map;

        } catch (NoSuchElementException e) {
            log.info("요청 데이터의 값이 없습니다. -> " + e.getMessage());
        } catch (IllegalArgumentException e) {
            log.info("잘못된 파라미터 요청 입니다. -> " + e.getMessage());
        }

        return map;
    }


}

