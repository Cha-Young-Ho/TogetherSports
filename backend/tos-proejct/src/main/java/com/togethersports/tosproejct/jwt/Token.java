package com.togethersports.tosproejct.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Token {

    private String accessToken;
    private String refreshToken;
    private String key;

}
