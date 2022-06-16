package com.togethersports.tosproject.security;

import com.togethersports.tosproject.security.jwt.service.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

    @InjectMocks
    private JwtService jwtService;

    private final String JWT_KEY = "KWJ0fT7c7abcdcPCAceeff1U+eRaabbkStdedeZhffkW";
    private final Long JWT_EXPIRED_TIME = 30L;


    @DisplayName("엑세스 토큰 생성 테스트")
    @Test
    public void createJWT() throws Exception{

        //given
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", "sub");

        //when
        String token = jwtService.createToken(JWT_KEY, JWT_EXPIRED_TIME, ChronoUnit.MINUTES, payload);

        //then
        Assertions.assertNotNull(token);


    }

    @DisplayName("엑세스 토큰 검증 성공 테스트")
    @Test
    public void verifyJwtOnSuccess() throws Exception{

        //given
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", "sub");
        String token = jwtService.createToken(JWT_KEY, JWT_EXPIRED_TIME, ChronoUnit.MINUTES, payload);

        //when
        //then
        Assertions.assertDoesNotThrow(
                () -> jwtService.verifyToken(token, JWT_KEY)
        );


    }

    @DisplayName("엑세스 토큰 검증 실패 - 변조")
    @Test
    public void verifyJwtExceptionSignature() throws Exception{


        //given
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", "sub");
        String token = jwtService.createToken(JWT_KEY, JWT_EXPIRED_TIME, ChronoUnit.MINUTES, payload);
        String token2 = token.substring(0, token.length() - 1) + "a";
        //when
        //then
        Assertions.assertThrows(SignatureException.class,
                () -> jwtService.verifyToken(token2, JWT_KEY));

    }

    @DisplayName("엑세스 토큰 검증 실패 - 만료")
    @Test
    public void verifyJwtExceptionExpired() throws Exception{

        //given
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", "sub");
        String token = jwtService.createToken(JWT_KEY, JWT_EXPIRED_TIME, ChronoUnit.NANOS, payload);
        //when
        //then
        Assertions.assertThrows(ExpiredJwtException.class,
                () -> jwtService.verifyToken(token, JWT_KEY));


    }

}
