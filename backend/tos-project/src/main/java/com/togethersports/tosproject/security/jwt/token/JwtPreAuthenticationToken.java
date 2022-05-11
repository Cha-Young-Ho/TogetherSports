package com.togethersports.tosproject.security.jwt.token;

import org.springframework.security.authentication.AbstractAuthenticationToken;

/**
 * <h1>JwtPreAuthenticationToken</h1>
 * <p>
 *     JWT 인증 전 객체
 * </p>
 * @author seunjeon
 */
public class JwtPreAuthenticationToken extends AbstractAuthenticationToken {

    private String token;

    /**
     * JWT 토큰으로 인증 전 객체를 생성하는 생성자
     * @param token jwt 토큰
     */
    public JwtPreAuthenticationToken(String token) {
        super(null); // 인증 전 객체이므로 권한 정보가 없음
        this.setAuthenticated(false);
        this.token = token;
    }

    // OAuth2 인증 이므로 별도의 패스워드 없음 사용X
    @Override
    public Object getCredentials() {
        return "";
    }

    // 인증 전이므로 요청으로 들어온 그대로의 토큰 반환
    @Override
    public Object getPrincipal() {
        return token;
    }
}
