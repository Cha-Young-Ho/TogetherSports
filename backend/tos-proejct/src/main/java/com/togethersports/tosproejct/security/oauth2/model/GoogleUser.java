package com.togethersports.tosproejct.security.oauth2.model;

import java.util.Map;
/**
 * <h1>GoogleUser</h1>
 * <p>구글 로그인 사용자의 계정 정보 클래스</p>
 *
 * @see com.togethersports.tosproejct.security.oauth2.model.OAuth2UserInfo
 * @author younghocha
 */
public class GoogleUser extends OAuth2UserInfo{

    // 구글 이메일 정보
    private String googleEmail;

    // 구글 프로필 정보
    private String googleName;

    protected GoogleUser(Map<String, Object> attributes) {
        super(attributes);
        this.googleEmail = attributes.get("email").toString();
        this.googleName = attributes.get("name").toString();
    }
    @Override
    public Long getOAuth2Id() {
        return null;
    }

    @Override
    public String getEmail() {
        return this.googleEmail;
    }

    @Override
    public String getNickname() {
        return this.googleName;
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return OAuth2Provider.GOOGLE;
    }
}
