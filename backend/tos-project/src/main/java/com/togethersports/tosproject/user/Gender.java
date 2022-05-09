package com.togethersports.tosproject.user;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * <h1>Gender</h1>
 * <p>
 *     성별을 나타내는 Enum
 * </p>
 *
 * @author seunjeon
 */
public enum Gender {
    @JsonProperty("male")
    MALE,
    @JsonProperty("female")
    FEMALE;
}
