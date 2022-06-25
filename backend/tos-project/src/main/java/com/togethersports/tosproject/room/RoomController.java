package com.togethersports.tosproject.room;

import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.room.code.RoomCode;
import com.togethersports.tosproject.room.dto.*;
import com.togethersports.tosproject.security.annotation.CurrentUser;
import com.togethersports.tosproject.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * <h1>RoomController</h1>
 * <p>
 *     방과 관련된 요청에 대한 컨트롤러
 * </p>
 * @author younghoCha
 */
@Slf4j
@RequiredArgsConstructor
@RestController
public class RoomController {

    private final RoomService roomService;

    //방 생성
    @PostMapping("/api/room")
    public ResponseEntity<Response> createRoom(@CurrentUser User user, @RequestBody @Validated RoomOfCreate roomOfCreate){

        Response response = roomService.createRoom(user, roomOfCreate);

        return ResponseEntity.ok(response);

    }

    //방 정보 조회
    @GetMapping("/api/rooms/{roomId}/info")
    public ResponseEntity<Response> getRoomInfo(@CurrentUser User user, @PathVariable Long roomId){

        RoomOfInfo roomOfInfo = roomService.getRoomInfo(roomId);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, roomOfInfo));
    }

    //방 수정
    @PutMapping("/api/room")
    public ResponseEntity<Response> modifyRoomInfo(@RequestBody RoomOfUpdate roomOfUpdate){

        Response response = roomService.modifyRoomInfo(roomOfUpdate);

        return ResponseEntity.ok(response);

    }

    //방 목록 조회
    @GetMapping("/api/room")
    public ResponseEntity<Response> getRoomList(FieldsOfRoomList fieldsOfRoomList, Pageable pageable){
        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, roomService.roomFields(fieldsOfRoomList, pageable)));

    }

    //방 참가
    @PostMapping("/api/room/{roomId}/user")
    public ResponseEntity<Response> participateRoom(@CurrentUser User user,  @PathVariable Long roomId){
        log.info("room id = {}", roomId);
        Response response = roomService.participateRoom(user, roomId);

        return ResponseEntity.ok(response);
    }

    //내 일정 조회
    @GetMapping("/api/room/myroom")
    public ResponseEntity<Response> myRoom(@CurrentUser User user){
        RoomsOfMyRoom rooms = roomService.getMyRoom(user);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, rooms));
    }

    //방장 위임
    @PatchMapping("/api/room/{roomId}/user/delegate")
    public ResponseEntity delegate(@RequestBody TargetOfHostRequest target, @CurrentUser User user, @PathVariable Long roomId){
        Long targetUserId = target.getTargetUserId();

        Response response = roomService.delegate(user, roomId, targetUserId);

        return ResponseEntity.ok(response);
    }

    //강퇴
    @DeleteMapping("/api/room/{roomId}/user/{userId}/kick-out")
    public ResponseEntity kickOut(@CurrentUser User user, @PathVariable Long roomId, @PathVariable Long userId){

        Response response = roomService.kickOut(user, roomId, userId);

        return ResponseEntity.ok(response);
    }
    //방 나가기
    @DeleteMapping("/api/room/{roomId}/user")
    public ResponseEntity out(@CurrentUser User user, @PathVariable Long roomId){
        Response response = roomService.out(user, roomId);

        return ResponseEntity.ok(response);
    }

    //구하고있는 방 전체 개수 조회
    @GetMapping("/api/room/count")
    public ResponseEntity getRoomCountJPQL(){
        Response response = roomService.getRoomCount();
        return ResponseEntity.ok(response);
    }

    //운동 대기방 조회
    @GetMapping("/api/rooms/{roomId}/detail")
    public ResponseEntity getRoomDetailInfo(@PathVariable Long roomId, @CurrentUser User user){

        Response response = roomService.getRoomDetailInfo(roomId, user);
        return ResponseEntity.ok(response);
    }

    //해당 방 참여 여부 조회
    @GetMapping("/api/rooms/{roomId}/attendance")
    public ResponseEntity getRoomAttendance(@PathVariable Long roomId, @CurrentUser User user){
        boolean attendance = roomService.getAttendance(user.getId(), roomId);

        if(attendance){
            Response response = Response.of(RoomCode.PARTICIPATING_ROOM, AttendanceOfRoom.builder().attendance(attendance).build());
            return ResponseEntity.ok(response);
        }

        Response response = Response.of(RoomCode.NOT_PARTICIPATE_ROOM, AttendanceOfRoom.builder().attendance(attendance).build());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/room/{roomId}/imageSource")
    public ResponseEntity getRoomImageSources(@PathVariable Long roomId, @CurrentUser User user){

        return ResponseEntity.ok(roomService.getRoomImageSources(roomId, user));

    }



}
