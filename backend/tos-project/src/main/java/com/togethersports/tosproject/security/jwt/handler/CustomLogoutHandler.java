package com.togethersports.tosproject.security.jwt.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.togethersports.tosproject.common.code.CommonCode;
import com.togethersports.tosproject.common.dto.Response;
import com.togethersports.tosproject.security.jwt.service.RefreshTokenService;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <h1>CustomLogoutHandler</h1>
 * <p>Logout 처리 클래스</p>
 * <p>해당 클래스는 request를 검증하고, DB에 Refresh Token을 삭제하기 위한 클래스다.</p>
 * @author yunghocha
 * @author seunjeon
 */
@Component
public class CustomLogoutHandler implements LogoutHandler {

    @Autowired
    private RefreshTokenService refreshTokenService;


    @SneakyThrows
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String refreshToken = request.getParameter("refresh-token");

        refreshTokenService.removeRefreshTokenByToken(refreshToken);


    }
}
