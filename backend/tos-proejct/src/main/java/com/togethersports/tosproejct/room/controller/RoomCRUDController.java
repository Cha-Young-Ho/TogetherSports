//package com.togethersports.tosproejct.room.controller;
//
//import com.togethersports.tosproejct.code.Code;
//import com.togethersports.tosproejct.response.DefaultResponse;
//import com.togethersports.tosproejct.room.roomDTO.RoomCreateDTO;
//import com.togethersports.tosproejct.room.service.RoomCRUDService;
//import lombok.AllArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@Slf4j
//@RestController
//@AllArgsConstructor
//@RequestMapping
//public class RoomCRUDController {
//
//    private RoomCRUDService roomCRUDService;
//
//    @PostMapping("/room")
//    public ResponseEntity<DefaultResponse> createRoom(@RequestBody RoomCreateDTO roomCreateDTO, @RequestHeader("Authorization") String accessToken){
//
//        log.info("roomCreateDTO = {}", roomCreateDTO);
//
//        roomCRUDService.createRoom(roomCreateDTO, accessToken);
//        DefaultResponse response = new DefaultResponse(Code.GOOD_REQUEST);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
//
//    @PutMapping("/room")
//    public void updateRoom(){
//
//    }
//
//    @DeleteMapping("/room")
//    public void deleteRoom(){
//
//    }
//
//    @GetMapping("/room/detail")
//    public void getRoomInfo(){
//
//    }
//
//    @GetMapping("/rooms")
//    public void getRoomList(){
//
//    }
//
//
//
//}
