package com.togethersports.tosproject.security.oauth2.model;

import java.util.Map;
/**
 * <h1>GoogleUser</h1>
 * <p>구글 로그인 사용자의 계정 정보 클래스</p>
 *
 * @see com.togethersports.tosproject.security.oauth2.model.OAuth2UserInfo
 * @author younghocha
 * @author seunjeon
 */
public class GoogleUser extends OAuth2UserInfo{

    protected GoogleUser(Map<String, Object> attributes) {
        super(attributes);
    }
    @Override
    public Long getOAuth2Id() {
        return (Long) super.attributes.get("id");
    }

    @Override
    public String getEmail() {
        return (String) super.attributes.get("name");
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return OAuth2Provider.GOOGLE;
    }
}
