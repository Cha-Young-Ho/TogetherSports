package com.togethersports.tosproejct.common.file.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * <h1>NameGenerator</h1>
 * <p>
 *     각종 이름을 생성하는 클래스
 * </p>
 * <p>
 *     해당 클래스가 생성하는 이름은 특별한 의미를 지니지 않으며 중복되지 않는 이름이다.
 * </p>
 *
 * @author seunjeon
 */
@Component
public class NameGenerator {

    /**
     * 중복되지 않는 랜덤한 이름을 생성한다.
     * @return randomName - 생성된 무작위 이름 (중복될 확률 극히 낮음 0.00000000006% 이하)
     */
    public String generateRandomName() {
        return UUID.randomUUID().toString();
    }
}
