package com.togethersports.tosproject.location;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <h1>LocationService</h1>
 * <p>
 * 행정구역 관련 조회 기능을 제공한다.<br>
 * (행정구역 데이터 특성상 사용자의 요청에 의해 변경되지 않으므로 생성, 삭제, 수정의 기능은 담당하지 않는다.)
 * </p>
 *
 * @author seunjeon
 */
@RequiredArgsConstructor
@Service
public class LocationService {

    private final LocationRepository locationRepository;

    /**
     * 특정 행정구역의 하위 행정구역 목록을 제공한다.
     *
     * @param parentName 상위 행정구역 명
     * @return locationNames 하위 행정구역 명 리스트
     */
    public List<String> getChildLocation(String parentName) {
        return locationRepository.findChildLocations(parentName)
                .stream()
                .map(Location::getName)
                .collect(Collectors.toList());
    }

    /**
     * 최상위 행정구역 목록을 제공한다.
     * @return locationNames 최상위 행정구역 명 리스트
     */
    public List<String> getPrimaryLocation() {
        return locationRepository.findPrimaryLocations()
                .stream()
                .map(Location::getName)
                .collect(Collectors.toList());
    }

}
