package com.togethersports.tosproejct.room.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class RoomsOfListInfo {

    private String roomTitle;
    private String roomContent;
    private String area;
    private int participantCount;
    private List<String> tag;
    private int viewCount;
    private LocalDateTime startAppointmentDate;
    private LocalDateTime endAppointmentDate;
    private String exercise;
    private int limitPeopleCount;

}
