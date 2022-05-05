package com.togethersports.tosproejct.room.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class RoomsOfMyRoom {

    private List<RoomOfList> imminentRooms;
    private List<RoomOfList> hostingRooms;
    private List<RoomOfList> participateRooms;

}
