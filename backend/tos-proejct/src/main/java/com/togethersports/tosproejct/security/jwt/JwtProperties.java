package com.togethersports.tosproejct.security.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * <h1>JwtProperties</h1>
 * <p>
 *     JWT 관련 설정값 클래스
 * </p>
 * <ul>
 *     <li>accessTokenSigningKey 액세스 토큰 서명키값</li>
 *     <li>refreshTokenSigningKey 리프레쉬 토큰 서명키값</li>
 *     <li>accessTokenExpirationTime 액세스 토큰 만료기간</li>
 *     <li>refreshTokenExpirationTime 리프레쉬 토큰 만료기간</li>
 * </ul>
 * @author seunjeon
 */
@Getter
@Setter
@Component
@ConfigurationProperties("jwt")
public class JwtProperties {

    //엑세스 토큰 키
    private String accessTokenSigningKey;

    //리프레시 토큰 키
    private String refreshTokenSigningKey;

    //엑세스 토큰 만료기간
    private Long accessTokenExpirationTime;

    //리프레시 토큰 만료기간
    private Long refreshTokenExpirationTime;

}
