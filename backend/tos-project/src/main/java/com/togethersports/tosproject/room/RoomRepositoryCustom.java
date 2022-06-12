package com.togethersports.tosproject.room;

import com.togethersports.tosproject.room.dto.FieldsOfRoomList;
import com.togethersports.tosproject.room.dto.RoomOfList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
/**
 * <h1>RoomRepositoryCustom</h1>
 * <p>
 *     JPA Repository와 QueryDSL을 같이 쓰기위한(2 extends) Custom Repository
 * </p>
 * @author younghocha
 */
public interface RoomRepositoryCustom {

    Page<RoomOfList> searchAll(FieldsOfRoomList fieldsOfRoomList, Pageable pageable);

}
