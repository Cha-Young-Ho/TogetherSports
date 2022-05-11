package com.togethersports.tosproject.room.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproject.room.code.RoomCode;
import com.togethersports.tosproject.user.dto.UserOfOtherInfo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class RoomOfParticipate {
    @JsonIgnore
    RoomCode status;

    RoomOfInfo roomOfInfo;

    List<UserOfOtherInfo> participates;


}
