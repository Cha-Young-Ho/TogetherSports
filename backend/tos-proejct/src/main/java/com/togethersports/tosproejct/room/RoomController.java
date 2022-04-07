package com.togethersports.tosproejct.room;


import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.room.dto.RoomOfCreate;
import com.togethersports.tosproejct.room.dto.RoomOfInfo;
import com.togethersports.tosproejct.security.annotation.CurrentUser;
import com.togethersports.tosproejct.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
