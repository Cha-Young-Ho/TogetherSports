package com.togethersports.tosproejct.chat.dto;


import lombok.Builder;
import lombok.Getter;

/**
 * <h1>MessageOfDelegate</h1>
 *
 * 방장 위임 성공 시, 사용되는 DTO
 * 사용처 : 소켓 메세징, 방장 위임(HTTP)
 *
 * @author : younghoCha
 */
@Getter
@Builder
public class MessageOfDelegate {

    private String beforeHostNickname;
    private Long beforeHostId;
    private String afterHostNickname;
    private Long afterHostId;
}
