package com.togethersports.tosproejct.security.jwt.util;


import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.Role;
import com.togethersports.tosproejct.security.jwt.JwtProperties;

import com.togethersports.tosproejct.security.jwt.token.TokenType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.Properties;

/**
 * <h1>JwtDecoder</h1>
 * <p>
 *     JWT 토큰을 디코드 하고 민료, 변조 등의 예외가 없는지 확인하는 클래스
 * </p>
 *
 * @author seunjeon
 * @author younghocha
 */
@Slf4j
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
    public Account verifyAccessToken(String token, TokenType tokenType) throws ExpiredJwtException, SignatureException, MissingClaimException, MalformedJwtException {
        if (tokenType == TokenType.ACCESS_TOKEN) {

            String key = properties.getAccessTokenSigningKey();
            Jws<Claims> jwt = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(key.getBytes()))
                    .requireIssuer(properties.getIssuer())
                    .build()
                    .parseClaimsJws(token);
            Claims jwtBody = jwt.getBody();
            Long id = Long.valueOf(jwtBody.getSubject());
            String email = (String) jwtBody.get("email");
            String nickname = (String) jwtBody.get("user");
            Role role = Role.valueOf((String) jwtBody.get("role"));

            return Account.convertAccount(id, email, nickname, role);
        }

        //refresh 경우
        return null;

    }

    /**
     * 리프레시 토큰을 검증하고, 갱신여부를 판단하는 메소드이다.
     * @param refreshToken : 리프레시 과정 중 전달 받은 리프레시 토큰이다.
     * @return boolean
     *  - true : 갱신 필요
     *  - false : 갱신 불필요
     */
    public boolean verifyRefreshToken(String refreshToken){
        //JwtProperties jwtProperties = new JwtProperties();
        log.info("여기까지 옴");
        String key = "kGO2WGNVgLVHVhz5M1Y8nQuT7mH69JHlGqSk5X9Qi7M!";
        log.info("key = {}", key);

        Jws<Claims> jwt = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(key.getBytes()))
                .build()
                .parseClaimsJws(refreshToken);


        log.info("여기까지옴 2");


        if(checkRenewal(jwt.getBody().getExpiration())){
            return true;
        }

        return false;

    }

    /**
     * Refresh Token의 말료 날짜를 확인하여 3일 이하로 남았을 경우 갱신하기 위한, 날짜 차이를 계산하는 메소드.
     * @param expireDate 토큰의 만료 날짜
     * @return boolean
     *  - true: 만료날짜가 3일 남았음, 리프레시 토큰 갱신 필요
     *  - false: 만료날짜가 3일 이상 남았음, 리프레시 토큰 갱신 불필요
     */
    public boolean checkRenewal(Date expireDate){

        //현재 시간
        Calendar now = Calendar.getInstance();
        now.setTime(new Date());

        //만료 시간
        Calendar expireCalendar = Calendar.getInstance();
        expireCalendar.setTime(expireDate);


        //시간 차이
        long diffSec = (expireCalendar.getTimeInMillis() - now.getTimeInMillis()) / 1000;
        long diffDays = diffSec / (24*60*60); //일자수 차이

        if(diffDays <= 3){
            return true;
        }

        return false;
    }

}
