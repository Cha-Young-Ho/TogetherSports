package com.togethersports.tosproejct.security.jwt.token;

import com.togethersports.tosproejct.account.User;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

/**
 * <h1>JwtPostAuthenticationToken</h1>
 * <p>
 *     JWT 인증 후 객체
 * </p>
 * <p>
 *     인증 후 객체는 {@link User} 객체를 가지고 있다. <br>
 *     주의! 단 영속성 컨텍스트에 저장되어 영속상태가 된 것은 아니다.
 * </p>
 * @author seunjeon
 */
public class JwtPostAuthenticationToken extends AbstractAuthenticationToken {

    private User user;

    /**
     * 인증 시도 사용자의 계정 정보를 바탕으로 인증 후 객체를 생성한다.
     * @param user jwt token 의 값을 기반으로 하는 계정 엔티티
     */
    public JwtPostAuthenticationToken(User user) {
        super(List.of(new SimpleGrantedAuthority(user.getRole().name())));
        this.user = user;
        this.setAuthenticated(true);
    }

    // OAuth2 인증 이므로 별도의 패스워드 없음 사용X
    @Override
    public Object getCredentials() {
        return "";
    }

    // 로그인 된 사용자 계정 정보 반환
    @Override
    public Object getPrincipal() {
        return user;
    }
}
