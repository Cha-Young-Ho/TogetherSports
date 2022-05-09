package com.togethersports.tosproject.common.file.service;

/**
 * <h1>StorageService</h1>
 * <p>
 *     각종 파일을 특정 저장소에 업로드에 하는 기능에 대한 인터페이스
 * </p>
 * @author seunjeon
 */
public interface StorageService {

    /**
     * 파일을 저장소에 저장하고 접근할 수 있는 경로정보를 반환한다.
     * @param data 저장 대상 파일
     * @param name 저장할 파일명
     * @return path 접근 경로 문자열
     */
    String store(byte[] data, String name);
}
