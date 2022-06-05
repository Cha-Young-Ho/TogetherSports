package com.togethersports.tosproject.room;

import com.togethersports.tosproject.room.dto.ImageOfRoomCRUD;
import com.togethersports.tosproject.room.dto.RoomOfCreate;
import com.togethersports.tosproject.tag.Tag;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class TestRoomUtils {

    public RoomOfCreate getRoomOfCreate(){
        List<String> tagList = new ArrayList<>();
        tagList.add("20대");

        List<ImageOfRoomCRUD> image = new ArrayList<>();

        image.add(ImageOfRoomCRUD.builder().imageSource("ag").roomImageExtension("png").order(0).build());

        return  RoomOfCreate.builder()
                .roomArea("서울특별시 강남구 역삼동")
                .roomContent("초보만")
                .endAppointmentDate(LocalDateTime.of(2022, 12, 31, 06, 00,00))
                .exercise("축구")
                .limitPeopleCount(10)
                .startAppointmentDate(LocalDateTime.of(2022, 12, 31, 01, 00,00))
                .roomTitle("축구방")
                .tags(tagList)
                .roomImages(image)
                .build();
    }
}
