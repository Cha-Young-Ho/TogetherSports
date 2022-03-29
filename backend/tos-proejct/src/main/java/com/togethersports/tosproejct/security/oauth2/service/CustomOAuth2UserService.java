package com.togethersports.tosproejct.security.oauth2.service;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.account.AccountRepository;
import com.togethersports.tosproejct.security.oauth2.CustomOAuth2User;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2UserInfo;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2UserInfoFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    // Spring Security OAuth2 에서 기본으로 제공하는 OAuth2UserService 를 사용하기 위함
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();

    private final AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // OAuth2 서비스 제공자 구분
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Provider provider = OAuth2Provider.valueOf(registrationId.toUpperCase(Locale.ROOT));

        // OAuth2 계정 정보 가져오기
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.createUserInfo(provider, attributes);

        Optional<Account> findAccount = accountRepository.findByEmailAndProvider(userInfo.getEmail(), userInfo.getOAuth2Provider());

        if (findAccount.isEmpty()) {
            // 신규 회원일 경우
            Account newAccount = Account.
                    createAccount(userInfo.getOAuth2Id(),
                            userInfo.getEmail(),
                            userInfo.getNickname(),
                            userInfo.getOAuth2Provider());
            accountRepository.save(newAccount);
            Account account = newAccount;
            return new CustomOAuth2User(userInfo, account);
        }

            return new CustomOAuth2User(userInfo, findAccount.get());
    }
}
