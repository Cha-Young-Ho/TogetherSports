package com.togethersports.tosproject.security.oauth2.service;

import com.togethersports.tosproject.security.oauth2.CustomOAuth2User;
import com.togethersports.tosproject.security.oauth2.model.OAuth2Provider;
import com.togethersports.tosproject.security.oauth2.model.OAuth2UserInfo;
import com.togethersports.tosproject.security.oauth2.model.OAuth2UserInfoFactory;
import com.togethersports.tosproject.user.User;
import com.togethersports.tosproject.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Map;
import java.util.Optional;

/**
 * <h1>CustomOAuth2UserService</h1>
 * <p>
 * {@link org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationProvider} 가 사용할 OAuth2User 반환 클래스
 * </p>
 * <p>
 * {@link DefaultOAuth2UserService} 를 사용해 사용자 계정 정보를 일단 처리하고 부수적인 작업을 수행한다.
 * </p>
 *
 * @author seunjeon, chayoungho
 * @see org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationProvider
 * @see DefaultOAuth2UserService
 */
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    // Spring Security OAuth2 에서 기본으로 제공하는 OAuth2UserService 를 사용하기 위함
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth2 서비스 제공자 구분
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Provider provider = OAuth2Provider.valueOf(registrationId.toUpperCase(Locale.ROOT));

        // OAuth2 계정 정보 가져오기
        OAuth2User oauth2User = delegate.loadUser(userRequest);
        Map<String, Object> attributes = oauth2User.getAttributes();
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.createUserInfo(provider, attributes);

        Optional<User> byEmailAndProvider = userRepository.findByEmailAndProvider(userInfo.getEmail(), userInfo.getOAuth2Provider());

        boolean first; // 최초 로그인 여부
        User user;
        if (byEmailAndProvider.isEmpty()) {
            // 신규 회원인 경우
            user = User.createUser(userInfo.getOAuth2Id(), userInfo.getEmail(), userInfo.getOAuth2Provider());
            userRepository.save(user);
            first = true;
        } else {
            // 기존 회원인 경우
            user = byEmailAndProvider.get();
            first = false;
        }
        return new CustomOAuth2User(userInfo, user, first);
    }
}
