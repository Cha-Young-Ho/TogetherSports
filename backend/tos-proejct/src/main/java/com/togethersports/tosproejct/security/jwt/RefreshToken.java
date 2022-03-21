package com.togethersports.tosproejct.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;
@Builder
@Entity
@Getter
@Table(name = "T_REFRESH_TOKEN")
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "REFRESH_TOKEN_ID", nullable = false)
    private Long refreshTokenId;

    @Column(name = "REFRESH_TOKEN", nullable = false)
    private String refreshToken;

    @Column(name = "KEY_EMAIL", nullable = false)
    private String keyEmail;

    @Column(name ="USER_AGENT", nullable = false)
    private String userAgent;

}