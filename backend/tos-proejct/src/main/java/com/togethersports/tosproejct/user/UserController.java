package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.code.Code;
import com.togethersports.tosproejct.exception.CustomSignatureException;
import com.togethersports.tosproejct.security.jwt.JwtService;
import com.togethersports.tosproejct.security.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.security.jwt.Token;
import com.togethersports.tosproejct.response.DefaultResponse;
import com.togethersports.tosproejct.user.dto.UserDTO;
import com.togethersports.tosproejct.user.dto.UserOfMyInfo;
import io.jsonwebtoken.SignatureException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@AllArgsConstructor
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

    // 내 정보 조회
    @GetMapping("/user")
    public ResponseEntity<DefaultResponse> getMyInformation(@AuthenticationPrincipal User user) {
        // 받아온 user 객체 -> DTO 객체로 변환
        // UserOfMyInfo myInfo = UserOfMyInfo.from(user);
        // 응답
        // return ResponseEntity.ok(myInfo);

        //이 부분은 oauth2 끝나는대로 수정 해야함
        try {
            DefaultResponse<User> myInfoResponse = new DefaultResponse(Code.GOOD_REQUEST, userService.getMyInfo(accessToken).get());

            return new ResponseEntity(myInfoResponse, HttpStatus.OK);
        }
        catch (SignatureException e){
            throw new CustomSignatureException();
        }
        return null;
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<DefaultResponse> getOtherInformation(@PathVariable Integer id){
        User findUser = userService.findById(id);


        return null;
    }

    // 회원 정보 수정
    @PutMapping("/user")
    public ResponseEntity<DefaultResponse> modifyMyInformation(@AuthenticationPrincipal User user,
                                                               @RequestHeader(value = "Authorization") String accessToken,
                                                               @RequestBody UserDTO userDTO) {

        userService.updateUser(accessToken, userDTO);

        DefaultResponse defaultResponse = new DefaultResponse(Code.GOOD_REQUEST);
        return new ResponseEntity<>(defaultResponse, HttpStatus.OK);
    }

    // 회원 유무 확인 (이메일로 회원 조회)
    @GetMapping("/user/check")
    public ResponseEntity checkDuplicationEmail(String userEmail) {

        if (userService.sinUpCheck(userEmail)) {

            DefaultResponse userResponse = new DefaultResponse(Code.GOOD_REQUEST);
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }


        DefaultResponse userResponse = new DefaultResponse(Code.SIGNED_UP_USER);

        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    // 닉네임 중복 확인 (닉네임으로 회원 조회)
    @GetMapping("/duplication")
    public ResponseEntity checkDuplicationNickname(String userNickname) {

        if (userService.duplicationCheck(userNickname)) {
            DefaultResponse response = new DefaultResponse(Code.GOOD_REQUEST);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }


        DefaultResponse response = new DefaultResponse(Code.DUPLICATED_NICKNAME);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

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

