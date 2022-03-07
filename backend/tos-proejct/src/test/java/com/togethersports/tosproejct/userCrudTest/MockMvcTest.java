package com.togethersports.tosproejct.userCrudTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MockMvcTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper om;

    @Test
    @DisplayName("추가정보 회원가입 테스트")
    public void userSignupTest() throws Exception {

        Map<String, String> map = new HashMap<>();

        map.put("userSequenceId", "1");
        map.put("userEmail", "TTTTT@gmail.com");
        map.put("userName", "날려버림");
        map.put("userBirth", "990101");
        map.put("userNickname", "울고싶다");
        map.put("userState", "정상회원");
        map.put("admin", "일반회원");
        map.put("gender", "남");
        map.put("mannerPoint", "0");
        map.put("locationX", "1111111.1111");
        map.put("locationY", "2222222.222");
        map.put("provider", "NAVER");

        mvc.perform(
                post("/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(map)))
            .andExpect(
                status()
                    .isOk())
                .andDo(print());
    }

    @Test
    @DisplayName("이메일로 회원유무 조회 테스트")
    public void userCheckTest() throws Exception {

        Map<String, String> map = new HashMap<>();

        map.put("userEmail", "ZZZZ@gmail.com");

        mvc.perform(
                        get("/user/check")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(om.writeValueAsString(map)))
                .andExpect(
                        status()
                                .isOk())
                .andDo(print());
    }
}
