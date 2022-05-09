package com.togethersports.tosproject.security.oauth2;

import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.security.oauth2.model.OAuth2UserInfo;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.List;

/**
 * <h1>CustomOAuth2User</h1>
 * <p>
 *     OAuth2 로그인 직후 SecurityContext 의 Authentication Token 내에 저장될 객체<br>
 *     로그인 이외의 요청시에는 사용되지 않으나 로그인 후 JWT 발행 등에 사용된다.
 * </p>
 *
 * @author seunjeon
 */
@Getter
public class CustomOAuth2User extends DefaultOAuth2User {

    private User user;
    private boolean first; // 최초 로그인 여부

    /**
     * OAuth2 사용자 정보, 사용자 계정 기반으로 CustomOAuth2User 객체를 생성할때 사용하는 생성자
     * @param oAuth2UserInfo OAuth2 사용자 정보 객체
     * @param user OAuth2 계정 정보를 기반으로 생성/조회한 사용자 계정 엔티티
     */
    public CustomOAuth2User(OAuth2UserInfo oAuth2UserInfo, User user, boolean first) {
        super(List.of(new SimpleGrantedAuthority(user.getRole().name())), oAuth2UserInfo.getAttributes(), user.getProvider().getAttributeKey());
        this.user = user;
        this.first = first;
    }

    // 시큐리티 컨텍스트 내의 인증 정보를 가져와 하는 작업을 수행할 경우 계정 식별자가 사용되도록 조치
    @Override
    public String getName() {
        return String.valueOf(user.getId());
    }
}
