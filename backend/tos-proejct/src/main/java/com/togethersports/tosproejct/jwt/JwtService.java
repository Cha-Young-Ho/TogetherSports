package com.togethersports.tosproejct.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class JwtService {


    private final RefreshTokenRepository refreshTokenRepository;
    public void login(RefreshToken refreshToken){


        refreshTokenRepository.save(refreshToken);

    }

    public Optional<RefreshToken> getRefreshToken(String userEmail){

        return refreshTokenRepository.findByKeyEmail(userEmail);
    }
}
