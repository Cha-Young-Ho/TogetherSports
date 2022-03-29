package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
}
