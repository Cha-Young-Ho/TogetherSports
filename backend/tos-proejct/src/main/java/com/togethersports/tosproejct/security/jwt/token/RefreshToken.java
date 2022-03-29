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

    public RefreshToken() {
    }

    @Builder(access = AccessLevel.PRIVATE)
    private RefreshToken(String accountEmail, Long accountId, String refreshToken, Role role){

        this.accountEmail = accountEmail;
        this.accountId = accountId;
        this.refreshToken = refreshToken;
        this.role = role;
    }

    public static RefreshToken createRefreshToken(String accountEmail, Long accountId, String refreshToken, Role role){

        return RefreshToken.builder()
                .accountEmail(accountEmail)
                .accountId(accountId)
                .refreshToken(refreshToken)
                .role(role)
                .build();
    }
}
