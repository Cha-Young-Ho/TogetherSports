package com.togethersports.tosproject.common.file.exception;

/**
 * <h1>ResourceFileNotFoundException</h1>
 * <p>
 * 리소스 경로의 파일을 찾지 못하는 경우 발생하는 예외
 * </p>
 *
 * @author seunjeon
 */
public class ResourceFileNotFoundException extends RuntimeException {

    private static final String DEFAULT_MESSAGE = "리소스 경로의 파일을 찾을 수 없습니다.";

    public ResourceFileNotFoundException() {
        super(DEFAULT_MESSAGE);
    }
}
