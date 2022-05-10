package com.togethersports.tosproejct.room.dto;

import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.user.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserAndRoomOfService {
    private User user;
    private Room room;
}
