package com.togethersports.tosproejct.room.controller;

import com.togethersports.tosproejct.room.roomDTO.RoomCreateDTO;
import com.togethersports.tosproejct.room.service.RoomCRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping
public class RoomCRUDController {

    private RoomCRUDService roomCRUDService;

    @PostMapping("/room")
    public void createRoom(@RequestBody RoomCreateDTO roomCreateDTO){

        log.info("roomCreateDTO = {}", roomCreateDTO);



    }

    @PutMapping("/room")
    public void updateRoom(){

    }

    @DeleteMapping("/room")
    public void deleteRoom(){

    }

    @GetMapping("/room/detail")
    public void getRoomInfo(){

    }

    @GetMapping("/rooms")
    public void getRoomList(){

    }



}
