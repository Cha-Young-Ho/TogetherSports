package com.togethersports.tosproject.security.oauth2.model;

/**
 * <h1>OAuth2Provider</h1>
 * <p>OAuth2 서비스 제공자 enum</p>
 * <ul>
 *     <li>
 *         <b>kakao</b>
 *         <p>카카오 로그인 사용 시</p>
 *     </li>
 *     <li>
 *         <b>naver</b>
 *         <p>네이버 로그인 사용 시</p>
 *     </li>
 *     <li>
 *         <b>google</b>
 *         <p>구글 로그인 사용 시</p>
 *     </li>
 * </ul>
 * <p>providerName : OAuth2 인증 요청시 URL 로 들어오는 OAuth2 서비스 제공자명</p>
 * <p>attributeKey : OAuth2 인증 후 계정 정보를 가져올 때 사용하는 키 값</p>
 * @author seunjeon
 */
public enum OAuth2Provider {
    KAKAO("kakao", "id"),
    NAVER("naver", "response"),
    GOOGLE("google", "sub");

    private String providerName;
    private String attributeKey;

    OAuth2Provider(String providerName, String attributeKey) {
        this.providerName = providerName;
        this.attributeKey = attributeKey;
    }

    public String getProviderName() {
        return this.providerName;
    }

    public String getAttributeKey() {
        return this.attributeKey;
    }
}
