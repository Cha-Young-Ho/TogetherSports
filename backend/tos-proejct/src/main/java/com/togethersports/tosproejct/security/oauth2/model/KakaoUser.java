package com.togethersports.tosproejct.security.oauth2.model;

import java.util.Map;

/**
 * <h1>KakaoUser</h1>
 * <p>카카오 로그인 사용자의 계정 정보 클래스</p>
 *
 * @see com.togethersports.tosproejct.security.oauth2.model.OAuth2UserInfo
 * @author seunjeon
 */
public class KakaoUser extends OAuth2UserInfo{

    // 카카오 계정 정보
    private Map<String, Object> kakaoAccountAttributes;

    // 카카오 프로필 정보
    private Map<String, Object> kakaoProfileAttributes;

    public KakaoUser(Map<String, Object> attributes) {
        super(attributes);
        kakaoAccountAttributes = (Map<String, Object>) attributes.get("kakao_account");
        kakaoProfileAttributes = (Map<String, Object>) kakaoAccountAttributes.get("profile");
    }

    @Override
    public Long getOAuth2Id() {
        return (Long) kakaoAccountAttributes.get("id");
    }

    @Override
    public String getEmail() {
        return (String) kakaoAccountAttributes.get("email");
    }

    @Override
    public String getNickname() {
        return (String) kakaoProfileAttributes.get("nickname");
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return OAuth2Provider.KAKAO;
    }
}
