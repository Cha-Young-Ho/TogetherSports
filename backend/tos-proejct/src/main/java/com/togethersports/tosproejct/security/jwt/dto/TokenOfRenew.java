package com.togethersports.tosproejct.security.jwt.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * <h1>TokenOfRenew</h1>
 * <p>
 *     토큰 갱신 응답 DTO
 * </p>
 * @author seunjeon
 */
@Setter
@Getter
public class TokenOfRenew {

    private String accessToken;
    private String refreshToken;
}
