package com.togethersports.tosproejct.getUserTest;

import com.togethersports.tosproejct.enums.Admin;
import com.togethersports.tosproejct.enums.Gender;
import com.togethersports.tosproejct.enums.Provider;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.jwt.Token;
import com.togethersports.tosproejct.user.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@AutoConfigureMockMvc
@SpringBootTest
public class MyInformationTest {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtTokenProvider jwtTokenProvider;


    private final String ALTERED_RESPONSE_MESSAGE = "{\"errortype\":\"Forbidden\",\"code\":\"400\",\"message\":\"변조된 토큰입니다. 로그인이 필요합니다.\"}";
    private final String SUCCESS_RESPONSE_MESSAGE = "{\"userSequenceId\":1,\"userEmail\":\"aabbcc@gmail.com\",\"userName\":\"이병건\",\"userNickname\":\"침착맨\",\"userBirthYear\":\"1999\",\"userBirthMonth\":\"01\",\"userBirthDay\":\"01\",\"userState\":\"1\",\"mannerPoint\":10,\"locationX\":12.12,\"locationY\":12.22,\"gender\":\"남\",\"admin\":\"ROLE_USER\",\"provider\":\"KAKAO\",\"roles\":[\"USER\"],\"authorities\":[{\"authority\":\"USER\"}],\"password\":null,\"username\":\"aabbcc@gmail.com\",\"accountNonExpired\":true,\"accountNonLocked\":true,\"credentialsNonExpired\":true,\"enabled\":true}";
    private final String MODIFY_USER_REQUEST_BODY = "{\n" +
            "    \n" +
            "    \"userEmail\":\"aabbcc1@gmail.com\",\n" +
            "    \"userName\":\"000\",\n" +
            "    \"userNickname\":\"착3\",\n" +
            "    \"userBirthYear\":\"1950\",\n" +
            "    \"userBirthMonth\":\"02\",\n" +
            "    \"userBirthDay\":\"11\",\n" +
            "    \"userState\":\"abc1\",\n" +
            "    \"mannerPoint\":10,\n" +
            "    \"locationX\":33333333.333,\n" +
            "    \"locationY\":\"12.211111\",\n" +
            "    \"gender\":\"남\",\n" +
            "    \"admin\":\"ROLE_USER\",\n" +
            "    \"provider\":\"KAKAO\"\n" +
            "}\n";
    String userEmail = "aabbcc@gmail.com";
    List<String> roles;

    Token token;
    User user;

    @BeforeEach
    public void setUp(){
        //given
        this.roles = new ArrayList<>();
        this.roles.add("USER");
        this.token = jwtTokenProvider.createAccessToken(userEmail, roles);
        this.user = User.builder()
                .userName("이병건")
                .userBirthYear("1999")
                .userBirthMonth("01")
                .userBirthDay("01")
                .userNickname("침착맨")
                .userEmail("aabbcc@gmail.com")
                .gender(Gender.MALE)
                .provider(Provider.KAKAO)
                .roles(this.roles)
                .build();

        this.userRepository.save(user);
        this.token = jwtTokenProvider.createAccessToken(this.userEmail, this.roles);;
        log.info("setup 실행");
    }

    @Test
    @DisplayName("요청 JWT 관련 사용자가 존재하지 않을 경우")
    public void myInformation_요청실패테스트 () throws Exception{

        //when
        //then
        mockMvc.perform(get("/user")
                        .header("Authorization", token.getAccessToken() + "a"))
                .andExpect(status().isOk())
                .andExpect(content().json(ALTERED_RESPONSE_MESSAGE))
                .andDo(print());
    }

    @Test
    @DisplayName("올바른 요청일 경우")
    public void myInformation_요청성공테스트 () throws Exception{

        //when, then
        mockMvc.perform(get("/user")
                        .header("Authorization", token.getAccessToken()))
                .andExpect(status().isOk())
                .andDo(print());

    }

    @Test
    public void myInformation_조회_반환메세지생성테스트 () throws Exception{
        //when, then
        mockMvc.perform(get("/user")
                .header("Authorization", token.getAccessToken()))
                .andExpect(status().isOk())
                .andExpect(content().json(SUCCESS_RESPONSE_MESSAGE))
                .andDo(print());


    }

    @Test
    public void myInformation_수정테스트 () throws Exception{

        //when, then
        mockMvc.perform(put("/user")
                .header("Authorization", this.token.getAccessToken())
                .content(MODIFY_USER_REQUEST_BODY)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());




    }
}
