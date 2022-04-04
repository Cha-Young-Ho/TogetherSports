package com.togethersports.tosproejct.room.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.togethersports.tosproejct.security.Role;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
/**
 * <h1>RoomOfCreate</h1>
 * <p>
 *     방 생성 관련 DTO
 * </p>
 * @author younghocha
 */

@Getter
@Builder
public class RoomOfCreate {

    private String roomTitle;

    private String roomContent;

    private String roomArea;

    private int limitParticipantCount;

    private List<ImageOfRoomCreate> images;

    private List<String> tag;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startAppointmentDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endAppointmentDate;

    private String exercise;
}
