package com.togethersports.tosproejct.common.file.util;

import org.springframework.stereotype.Component;

import java.util.Base64;

/**
 * <h1>Base64Decoder</h1>
 * <p>
 *     Base64 디코더 클래스
 * </p>
 *
 * <p>
 *     Base64 로 인코딩된 데이터에 대해 디코딩해서 원본 상태로 변환하는 역할을 수행한다.
 * </p>
 * <u>jjwt 라이브러리 내에 Base64 디코더가 로직이 비슷하나. 용도 및 패키지 명으로 인한 혼동을 고려하여 해당 클래스 정의하였음</u>
 * @author seunjeon
 */
@Component
public class Base64Decoder {

    /**
     * base64 로 인코딩된 문자열을 디코딩 하여 바이트 배열을 반환한다.
     * @param encoded base64 로 인코딩된 문자열
     * @return decoded - byte[] 디코딩된 바이트 배열
     */
    public byte[] decode(String encoded) {
        return Base64.getDecoder().decode(encoded);
    }

}
