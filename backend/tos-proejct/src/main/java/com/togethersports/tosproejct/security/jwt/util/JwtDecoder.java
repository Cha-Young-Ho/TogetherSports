package com.togethersports.tosproejct.security.jwt.util;


import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.Role;
import com.togethersports.tosproejct.security.jwt.JwtProperties;

import com.togethersports.tosproejct.security.jwt.token.TokenType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * <h1>JwtDecoder</h1>
 * <p>
 *     JWT 토큰을 디코드 하고 민료, 변조 등의 예외가 없는지 확인하는 클래스
 * </p>
 *
 * @author seunjeon
 */
@RequiredArgsConstructor
@Component
public class JwtDecoder {

    private final JwtProperties properties;

    /**
     * JWT 토큰을 검증하고 검증 성공시 계정 엔티티 또는 null 을 반환한다. 검증 실패시 반드시 예외를 발생시킨다.
     * @param token 검증 대상 토큰 값
     * @return account - access token 일 경우 변환한 엔티티, null - refresh token 일 경우
     * @throws ExpiredJwtException 토큰 만료시 발생
     * @throws SignatureException 토큰 서명이 틀린 경우 발생
     * @throws MissingClaimException 토큰에 특정 클레임이 없는 경우 발생
     * @throws MalformedJwtException 토큰이 유효한 형식이 아닌 경우 발생
     */
    public Account verify(String token, TokenType tokenType) throws ExpiredJwtException, SignatureException, MissingClaimException, MalformedJwtException {
        Jws<Claims> jwt = Jwts.parserBuilder()
//                .setSigningKey(Keys.hmacShaKeyFor(properties.getSigningKey().getBytes()))
                .setSigningKey(Keys.hmacShaKeyFor("kGO2WGNVgLVHVhz5M1Y8nQuT7mH69JHlGqSk5X9Qi7M=".getBytes()))
//                .requireIssuer(properties.getIssuer())
                .requireIssuer("together-sports")
                .build()
                .parseClaimsJws(token);

        if (tokenType == TokenType.ACCESS_TOKEN) {
            Claims jwtBody = jwt.getBody();
            Long id = Long.valueOf(jwtBody.getSubject());
            String email = (String) jwtBody.get("email");
            String nickname = (String) jwtBody.get("nickname");
            Role role = Role.valueOf((String) jwtBody.get("role"));

            return Account.convertAccount(id, email, nickname, role);
        } else {
            return null;
        }

    }

}
