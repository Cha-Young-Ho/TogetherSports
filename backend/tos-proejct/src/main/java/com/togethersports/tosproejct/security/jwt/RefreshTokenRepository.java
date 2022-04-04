package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findByRefreshToken(String refreshToken);
    boolean existsByClientIpAndUserAgentAndProvider(String clientIp, String userAgent, String provider);
    void deleteByClientIpAndUserAgentAndProvider(String clientIp, String userAgent, String provider);
    void deleteByRefreshToken(String refreshToken);
}
