package com.togethersports.tosproejct.security.oauth2.handler;

import com.togethersports.tosproejct.account.User;
import com.togethersports.tosproejct.security.jwt.RefreshTokenService;
import com.togethersports.tosproejct.security.jwt.dto.TokenOfLogin;
import com.togethersports.tosproejct.security.jwt.util.JwtTokenFactory;
import com.togethersports.tosproejct.security.oauth2.CustomOAuth2User;
import com.togethersports.tosproejct.security.util.ClientIpUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2LoginAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenFactory jwtTokenFactory;
    private final RefreshTokenService refreshTokenService;


    @Value("${app.oauth2.authorized-redirect-uri}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // 로그인 된 사용자 계정
        User loggedInUser = oAuth2User.getUser();

        // 추가정보 기입 여부
        boolean first = loggedInUser.isFirst();

        // 로그인 시, 발급되는 엑세스토큰, 리프레시토큰 dto 생성
        TokenOfLogin tokenOfLogin = jwtTokenFactory.createTokens(loggedInUser);

        String clientIp = ClientIpUtils.getClientIP(request);
        String userAgent = request.getHeader("User-Agent");
        // Save Refresh Token Entity To Data Base
        refreshTokenService.saveRefreshToken(loggedInUser,
                tokenOfLogin.getRefreshToken(),
                clientIp,
                userAgent);

        String redirectUri = UriComponentsBuilder
                .fromUriString(redirectUrl)
                .queryParam("access_token", tokenOfLogin.getAccessToken())
                .queryParam("refresh_token", tokenOfLogin.getRefreshToken())
                .queryParam("is_first", first)
                .toUriString();

        response.sendRedirect(redirectUri);
    }




}
