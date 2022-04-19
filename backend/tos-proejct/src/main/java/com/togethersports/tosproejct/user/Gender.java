package com.togethersports.tosproejct.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.swing.*;

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
