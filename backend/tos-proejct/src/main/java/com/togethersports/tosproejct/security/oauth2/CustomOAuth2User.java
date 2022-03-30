package com.togethersports.tosproejct.security.oauth2;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2UserInfo;
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

    private Account account;

    /**
     * OAuth2 사용자 정보, 사용자 계정 기반으로 CustomOAuth2User 객체를 생성할때 사용하는 생성자
     * @param oAuth2UserInfo OAuth2 사용자 정보 객체
     * @param account OAuth2 계정 정보를 기반으로 생성/조회한 사용자 계정 엔티티
     */
    public CustomOAuth2User(OAuth2UserInfo oAuth2UserInfo, Account account) {
        super(List.of(new SimpleGrantedAuthority(account.getRole().name())), oAuth2UserInfo.getAttributes(), account.getProvider().getAttributeKey());
        this.account = account;
    }
}
