package com.togethersports.tosproejct.login;

import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.user.Admin;
import com.togethersports.tosproejct.user.Gender;
import com.togethersports.tosproejct.user.Provider;
import com.togethersports.tosproejct.user.UserDTO;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;


@Slf4j
@WebMvcTest
@AutoConfigureMockMvc
public class LoginTest {

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MockMvc mockMvc;

    UserDTO userDTO = UserDTO.builder()
            .userSequenceId(1)
            .gender(Gender.MALE)
            .admin(Admin.ROLE_USER)
            .provider(Provider.KAKAO)
            .userBirthYear("1999")
            .userBirthMonth("01")
            .userBirthDay("01")
            .userEmail("aabbcc@gmail.com")
            .userNickname("침착맨")
            .userName("이병건")
            .build();



    @Test
    @DisplayName("가입되지 않은 유저 email 로그인")
    public void  미가입회원정보_로그인요청() throws Exception{


        //given

        String loginEmail = "aabbcc@gmail.com";

        //when

        //then

    }

    @Test
    public void 로그인성공테스트() throws Exception {

    }

    @Test
    public void 로그인실패테스트 () throws Exception{

        //given

        //when

        //then

    }

    @Test
    @DisplayName("재로그인 시, DB의 Refresh 토큰 삭제 확인 및 DB에 새로운 Refresh 등록 그리고 Access 토큰 발급")
    public void 재로그인테스트(){

    }

}
