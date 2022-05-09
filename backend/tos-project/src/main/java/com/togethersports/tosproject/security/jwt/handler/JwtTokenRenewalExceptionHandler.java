package com.togethersports.tosproject.security.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.security.jwt.JwtErrorCode;
import com.togethersports.tosproject.security.jwt.exception.JwtExpiredTokenException;
import com.togethersports.tosproject.security.jwt.exception.JwtModulatedTokenException;
import com.togethersports.tosproject.security.jwt.exception.RefreshTokenNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Objects;

/**
 * <h1>JwtRefreshTokenExceptionHandler</h1>
 * <p>
 *     토큰 갱신 과정중 예외 발생 시 오류응답을 처리하는 클래스
 * </p>
 * @author younghocha
 * @author seunjeon
 */
@RequiredArgsConstructor
@Component
public class JwtTokenRenewalExceptionHandler {

    private final ObjectMapper objectMapper;
    /**
     * 발생한 예외에 맞는 응답을 내려주도록 처리한다.
     * @param request HTTP 요청 객체
     * @param response HTTP 응답 객체
     * @param e 토큰 갱신과정에서 발생한 예외
     */
    public void onRenewalFailure(HttpServletRequest request, HttpServletResponse response, Exception e) throws IOException {
        Response<?> responseValue = null;
        if (e instanceof NullPointerException){
            // TODO 리프레쉬 토큰이 본문에 없는 경우에 해당하는 별도의 커스텀 응답이 필요
            responseValue = Response.of(JwtErrorCode.TOKEN_NOTFOUND, null);

        } else if (e instanceof JwtModulatedTokenException) {
            responseValue = Response.of(JwtErrorCode.TOKEN_MODULATED, null);

        } else if (e instanceof JwtExpiredTokenException) {
            responseValue = Response.of(JwtErrorCode.REFRESH_TOKEN_EXPIRATION, null);

        } else if (e instanceof RefreshTokenNotFoundException) {
            responseValue = Response.of(JwtErrorCode.DELETED_REFRESH_TOKEN, null);
        }

        response.setStatus(HttpStatus.BAD_REQUEST.value());
        response.setHeader(HttpHeaders.CONTENT_ENCODING, "UTF-8");
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
        if (Objects.nonNull(responseValue)) {
            PrintWriter writer = response.getWriter();
            writer.write(objectMapper.writeValueAsString(responseValue));
        }
    }
}
