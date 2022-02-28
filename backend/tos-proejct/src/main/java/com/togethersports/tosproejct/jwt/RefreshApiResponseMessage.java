package com.togethersports.tosproejct.jwt;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Setter
@Getter
@ToString
public class RefreshApiResponseMessage {

        // HttpStatus
        private String status;
        // Http Default Message
        private String message;
        // Error Message to USER
        private String errorMessage;
        // Error Code
        private String errorCode;

        public RefreshApiResponseMessage() {}

        public RefreshApiResponseMessage(Map<String, String> source) {
            this.status = status;
            this.message = message;
            this.errorCode = errorCode;
            this.errorMessage = errorMessage;
        }

}
