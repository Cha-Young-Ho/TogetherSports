package com.togethersports.tosproejct.jwt;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
   Optional<RefreshToken> findByRefreshToken(String refreshToken);
   boolean existsByKeyEmailAndUserAgent(String userEmail, String userAgent);
   void deleteByKeyEmailAndUserAgent(String userEmail, String userAgent);
}
