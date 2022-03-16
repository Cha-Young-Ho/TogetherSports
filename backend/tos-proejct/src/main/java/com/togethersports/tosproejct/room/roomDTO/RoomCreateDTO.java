package com.togethersports.tosproejct.room.roomDTO;

import com.togethersports.tosproejct.room.fields.RoomArea;
import com.togethersports.tosproejct.room.fields.RoomImage;
import com.togethersports.tosproejct.room.fields.RoomTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomCreateDTO {

    private String roomTitle;
    private String roomContent;
    private String exercise;
    private RoomArea roomArea;
    private int limitPeopleCount;
    private List<String> tag;
    private LocalDateTime startAppointmentDate;
    private LocalDateTime endAppointmentDate;
    private List<RoomImage> roomImages;

}
