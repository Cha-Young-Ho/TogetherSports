package com.togethersports.tosproejct.room.dto;

import com.togethersports.tosproejct.security.Role;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import lombok.Builder;
import lombok.Getter;

/**
 * <h1>ImageOfRoomCreate</h1>
 * <p>
 *     방 생성 관련 방 이미지 DTO
 * </p>
 * @author younghocha
 */
@Getter
@Builder
public class ImageOfRoomCreate {

    private String roomImageExtention;
    private String ImageSource;

}
