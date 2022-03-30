package com.togethersports.tosproejct.security.jwt.token;

import com.togethersports.tosproejct.security.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RefreshToken {
    @Id
    @GeneratedValue
    @Column(name = "REFRESH_TOKEN_ID")
    private Long id;

    @Column(name = "ACCOUNT_EMAIL")
    private String accountEmail;

    @Column(name = "ACCOUNT_ID")
    private Long accountId;

    @Column(name = "REFRESH_TOKEN")
    private String refreshToken;

    @Column(name = "ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "CLIENT_IP")
    private String clientIp;

    @Column(name = "USER_AGENT")
    private String userAgent;

    @Column(name = "PROVIDER")
    private String provider;

    public RefreshToken() {
    }

    @Builder(access = AccessLevel.PRIVATE)
    private RefreshToken(String accountEmail,
                         Long accountId,
                         String refreshToken,
                         Role role,
                         String clientIp,
                         String userAgent,
                         String provider){

        this.accountEmail = accountEmail;
        this.accountId = accountId;
        this.refreshToken = refreshToken;
        this.role = role;
        this.clientIp = clientIp;
        this.userAgent = userAgent;
        this.provider = provider;
    }

    public static RefreshToken createRefreshToken(String accountEmail,
                                                  Long accountId,
                                                  String refreshToken,
                                                  Role role,
                                                  String clientIp,
                                                  String userAgent,
                                                  String provider){

        return RefreshToken.builder()
                .accountEmail(accountEmail)
                .accountId(accountId)
                .refreshToken(refreshToken)
                .role(role)
                .clientIp(clientIp)
                .userAgent(userAgent)
                .provider(provider)
                .build();
    }
}
