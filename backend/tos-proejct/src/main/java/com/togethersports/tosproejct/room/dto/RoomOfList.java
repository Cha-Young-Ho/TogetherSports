package com.togethersports.tosproejct.room.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.querydsl.core.types.dsl.DateTimePath;
import com.togethersports.tosproejct.tag.Tag;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class RoomOfList {

    private Long roomId;
    private String roomTitle;
    private int limitPeopleCount;
    private int participantCount;
    private List<Tag> tag;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime START_APPOINTMENT_DATE;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime END_APPOINTMENT_DATE;

    public RoomOfList(){

    }


    public RoomOfList(Long roomId, String roomTitle, Integer limitPeopleCount, Integer participantCount, List<Tag> tag, LocalDateTime startAppointmentDate, LocalDateTime endAppointmentDate) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.limitPeopleCount = limitPeopleCount;
        this.participantCount = participantCount;
        this.tag = tag;
        this.START_APPOINTMENT_DATE = startAppointmentDate;
        this.END_APPOINTMENT_DATE = endAppointmentDate;
    }
}
