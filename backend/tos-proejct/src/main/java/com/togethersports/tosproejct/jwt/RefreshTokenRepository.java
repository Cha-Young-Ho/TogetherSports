package com.togethersports.tosproejct.jwt;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
   Optional<RefreshToken> findByRefreshToken(String refreshToken);
   boolean existsByKeyEmail(String userEmail);
   void deleteByKeyEmail(String userEmail);
}
