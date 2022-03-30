package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// fixme Repository 메소드 2개 생성
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByRefreshToken(String refreshToken);
    boolean existsByClientIpAndUserAgentAndProvider(String clientIp, String userAgent, String provider);
    void deleteByClientIpAndUserAgentAndProvider(String clientIp, String userAgent, String provider);
}
