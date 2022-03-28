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
 *     <li>issuer 발행자</li>
 *     <li>signingKey 서명키값</li>
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

    private String issuer;

    private String signingKey;

    private Long accessTokenExpirationTime;

    private Long refreshTokenExpirationTime;

}
