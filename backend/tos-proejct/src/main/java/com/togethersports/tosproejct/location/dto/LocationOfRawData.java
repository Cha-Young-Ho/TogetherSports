package com.togethersports.tosproejct.location.dto;

import com.togethersports.tosproejct.location.Location;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

/**
 * <h1>LocationOfRawData</h1>
 * <p>
 * 엑셀에서 읽어온 행정구역 정보를 나타내는 DTO 클래스
 * </p>
 *
 * @author seunjeon
 */
@Getter
@EqualsAndHashCode
public class LocationOfRawData {

    private String name;
    private String parentName;
    private int level;

    /**
     * 엑셀 파일에서 제공하는 정보를 바탕으로 행정구역 DTO 를 생성한다.
     * @param name 행정구역 명
     * @param parentName 상위 행정구역 명 (없는 경우 null, e.g. 서울은 상위 행정구역이 없음)
     * @param level 1: 상위 행정구역이 없음, 2: 상위 행정 구역 1개 ... N: 상위 행정 구역 N-1개
     */
    public LocationOfRawData(@NonNull String name, @Nullable String parentName, int level) {
        this.name = name;
        this.parentName = parentName;
        this.level = level;
    }

    /**
     * 엑셀 파일에서 읽어온 행정구역 데이터를 JPA 엔티티 타입으로 변환후 반환한다.<br>
     * 상위 행정구역에 대한 연관관계는 고려하지 않기 때문에 필요한 경우 {@link Location} 의 메소드를 사용하라.
     * @return location
     */
    public Location toEntity() {
        return new Location(name, null, level);
    }
}
