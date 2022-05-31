package com.togethersports.tosproject.room.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * <h1>ImageOfRoomInfo</h1>
 * <p>
 * 방 조회를 위한 이미지 DTO
 * </p>
 * @author younghoCha
 */
@Getter
@Builder
public class ImageOfRoomInfo {
    private String imagePath;
    private int order;
    private String roomImageExtension;
}
