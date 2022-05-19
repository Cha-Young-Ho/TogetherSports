
package com.togethersports.tosproject.room.dto;

import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.user.User;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserAndRoomOfService {
    private User user;
    private Room room;

}
