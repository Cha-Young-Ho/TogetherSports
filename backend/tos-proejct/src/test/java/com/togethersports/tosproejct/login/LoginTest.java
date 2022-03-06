package com.togethersports.tosproejct.login;

import com.togethersports.tosproejct.jwt.JwtService;
import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.jwt.Token;
import com.togethersports.tosproejct.user.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Slf4j
@WebMvcTest
@AutoConfigureMockMvc
public class LoginTest {

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private MockMvc mockMvc;





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
