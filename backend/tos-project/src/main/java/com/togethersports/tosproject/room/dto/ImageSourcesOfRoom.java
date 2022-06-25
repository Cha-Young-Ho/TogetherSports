package com.togethersports.tosproject.room.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ImageSourcesOfRoom {

    private int order;
    private String imageSource;
    private String imageExtension;
}
