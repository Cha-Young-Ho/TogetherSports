package com.togethersports.tosproejct.enums;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Provider {
    //구글, 카카오, 네이버, 페이스북

    @JsonProperty("google")
    GOOGLE,
    @JsonProperty("kakao")
    KAKAO,
    @JsonProperty("naver")
    NAVER,
    @JsonProperty("facebook")
    FACEBOOK
}
