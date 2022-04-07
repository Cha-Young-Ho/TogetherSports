package com.togethersports.tosproejct.room.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageOfRoomInfo {
    private String imagePath;
    private int order;
}
