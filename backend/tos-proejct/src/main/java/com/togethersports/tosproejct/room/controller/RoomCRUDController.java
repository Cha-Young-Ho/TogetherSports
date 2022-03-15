package com.togethersports.tosproejct.room.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping
public class RoomCRUDController {

    @PostMapping("/room")
    public void createRoom(){

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
