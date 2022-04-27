package com.togethersports.tosproejct.room;


import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.room.code.RoomCode;
import com.togethersports.tosproejct.room.dto.FieldsOfRoomList;
import com.togethersports.tosproejct.room.dto.RoomOfCreate;
import com.togethersports.tosproejct.room.dto.RoomOfInfo;
import com.togethersports.tosproejct.room.dto.RoomOfUpdate;
import com.togethersports.tosproejct.security.annotation.CurrentUser;
import com.togethersports.tosproejct.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class RoomController {

    private final RoomService roomService;

    @PostMapping("/api/room")
    public ResponseEntity<Response> createRoom(@CurrentUser User user, @RequestBody @Validated RoomOfCreate roomOfCreate){

        roomService.createRoom(user, roomOfCreate);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, null));

    }

    @GetMapping("/api/room/{roomId}")
    public ResponseEntity<Response> getRoomInfo(@PathVariable Long roomId){

        RoomOfInfo roomOfInfo = roomService.getRoomInfo(roomId);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, roomOfInfo));
    }

    @PutMapping("api/room")
    public ResponseEntity<Response> modifyRoomInfo(@RequestBody RoomOfUpdate roomOfUpdate){

        roomService.modifyRoomInfo(roomOfUpdate);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, null));

    }

    @GetMapping("/api/room")
    public ResponseEntity<Response> getRoomList(FieldsOfRoomList fieldsOfRoomList, Pageable pageable){


        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, roomService.roomFields(fieldsOfRoomList, pageable)));

    }

    @PostMapping("/api/room/{roomId}/user")
    public ResponseEntity<Response> checkAvailability(@PathVariable Long roomId){

        boolean availability = roomService.checkAvailability(roomId);
        //참가할 수 있는 경우
        if(!availability){
            return ResponseEntity.ok(Response.of(RoomCode.FULL_ROOM, false));
        }
        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, true));
    }
}
