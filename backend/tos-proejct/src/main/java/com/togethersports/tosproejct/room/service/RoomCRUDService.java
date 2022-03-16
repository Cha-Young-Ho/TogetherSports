package com.togethersports.tosproejct.room.service;

import com.togethersports.tosproejct.jwt.JwtTokenProvider;
import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.room.fields.RoomImage;
import com.togethersports.tosproejct.room.fields.RoomTag;
import com.togethersports.tosproejct.room.module.RoomFileHandler;
import com.togethersports.tosproejct.room.repository.RoomRepository;
import com.togethersports.tosproejct.room.roomDTO.RoomCreateDTO;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@AllArgsConstructor
@RequiredArgsConstructor
@Service
public class RoomCRUDService {

    private RoomRepository roomRepository;
    private JwtTokenProvider jwtTokenProvider;
    private UserRepository userRepository;
    private RoomFileHandler roomFileHandler;

    //방 생성 메소드
    public void createRoom(RoomCreateDTO roomCreateDTO, String accessToken){

        Room room = Room.builder()
                    .roomArea(roomCreateDTO.getRoomArea())
                    .roomContent(roomCreateDTO.getRoomContent())
                    .roomTitle(roomCreateDTO.getRoomTitle())
                    .endAppointmentDate(roomCreateDTO.getEndAppointmentDate())
                    .startAppointmentDate(roomCreateDTO.getStartAppointmentDate())
                    .exercise(roomCreateDTO.getExercise())
                    .roomTagList(parsingRoomTag(roomCreateDTO.getTag()))
                    .limitPeopleCount(roomCreateDTO.getLimitPeopleCount())
                            .roomImages(parsingRoomImages(roomCreateDTO.getRoomImages()))
                    .host(parsingHost(accessToken))
                    .build();


        roomRepository.save(room);

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
    public List<RoomImage> parsingRoomImages(List<RoomImage> roomImageList){

        //사용자가 방의 사진을 지정해주지 않은 경우
        if(roomImageList.size() == 1 && roomImageList.get(0).getRoomImageRealName().equals("정보 없음")){
            List<RoomImage> roomImages = new ArrayList<>();
            roomImages.add(roomFileHandler.manageDefaultImage());

            return roomImages;
        }

        return roomFileHandler.manageImages(roomImageList);


    }
}
