package com.togethersports.tosproject.security.oauth2.model;

import java.util.Map;

/**
 * <h1>OAuth2UserInfo</h1>
 * <p>
 *     여러 OAuth2 사업자가 제공하는 계정 정보를 같은 방식으로 처리하기 위한 추상 클래스
 * </p>
 * <p>구현체는 다음 정보들을 가지고 올 수 있도록 각각의 메소드를 정의해야 한다.</p>
 * <ul>
 *     <li>{@link #getOAuth2Id()} OAuth2 계정 식별자 반환</li>
 *     <li>{@link #getEmail()} ()} OAuth2 로그인 후 가져온 계정 이메일</li>
 *     <li>{@link #getOAuth2Provider()} OAuth2 서비스 제공자</li>
 * </ul>
 * <p>
 *     OAuth2 인증 이후 가져온 계정 정보는 {@link #attributes} 필드에서 {@code Map<String, Object>} 형태로 저장한다.<br>
 *     이 값은 객체 생성 시 반드시 주입 되어야 한다.
 * </p>
 *
 * @author seunjeon
 */
public abstract class OAuth2UserInfo {

    protected Map<String, Object> attributes;

    protected OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    /**
     * 해당 SNS 계정 고유식별자
     * @return id
     */
    public abstract Long getOAuth2Id();

    /**
     * 해당 SNS 계정 이메일 주소
     * @return email
     */
    public abstract String getEmail();

    /**
     * 해당 SNS 사업자 명
     * @return provider
     */
    public abstract OAuth2Provider getOAuth2Provider();

    public Map<String, Object> getAttributes() {
        return this.attributes;
    }
}
