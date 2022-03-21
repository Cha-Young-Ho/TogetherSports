package com.togethersports.tosproejct.room.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoomImageDTO {
    private String imageSource;
    private String roomImageRealName;
    private String roomImageSaveName;
    private String roomImageExtension;


}
