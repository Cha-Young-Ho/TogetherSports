package com.togethersports.tosproject.security.jwt.model;

import com.togethersports.tosproject.user.User;
import lombok.*;

import javax.persistence.*;

/**
 * <h1>RefreshToken</h1>
 * <p>
 *     JWT 리프레쉬 토큰 엔티티 <br>
 *     로그인 이후 액세스 토큰 갱신을 위해 DB 에 저장되는 리프레쉬 토큰 엔티티
 * </p>
 * @author younghocha
 * @author seunjeon
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "REFRESH_TOKEN")
@Entity
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REFRESH_TOKEN_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "REFRESH_TOKEN_VALUE")
    private String token;

    @Column(name = "CLIENT_IP")
    private String clientIp;

    @Column(name = "USER_AGENT")
    private String userAgent;

    public static RefreshToken createRefreshToken(User user, String token, String clientIp, String userAgent) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.user = user;
        refreshToken.token = token;
        refreshToken.clientIp = clientIp;
        refreshToken.userAgent = userAgent;
        return refreshToken;
    }

    /**
     * 리프레쉬 토큰의 토큰 값을 변경한다.
     * @param token 변경할 토큰 값
     */
    public void changeToken(String token) {
        this.token = token;
    }
}
