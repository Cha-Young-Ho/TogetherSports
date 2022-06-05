package com.togethersports.tosproject.security.oauth2.handler;

import com.togethersports.tosproject.security.jwt.JwtProperties;
import com.togethersports.tosproject.security.jwt.service.RefreshTokenService;
import com.togethersports.tosproject.security.jwt.service.JwtService;
import com.togethersports.tosproject.security.oauth2.CustomOAuth2User;
import com.togethersports.tosproject.security.util.ClientIpUtils;
import com.togethersports.tosproject.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.acls.domain.BasePermission;
import org.springframework.security.acls.domain.ObjectIdentityImpl;
import org.springframework.security.acls.domain.PrincipalSid;
import org.springframework.security.acls.jdbc.JdbcMutableAclService;
import org.springframework.security.acls.model.MutableAcl;
import org.springframework.security.acls.model.ObjectIdentity;
import org.springframework.security.acls.model.Sid;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;


/**
 * <h1>OAuth2LoginAuthenticationSuccessHandler</h1>
 * <p>
 * OAuth2 인증 성공 이후 처리를 담당하는 클래스
 * </p>
 * <p>
 * 인증 성공 이후 사용자 계정이 신규 계정인 경우 ACL 권한 정보를 생성한다.
 * </p>
 *
 * @author seunjeon
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2LoginAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService<User> jwtService;
    private final JwtProperties jwtProperties;
    private final RefreshTokenService refreshTokenService;
    private final JdbcMutableAclService aclService;

    @Value("${app.oauth2.authorized-redirect-uri}")
    private String redirectUrl;

    @Transactional // acl 생성을 위한 트랜잭션 처리
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // 사용자 계정 ACL 적용을 위해 시큐리티 컨텍스트에 인증 객체 세팅 (추가적인 인증이나 권한 관리용으로는 사용되지 않음)
        SecurityContextHolder.getContext().setAuthentication(authentication);

        CustomOAuth2User oauth2User = (CustomOAuth2User) authentication.getPrincipal();
        // 로그인 된 사용자 계정
        User loggedInUser = oauth2User.getUser();

        // 추가정보 기입 여부
        boolean firstUser = oauth2User.isFirst();

        // 신규 계정인 경우
        if (firstUser) {
            // 사용자 계정 ACL 권한 정보 생성
            createUserAcl(loggedInUser);
        }

        // 액세스 토큰 생성 - 만료기간은 분 단위로 설정
        String accessToken = jwtService.createToken(jwtProperties.getAccessTokenSigningKey(),
                jwtProperties.getAccessTokenExpirationTime(),
                ChronoUnit.MINUTES,
                createUserPayload(loggedInUser)
        );

        // 리프레쉬 토큰 생성 - 만료기간은 일 단위로 설정
        String refreshToken = jwtService.createToken(jwtProperties.getRefreshTokenSigningKey(),
                jwtProperties.getRefreshTokenExpirationTime(),
                ChronoUnit.DAYS,
                null
        );
        // 리프레쉬 토큰 DB 저장 (저장시 사용자의 접속 기기 정보를 고려함)
        String clientIp = ClientIpUtils.getClientIP(request);
        String userAgent = request.getHeader("User-Agent");
        refreshTokenService.saveRefreshToken(loggedInUser, refreshToken, clientIp, userAgent);

        String redirectUri = UriComponentsBuilder
                .fromUriString(redirectUrl)
                .queryParam("access_token", accessToken)
                .queryParam("refresh_token", refreshToken)
                .queryParam("is_first", firstUser)
                .toUriString();


        response.sendRedirect(redirectUri);
    }

    /**
     * JWT 토큰에 들어갈 페이로드 정보를 반환한다.
     *
     * @param user 페이로드에 들어갈 사용자 정보가 있는 도메인 객체
     * @return payload
     */
    public Map<String, Object> createUserPayload(User user) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("sub", user.getId());
        payload.put("email", user.getEmail());
        payload.put("role", user.getRole());
        return payload;
    }

    /**
     * 사용자 계정에 대한 acl 정보를 생성한다.<br>
     * <pre>@AclCreate를 사용하지 않고 메소드를 이용하는 것은 spring security context 가 세팅되는 시간적 차이 때문이다.</pre>
     *
     * @param user acl 정보 생성 대상 사용자 도메인 객체 인스턴스
     */
    public void createUserAcl(User user) {
        // acl object identity 생성 (도메인 객체 인스턴스 식별)
        ObjectIdentity oi = new ObjectIdentityImpl(user);
        MutableAcl acl = aclService.createAcl(oi);

        // acl entry 생성 (권한 정보)
        Sid sid = new PrincipalSid(String.valueOf(user.getId()));

        // 자기 자신의 계정에 대한 모든 권한 부여
        acl.insertAce(0, BasePermission.ADMINISTRATION, sid, true);
        acl.insertAce(0, BasePermission.READ, sid, true);
        acl.insertAce(0, BasePermission.CREATE, sid, true);
        acl.insertAce(0, BasePermission.WRITE, sid, true);
        acl.insertAce(0, BasePermission.DELETE, sid, true);

        aclService.updateAcl(acl);
    }
}
