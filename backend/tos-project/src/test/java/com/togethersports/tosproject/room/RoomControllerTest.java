package com.togethersports.tosproject.room;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.chat.ChatService;
import com.togethersports.tosproject.interest.Interest;
import com.togethersports.tosproject.room.dto.RoomOfCreate;
import com.togethersports.tosproject.security.Role;
import com.togethersports.tosproject.user.Gender;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.dto.UserOfModifyInfo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@AutoConfigureMockMvc
@SpringBootTest
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private ChatService chatService;
    @Mock
    private RoomService roomService;

    @InjectMocks
    private RoomController roomController;

    @DisplayName("방의 Validation 검증에 실패한다..")
    @Test
    public void createRoomTest() throws Exception{

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        User user = getTestUser();
        //given
        RoomOfCreate roomOfCreate = RoomOfCreate.builder()
                .roomArea("서울특별시 강남구 역삼동")
                .roomContent("초보만")
                .endAppointmentDate(LocalDateTime.of(2022, 12, 31, 06, 00,00))
                .exercise("축구")
                .limitPeopleCount(10)
                .startAppointmentDate(LocalDateTime.of(2022, 12, 31, 01, 00,00))
                .roomTitle("축구방")
                .build();
        //mocking
        //when
        MockHttpServletRequestBuilder request = post("/api/room")
                .content(objectMapper.writeValueAsString(roomOfCreate))
                .contentType(MediaType.APPLICATION_JSON);

        //then
        MvcResult result = mockMvc.perform(request)
                .andExpect(status().isBadRequest())
                .andReturn();

    }

    private User getTestUser(){

        User testUser = User.convertUser(1L, "test@naver.com", Role.ROLE_ADMIN);
        List<ActiveArea> activeAreas = new ArrayList<>();
        activeAreas.add(ActiveArea.createActiveArea("신월동", 12L, 13L));

        List<String> interestList = new ArrayList<>();
        interestList.add("야구");

        UserOfModifyInfo.UserProfileImage userProfileImage = new UserOfModifyInfo.UserProfileImage();
        userProfileImage.setUserProfileExtension("png");
        userProfileImage.setImageSource("ab");

        List<Interest> interests = new ArrayList<>();

        interests.add(Interest.createInterest("abc"));

        testUser.updateUser(UserOfModifyInfo.builder()
                .activeAreas(activeAreas)
                .gender(Gender.MALE)
                .userBirth(LocalDate.of(1999, 11, 11))
                .userNickname("닉네임")
                .interests(interestList)
                .userProfileImage(userProfileImage)
                .build(), interests, "userProfileImage");
        return testUser;

    }





}
