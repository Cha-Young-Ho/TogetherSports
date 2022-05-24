package com.togethersports.tosproject.common.file.service;

import com.togethersports.tosproject.common.file.exception.FileUploadException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;

/**
 * <h1>FileStorageService</h1>
 * <p>현재 애플리케이션이 실행중인 로컬 환경을 저장소로 파일을 저장하는 {@link StorageService} 구현체</p>
 *
 * @author seunjeon
 */
@Service
public class FileStorageService implements StorageService{

    @Value("${app.storage.root}")
    private String storageRoot;

    @Value("${app.storage.location}")
    private String location;

    /**
     * 현재 로컬 환경의 파일 시스템에 파일을 저장한다. 저장경로는 {@link #storageRoot} 이다.
     * @param data 저장 대상 파일
     * @param name 저장할 파일명, 중복이 없어야 함
     * @throws FileUploadException 파일 저장 중 문제발생 시
     * @return path e.g /images/sample.png 이미지에 접근 가능한 경로를 반환한다.
     */
    @Override
    public String store(byte[] data, String name) {
        String path = storageRoot + "/" + name;
        try (FileOutputStream fos = new FileOutputStream(path)) {
            fos.write(data);
        } catch (IOException e) {
            throw new FileUploadException("파일 저장중 문제가 발생했습니다.");
        }
        return location + "/" + name;
    }
}
