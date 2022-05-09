package com.togethersports.tosproject.security.oauth2.model;

import java.util.Map;

/**
 * <h1>NaverUser</h1>
 * <p>네이버 로그인 사용자의 계정 정보 클래스</p>
 *
 * @see com.togethersports.tosproject.security.oauth2.model.OAuth2UserInfo
 * @author younghocha
 */
public class NaverUser extends OAuth2UserInfo{
    // 카카오 계정 정보
    private Map<String, Object> naverAccountAttributes;

    // 네이버 이메일
    private String naverEmail;

    // 네이버 이름
    private String naverName;
    protected NaverUser(Map<String, Object> attributes) {
        super(attributes);
        naverAccountAttributes = (Map<String, Object>) attributes.get("response");
        naverEmail = naverAccountAttributes.get("email").toString();
        //fixme name -> nickname으로 수정해야함
        naverName = naverAccountAttributes.get("name").toString();
    }

    @Override
    public Long getOAuth2Id() {
        return null;
    }

    @Override
    public String getEmail() {
        return naverEmail = naverAccountAttributes.get("email").toString();
    }

    @Override
    public String getNickname() {
        return naverEmail = naverAccountAttributes.get("name").toString();
    }

    @Override
    public OAuth2Provider getOAuth2Provider() {
        return OAuth2Provider.NAVER;
    }
}
