package com.togethersports.tosproejct.myInfomationTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.jwt.Token;
import com.togethersports.tosproejct.user.*;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class MyInformationTest {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    String userEmail = "aabbcc@gmail.com";
    List<String> roles;

    Token token;
    User user;

    @Before
    public void setUp(){
        this.roles = new ArrayList<>();
        this.roles.add("USER");
        this.token = jwtTokenProvider.createAccessToken(userEmail, roles);

        this.user = User.builder()
                .userName("이병건")
                .userState("1")
                .userBirth("19990101")
                .userNickname("침착맨")
                .userEmail("aabbcc@gmail.com")
                .gender(Gender.남)
                .provider(Provider.KAKAO)
                .locationX(12.12)
                .locationY(12.22)
                .admin(Admin.일반회원)
                .roles(this.roles)
                .mannerPoint(10)
                .build();
    }


    @Test
    @DisplayName("올바른 요청이 넘어오는지 테스트")
    @WithMockUser
    public void myInformation_조회테스트() throws Exception {

        mockMvc.perform(get("/user"))
                .andExpect(status().isOk())
                .andDo(print());
    }


    @Test
    @DisplayName("요청 JWT 관련 사용자가 존재하지 않을 경우")
    public void myInformation_요청실패테스트 () throws Exception{

        //given
        //when

        //then
        mockMvc.perform(get("/user"))
                .andExpect(status().isForbidden())
                .andDo(print());
    }

    @Test
    @DisplayName("올바른 요청일 경우")
    @CustomUserMock(email = "aabbcc@gmail.com", role = "USER")
    public void myInformation_요청성공테스트 () throws Exception{

        //given
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonifyUser = objectMapper.writeValueAsString(this.user);
        //when

        //then
        mockMvc.perform(get("/user"))
                .andExpect(status().isOk())
                .andExpect(content().json(jsonifyUser))
                .andDo(print());

    }

    @Test
    public void myInformation_조회_반환메세지생성테스트 () throws Exception{

        //given

        //when

        //then

    }

    @Test
    public void myInformation_수정테스트 () throws Exception{

        //given

        //when

        //then

    }
}
