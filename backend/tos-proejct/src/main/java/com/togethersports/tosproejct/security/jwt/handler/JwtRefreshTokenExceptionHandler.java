package com.togethersports.tosproejct.security.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.jwt.JwtErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

/**
 * <h1>JwtRefreshTokenExceptionHandler</h1>
 * <p>
 *     Refresh Token 유효성 체크 과정 중 예외 발생 시, Response를 처리하는 클래스
 * </p>
 * @author younghocha
 */
public class JwtRefreshTokenExceptionHandler {

    //변조 토큰 응답 메소드
    public void createModulatedResponse(HttpServletResponse response) throws IOException {
        setDefaultResponse(response, JwtErrorCode.TOKEN_MODULATED);
    }

    //만료 토큰 응답 메소드
    public void createExpiredResponse(HttpServletResponse response) throws IOException {
        setDefaultResponse(response, JwtErrorCode.REFRESH_TOKEN_EXPIRATION);
    }

    //DB에 저장되지 않은 리프레시 토큰 응답 메소드
    public void createNullResponse(HttpServletResponse response) throws IOException {
        setDefaultResponse(response, JwtErrorCode.DELETED_REFRESH_TOKEN);
    }

    //응답 셋팅 공통 메소드
    public void setDefaultResponse(HttpServletResponse response, JwtErrorCode code) throws IOException {
        Response<?> responseValue = Response.of(code, null);
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        if (Objects.nonNull(responseValue)) {
            ObjectMapper objectMapper = new ObjectMapper();
            PrintWriter writer = response.getWriter();
            writer.write(objectMapper.writeValueAsString(responseValue));
        }
    }

}
