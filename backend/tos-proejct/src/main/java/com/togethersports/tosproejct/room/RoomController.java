package com.togethersports.tosproejct.room;

import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.room.code.RoomCode;
import com.togethersports.tosproejct.room.dto.*;
import com.togethersports.tosproejct.security.annotation.CurrentUser;
import com.togethersports.tosproejct.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
/**
 * <h1>RoomController</h1>
 * <p>
 *     방과 관련된 요청에 대한 컨트롤러
 * </p>
 * @author younghocha
 */
@Slf4j
@RequiredArgsConstructor
@RestController
public class RoomController {

    private final RoomService roomService;

    //방 생성
    @PostMapping("/api/room")
    public ResponseEntity<Response> createRoom(@CurrentUser User user, @RequestBody @Validated RoomOfCreate roomOfCreate){

        roomService.createRoom(user, roomOfCreate);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, null));

    }

    @GetMapping("/api/room/{roomId}")
    public ResponseEntity<Response> getRoomInfo(@CurrentUser User user, @PathVariable Long roomId){

        RoomOfInfo roomOfInfo = roomService.getRoomInfo(user, roomId);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, roomOfInfo));
    }

    @PutMapping("/api/room")
    public ResponseEntity<Response> modifyRoomInfo(@RequestBody RoomOfUpdate roomOfUpdate){

        roomService.modifyRoomInfo(roomOfUpdate);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, null));

    }

    @GetMapping("/api/room")
    public ResponseEntity<Response> getRoomList(FieldsOfRoomList fieldsOfRoomList, Pageable pageable){


        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, roomService.roomFields(fieldsOfRoomList, pageable)));

    }
    //방 참가
    @PostMapping("/api/room/{roomId}/user")
    public ResponseEntity<Response> participateRoom(@CurrentUser User user, @PathVariable Long roomId){

        RoomOfParticipate room = roomService.participateRoom(user, roomId);
        // 인원이 꽉 찬 방
        if(room.getStatus() == RoomCode.FULL_ROOM){
            return ResponseEntity.ok(Response.of(RoomCode.FULL_ROOM, null));
        }
        // 시간이 지난 방
        if(room.getStatus() == RoomCode.TIME_OUT_ROOM){
            return ResponseEntity.ok(Response.of(RoomCode.TIME_OUT_ROOM, null));
        }

        // 참가 완료
        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, room));
    }

    @GetMapping("/api/room/myroom")
    public ResponseEntity<Response> myRoom(@CurrentUser User user){
        RoomsOfMyRoom rooms = roomService.getMyRoom(user);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, rooms));

    }

    //방장 위임
    @PatchMapping("/api/room/{roomId}/user/delegate")
    public ResponseEntity delegate(@CurrentUser User user, @PathVariable Long roomId, Long targetUserId){


        Response response = roomService.delegate(user, roomId, targetUserId);

        return ResponseEntity.ok(response);
    }

    //강퇴
    @DeleteMapping("/api/room/{roomId}/user/kick-out")
    public ResponseEntity kickOut(@CurrentUser User user, @PathVariable Long roomId, Long targetUserId){

        Response response = roomService.kickOut(user, roomId, targetUserId);

        return ResponseEntity.ok(response);
    }
}
