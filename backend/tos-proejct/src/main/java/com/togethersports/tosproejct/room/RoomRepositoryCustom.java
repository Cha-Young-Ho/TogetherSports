package com.togethersports.tosproejct.room;

import com.togethersports.tosproejct.room.dto.FieldsOfRoomList;
import com.togethersports.tosproejct.room.dto.RoomOfList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoomRepositoryCustom {

    Page<Room> searchAll(FieldsOfRoomList fieldsOfRoomList, Pageable pageable);
}
