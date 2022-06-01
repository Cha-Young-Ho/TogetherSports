package com.togethersports.tosproject.room;


import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.code.ResponseCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.common.util.ParsingEntityUtils;
import com.togethersports.tosproject.interest.Interest;
import com.togethersports.tosproject.room.code.RoomCode;
import com.togethersports.tosproject.room.dto.ImageOfRoomCRUD;
import com.togethersports.tosproject.room.dto.RoomOfCreate;
import com.togethersports.tosproject.security.Role;
import com.togethersports.tosproject.security.oauth2.model.OAuth2Provider;
import com.togethersports.tosproject.user.Gender;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.UserRepository;
import com.togethersports.tosproject.user.dto.UserOfModifyInfo;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {

    @Mock
    private ParsingEntityUtils parsingEntityUtils;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private RoomService roomService;


    @DisplayName("방을 성공적으로 생성한다.")
    @Test
    public void createRoomTestOnSuccess() throws Exception{

        //given
        User user = getTestUser();
        RoomOfCreate roomOfCreate = roomOfCreate();
        Room room = Room.of(roomOfCreate, user);


        Response response = Response.of(CommonCode.GOOD_REQUEST, null);

        //mocking

        given(userRepository.findById(any())).willReturn(Optional.of(user));
        //given(parsingEntityUtils.parsingStringToInterestsEntity(any())).willReturn(Optional.of());
        //when
        Response actualResponse = roomService.createRoom(user, roomOfCreate);

        //then
        Assertions.assertEquals(response.getStatus(), actualResponse.getStatus());
        Assertions.assertEquals(response.getContent(), actualResponse.getContent());


    }

    @DisplayName("방 생성에 실패한다.")
    @Test
    public void createRoomTestOnFail() throws Exception{

        //given

        //when

        //then

    }

    @DisplayName("방 수정에 성공한다.")
    @Test
    public void modifyRoomTestOnSuccess() throws Exception{

        //given

        //when

        //then

    }

    @DisplayName("해당하는 방이 없어서 방 수정에 실패한다.")
    @Test
    public void modifyNotExistRoomTestOnFail() throws Exception{

        //given

        //when

        //then

    }

    @DisplayName("입력값 검증에 실패하여 방 수정에 실패한다.")
    @Test
    public void modifyNotVailidatedRoomTestOnFail() throws Exception{

        //given

        //when

        //then

    }

    private RoomOfCreate roomOfCreate(){

        List<ImageOfRoomCRUD> image = new ArrayList<>();

        image.add(ImageOfRoomCRUD.builder().imageSource("ag").roomImageExtension("png").order(0).build());

        List<String> tags = new ArrayList<>();

        tags.add("20대");
        tags.add("고수만");

        return RoomOfCreate.builder()
                .roomArea("서울특별시 강남구 역삼동")
                .roomContent("초보만")
                .endAppointmentDate(LocalDateTime.of(2022, 12, 31, 06, 00,00))
                .exercise("축구")
                .limitPeopleCount(10)
                .startAppointmentDate(LocalDateTime.of(2022, 12, 31, 01, 00,00))
                .roomImages(image)
                .tags(tags)
                .roomTitle("축구방")
                .build();
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
