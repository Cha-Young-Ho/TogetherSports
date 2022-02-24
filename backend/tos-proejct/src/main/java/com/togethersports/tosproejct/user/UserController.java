package com.togethersports.tosproejct.user;


import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {





    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    final String BIRTH = "001200";
    final String EMAIL = "aabbcc@gmail.com";
    final String NICKNAME = "침착맨";
    final Long SEQUENCEID = Long.valueOf(1);
    final Gender GENDER = Gender.남;
    final Admin ADMIN = Admin.일반회원;

    User user = User.builder()
            .userEmail(EMAIL)
            .userBirth(BIRTH)
            .userNickname(NICKNAME)
            .admin(ADMIN)
            .gender(GENDER)
            .userSequenceId(SEQUENCEID)
            .roles(Collections.singletonList("ROLE_USER")) // 최초 가입시 USER 로 설정
            .build();


    @PostMapping("/join")
    public String join(){
        log.info("로그인 시도됨");

        userRepository.save(user);


        return user.toString();

    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> user) {
        log.info("user email = {}", user.get("email"));
        User member = userRepository.findByUserEmail(user.get("email"))
                .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 E-MAIL 입니다."));

        return jwtTokenProvider.createToken(member.getUsername(), member.getRoles());
    }
}
