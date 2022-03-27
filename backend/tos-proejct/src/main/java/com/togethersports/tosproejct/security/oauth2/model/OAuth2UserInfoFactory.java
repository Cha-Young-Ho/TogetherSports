package com.togethersports.tosproejct.security.oauth2.model;

import java.util.Map;

/**
 * <h1>OAuth2UserInfoFactory</h1>
 * <p>사용자가 로그인한 OAuth2 사업자에 맞는 적절한 타입의 OAuth2UserInfo 구현체를 반환하는 클래스</p>
 * <p>{@link #createUserInfo(OAuth2Provider, Map)} 해당 메소드 호출 시 적합한 구현체를 반환한다.</p>
 *
 * @author seunjeon
 * @see KakaoUser
 */
public class OAuth2UserInfoFactory {

    /**
     * 적절한 OAuth2UserInfo 를 생성해서 반환한다.
     * @param provider OAuth2 서비스 정보, registrationId 값으로 추출한 enum
     * @param attributes OAuth2 계정 정보
     * @return OAuth2UserInfo 구현체, provider 에 맞는 구현체가 제공된다.
     */
    public static OAuth2UserInfo createUserInfo(OAuth2Provider provider, Map<String, Object> attributes) {
        OAuth2UserInfo userInfo = null;
        switch (provider) {
            case KAKAO:
                userInfo = new KakaoUser(attributes);
                break;

        }
        return userInfo;
    }
}
