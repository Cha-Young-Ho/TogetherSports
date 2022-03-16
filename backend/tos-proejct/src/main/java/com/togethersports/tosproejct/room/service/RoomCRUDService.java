package com.togethersports.tosproejct.room.service;

import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.fields.RoomArea;
import com.togethersports.tosproejct.room.fields.RoomImage;
import com.togethersports.tosproejct.room.fields.RoomTag;
import com.togethersports.tosproejct.room.module.RoomFileHandler;
import com.togethersports.tosproejct.room.repository.RoomAreaRepository;
import com.togethersports.tosproejct.room.repository.RoomImageRepository;
import com.togethersports.tosproejct.room.repository.RoomRepository;
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

    private RoomImageRepository roomImageRepository;

    private RoomFileHandler roomFileHandler;

    //방 생성 메소드
    public void createRoom(RoomCreateDTO roomCreateDTO, String accessToken){

                //.roomImages(parsingRoomImages(roomCreateDTO.getRoomImages()))





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

        //방 지역 저장
        roomAreaRepository.save(roomCreateDTO.getRoomArea());

        //방 이미지 로컬에 저장
        List<RoomImage> roomImages = saveRoomImages(roomCreateDTO.getRoomImages());

        //방 이미지 DB에 저장

        //방 host 저장



    }

    //Tag 파싱
    public List<RoomTag> parsingRoomTag(List<String> tags){
        List<RoomTag> roomTagList = new ArrayList<>();
        for (String tag : tags){
            roomTagList.add(new RoomTag());
        }

        return roomTagList;
    }

    public User parsingHost(String accessToken){
        String userEmail = jwtTokenProvider.getClaims(accessToken).get("sub").toString();

        return userRepository.findByUserEmail(userEmail).get();
    }
    public List<RoomImage> saveRoomImages(List<RoomImageDTO> roomImageList){

        //사용자가 방의 사진을 업로드 하지않은 경우
        if(roomImageList.size() == 1 && roomImageList.get(0).getRoomImageRealName().equals("정보 없음")){

            return roomFileHandler.manageDefaultImage();
        }

        //사용자가 방의 사진을 1~@개 업로드 한 경우
        return roomFileHandler.manageImages(roomImageList);


    }

    public void SaveRoomImagesToDB(List<RoomImage> roomImageList, Room room){
        for(RoomImage roomImage : roomImageList){
            roomImage.updateRoom(room);
            roomImageRepository.save(roomImage);
        }
    }
}
