package com.togethersports.tosproejct.security.oauth2.handler;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.jwt.util.JwtTokenFactory;
import com.togethersports.tosproejct.security.oauth2.CustomOAuth2User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class OAuth2LoginAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenFactory jwtTokenFactory;

    @Value("${app.oauth2.authorized-redirect-uri}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        // 로그인 된 사용자 계정
        Account loggedInUser = oAuth2User.getAccount();

        // 추가정보 기입 여부
        boolean first = loggedInUser.isFirst();

        // 액세스 토큰
        String accessToken = jwtTokenFactory.createAccessToken(loggedInUser);

        String uri = UriComponentsBuilder
                .fromUriString(redirectUrl)
                .queryParam("access-token", accessToken)
                .queryParam("is-first", first)
                .toUriString();

        response.sendRedirect(uri);
    }
}
