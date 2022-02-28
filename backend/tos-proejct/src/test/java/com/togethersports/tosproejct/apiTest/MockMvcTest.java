package com.togethersports.tosproejct.userCrudTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.user.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.print.attribute.standard.Media;
import java.util.HashMap;
import java.util.Map;

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
    public void 목MVC테스트() throws Exception {

        Map<String, String> map = new HashMap<>();

        map.put("name", "test1");

        mvc.perform(
                post("/user/test")
                .contentType(MediaType.APPLICATION_JSON)
                .content(om.writeValueAsString(map)))
            .andExpect(
                status()
                    .isOk())
                .andDo(print());
    }

    @Test
    public void 유저DB이메일체크테스트() throws Exception {

        Map<String, String> map = new HashMap<>();

        map.put("userName", "dhkim1522");
        map.put("userEmail", "test@gmail.com");
        map.put("provider", "kakao");

        mvc.perform(
                        post("/user/Oauth")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(om.writeValueAsString(map)))
                .andExpect(
                        status()
                                .isOk())
                .andDo(print());
    }
}
