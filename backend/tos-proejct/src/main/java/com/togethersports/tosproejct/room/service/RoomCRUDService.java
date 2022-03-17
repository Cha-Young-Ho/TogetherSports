package com.togethersports.tosproejct.room.service;

import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.fields.RoomImage;
import com.togethersports.tosproejct.room.fields.RoomTag;
import com.togethersports.tosproejct.room.module.RoomFileHandler;
import com.togethersports.tosproejct.room.repository.RoomAreaRepository;
import com.togethersports.tosproejct.room.repository.RoomImageRepository;
import com.togethersports.tosproejct.room.repository.RoomRepository;
import com.togethersports.tosproejct.room.repository.RoomTagRepository;
import com.togethersports.tosproejct.room.roomDTO.RoomCreateDTO;
import com.togethersports.tosproejct.room.roomDTO.RoomImageDTO;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class RoomCRUDService {

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomAreaRepository roomAreaRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoomImageRepository roomImageRepository;
    @Autowired
    private RoomTagRepository roomTagRepository;

    @Autowired
    private RoomFileHandler roomFileHandler;

    //방 생성 메소드
    public void createRoom(RoomCreateDTO roomCreateDTO, String accessToken) {
        Room room = Room.builder()
                .roomContent(roomCreateDTO.getRoomContent())
                .roomTitle(roomCreateDTO.getRoomTitle())
                .endAppointmentDate(roomCreateDTO.getEndAppointmentDate())
                .startAppointmentDate(roomCreateDTO.getStartAppointmentDate())
                .exercise(roomCreateDTO.getExercise())
                .host(parsingHost(accessToken))
                .roomTagList(parsingRoomTag(roomCreateDTO.getTag()))
                .limitPeopleCount(roomCreateDTO.getLimitPeopleCount())
                .build();
        //방 저장
        Room savedRoom = roomRepository.save(room);

        roomCreateDTO.getRoomArea().updateRoom(savedRoom);

        //방 지역 DB에 저장
        roomAreaRepository.save(roomCreateDTO.getRoomArea());

        //방 이미지 로컬에 저장
        List<RoomImage> roomImages = saveRoomImages(roomCreateDTO.getRoomImages());

        //방 이미지 DB에 저장
        saveRoomImagesToDB(roomImages, savedRoom);

        //방 Tag DB에 저장
        saveRoomTagToDB(roomCreateDTO.getTag(), savedRoom);
    }

    //Tag 파싱
    public List<RoomTag> parsingRoomTag(List<String> tags) {
        List<RoomTag> roomTagList = new ArrayList<>();
        for (String tag : tags) {
            roomTagList.add(new RoomTag());
        }

        return roomTagList;
    }

    // accessToken 접근해서 방장 유저 정보 추출
    public User parsingHost(String accessToken) {
        String userEmail = jwtTokenProvider.getClaims(accessToken).get("sub").toString();

        return userRepository.findByUserEmail(userEmail).get();
    }

    //파일 처리 메소드
    public List<RoomImage> saveRoomImages(List<RoomImageDTO> roomImageList) {

        //사용자가 방의 사진을 업로드 하지않은 경우
        if (roomImageList.size() == 1 && roomImageList.get(0).getRoomImageRealName().equals("정보 없음")) {
            log.info("여기 실행111");
            return roomFileHandler.manageDefaultImage();
        }

        log.info("if 체크 size = {}", roomImageList.size() == 1);
        log.info("if 체크 equals = {}", roomImageList.get(0).getRoomImageRealName().equals("정보 없음"));

        //사용자가 방의 사진을 1~@개 업로드 한 경우
        return roomFileHandler.manageImages(roomImageList);


    }

    //파일 DB저장 메소드
    public void saveRoomImagesToDB(List<RoomImage> roomImageList, Room room) {
        for (RoomImage roomImage : roomImageList) {
            roomImage.updateRoom(room);
            roomImageRepository.save(roomImage);
        }
    }

    //룸 태그 DB저장 메소드
    public void saveRoomTagToDB(List<String> tagList, Room room) {
        for (String tag : tagList) {
            RoomTag roomTag = RoomTag.builder()
                    .tag(tag)
                    .room(room)
                    .build();
            roomTagRepository.save(roomTag);
        }
    }
}
