package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public void saveRefreshToken(Account loggedInUser, String refreshToken) {
        refreshTokenRepository.save(RefreshToken.createRefreshToken
                (loggedInUser.getEmail(),
                        loggedInUser.getId(),
                        refreshToken,
                        loggedInUser.getRole()));
    }

    public void renewalRefreshToken(String refreshToken){

    }
}
