package com.togethersports.tosproejct.room.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.room.code.RoomCode;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class RoomOfParticipate<T> {
    @JsonIgnore
    RoomCode status;

    RoomOfInfo roomOfInfo;
    //List<UserOfOtherInfo> participates;


}
