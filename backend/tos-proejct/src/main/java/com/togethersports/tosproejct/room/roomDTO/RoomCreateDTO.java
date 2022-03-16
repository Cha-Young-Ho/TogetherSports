package com.togethersports.tosproejct.room.roomDTO;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime startAppointmentDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime endAppointmentDate;
    private List<RoomImageDTO> roomImages;

}
