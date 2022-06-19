package com.togethersports.tosproject.room;


import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.chat.ChatController;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.common.util.ParsingEntityUtils;
import com.togethersports.tosproject.image.RoomImageService;
import com.togethersports.tosproject.interest.Interest;
import com.togethersports.tosproject.participant.Participant;
import com.togethersports.tosproject.participant.ParticipantRepository;
import com.togethersports.tosproject.participant.ParticipantService;
import com.togethersports.tosproject.room.dto.ImageOfRoomCRUD;
import com.togethersports.tosproject.room.dto.RoomOfCreate;
import com.togethersports.tosproject.security.Role;
import com.togethersports.tosproject.tag.TagService;
import com.togethersports.tosproject.user.Gender;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.UserRepository;
import com.togethersports.tosproject.user.UserService;
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
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;


@Slf4j
@ExtendWith(MockitoExtension.class)
public class RoomServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private ParticipantRepository participantRepository;

    @Mock
    private ChatController chatController;

    @Mock
    private ParsingEntityUtils parsingEntityUtils;

    @Mock
    private RoomRepository roomRepository;

    @Mock
    private TagService tagService;

    @Mock
    private RoomImageService roomImageService;

    @Mock
    private ParticipantService participantService;

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

        //mocking
        given(userRepository.findById(any())).willReturn(Optional.of(user));


        //when
        Response actualResponse = roomService.createRoom(user, roomOfCreate);

        //then
        Assertions.assertNull(actualResponse.getContent());


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

    @DisplayName("방 참가에 성공한다.")
    @Test
    public void participateRoomOnSuccess() throws Exception{

        //given
        User user = getTestUser();
        RoomOfCreate roomOfCreate = roomOfCreate();
        Room room =Room.of(roomOfCreate, user);
        Participant participant = Participant.of(user, room);

        //mocking
        given(userRepository.save(any())).willReturn(getTestUser());
        given(userRepository.findById(any())).willReturn(Optional.of(getTestUser()));
        given(roomRepository.save(any())).willReturn(room);
        given(roomRepository.findById(any())).willReturn(Optional.of(room));
        given(participantRepository.save(any())).willReturn(participant);
        Room roomEntity = roomRepository.findById(room.getId()).get();

        //when
        roomService.participateRoom(user, roomEntity.getId());

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
