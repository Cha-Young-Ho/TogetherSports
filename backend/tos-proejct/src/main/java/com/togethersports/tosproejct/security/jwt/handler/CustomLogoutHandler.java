package com.togethersports.tosproejct.security.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.jwt.JwtErrorCode;
import com.togethersports.tosproejct.security.jwt.JwtProperties;
import com.togethersports.tosproejct.security.jwt.service.RefreshTokenService;
import com.togethersports.tosproejct.security.jwt.util.JwtDecoder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;

/**
 * <h1>CustomLogoutHandler</h1>
 * <p>Logout 처리 클래스</p>
 * <p>해당 클래스는 request를 검증하고, DB에 Refresh Token을 삭제하기 위한 클래스다.</p>
 * @author yunghocha
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class CustomLogoutHandler implements LogoutHandler {
    @Autowired
    private JwtProperties jwtProperties;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // Request 토큰 추출
        Map<String, String> map = getBodyAndSetResponse(request, response);
        if(map != null) {
            // refresh 값이 있을 경우 필요한 헤더 추출
            String refreshToken = map.get("refreshToken");
            // refresh 제거
//            refreshTokenService.removeRefreshTokenByToken(refreshToken);


            return;
        }

        return;
    }

    private Map<String, String> getBodyAndSetResponse(HttpServletRequest request, HttpServletResponse response){
        ServletInputStream inputStream = null;
        Map<String, String> map = null;
        try {
            inputStream = request.getInputStream();
            map = objectMapper.readValue(StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8), Map.class);
            log.info("로그아웃 실행");
            setResponse(response, map);

        } catch (IOException e) {
            e.printStackTrace();
        }

        return map;
    }

    private HttpServletResponse setResponse(HttpServletResponse response, Map<String, String> map) throws IOException {
        //기본 헤더 세팅
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        //성공
        Response<?> responseValue = Response.of(CommonCode.GOOD_REQUEST, null);
        // 토큰 누락
        if(map.get("refreshToken") == null){
            log.info("토큰 누락");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            responseValue = Response.of(JwtErrorCode.TOKEN_NOTFOUND, null);
        }

        if (Objects.nonNull(responseValue)) {
            log.info("굳");
            PrintWriter writer = response.getWriter();
            writer.write(objectMapper.writeValueAsString(responseValue));
        }
        return response;
    }

    public JwtDecoder getJwtDecoder(){
        return new JwtDecoder(this.jwtProperties);
    }

    public void checkRefreshToken(String refreshToken, HttpServletResponse response){
        getJwtDecoder().verifyRefreshToken(refreshToken);
    }

}
