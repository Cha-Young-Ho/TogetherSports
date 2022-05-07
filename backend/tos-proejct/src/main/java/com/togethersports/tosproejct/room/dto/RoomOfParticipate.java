package com.togethersports.tosproejct.room.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.room.code.RoomCode;
import com.togethersports.tosproejct.user.dto.UserOfOtherInfo;
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
