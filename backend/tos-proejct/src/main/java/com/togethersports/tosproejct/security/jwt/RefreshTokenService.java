package com.togethersports.tosproejct.security.jwt;

import com.togethersports.tosproejct.account.Account;
import com.togethersports.tosproejct.security.jwt.token.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public void saveRefreshToken(Account loggedInUser, String refreshToken) {

        refreshTokenRepository.save(createRefreshToken(loggedInUser, refreshToken));
    }

    public void renewalRefreshToken(RefreshToken refreshToken){

        refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken createRefreshToken(Account loggedInUser, String refreshToken){

        return RefreshToken.createRefreshToken
                (loggedInUser.getEmail(),
                        loggedInUser.getId(),
                        refreshToken,
                        loggedInUser.getRole());
    }

    public RefreshToken getRefreshToken(String refreshToken){
        return refreshTokenRepository.findByRefreshToken(refreshToken);
    }

    public void removeRefreshToken(Long id){
        refreshTokenRepository.deleteById(id);
    }
}
