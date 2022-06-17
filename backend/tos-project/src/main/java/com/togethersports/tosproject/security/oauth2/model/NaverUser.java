package com.togethersports.tosproject.security.oauth2.model;

import java.util.Map;

/**
 * <h1>NaverUser</h1>
 * <p>네이버 로그인 사용자의 계정 정보 클래스</p>
 *
 * @see com.togethersports.tosproject.security.oauth2.model.OAuth2UserInfo
 * @author younghocha
 * @author seunjeon
 */
public class NaverUser extends OAuth2UserInfo{

    private Map<String, Object> naverAccountAttributes;

    protected NaverUser(Map<String, Object> attributes) {
        super(attributes);
        naverAccountAttributes = (Map<String, Object>) attributes.get(OAuth2Provider.NAVER.getAttributeKey());
    }

    @Override
    public String getOAuth2Id() {
        return (String) naverAccountAttributes.get("id");
    }

    @Override
    public String getEmail() {
        return (String) naverAccountAttributes.get("email");
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return OAuth2Provider.NAVER;
    }
}
