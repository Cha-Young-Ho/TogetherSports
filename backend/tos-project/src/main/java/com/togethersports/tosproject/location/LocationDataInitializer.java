package com.togethersports.tosproject.location;

import com.togethersports.tosproject.location.dto.LocationOfRawData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

/**
 * <h1>LocationDataInitializer</h1>
 * <p>
 *
 * </p>
 *
 * @author seunjeon
 */
@Component
public class LocationDataInitializer implements ApplicationRunner {

    @Autowired
    private LocationRawDataLoader dataLoader;

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (locationRepository.existsByName("서울")) {
            return;
        }

        Set<LocationOfRawData> rawData = dataLoader.retrieveLocationDataFromExcel();

        Map<String, Location> locationIdentifier = new HashMap<>();
        Map<String, String> locationAbbreviation = new HashMap<>();
        locationAbbreviation.put("서울특별시", "서울");
        locationAbbreviation.put("부산광역시", "부산");
        locationAbbreviation.put("울산광역시", "울산");
        locationAbbreviation.put("인천광역시", "인천");
        locationAbbreviation.put("대전광역시", "대전");
        locationAbbreviation.put("대구광역시", "대구");
        locationAbbreviation.put("광주광역시", "광주");
        locationAbbreviation.put("강원도", "강원");
        locationAbbreviation.put("경기도", "경기");
        locationAbbreviation.put("충청북도", "충북");
        locationAbbreviation.put("충청남도", "충남");
        locationAbbreviation.put("전라남도", "전남");
        locationAbbreviation.put("전라북도", "전북");
        locationAbbreviation.put("경상남도", "경남");
        locationAbbreviation.put("경상북도", "경북");
        locationAbbreviation.put("세종특별자치시", "세종특별자치시");
        locationAbbreviation.put("제주특별자치도", "제주특별자치도");

        // 상위 행정구역이 없는 행정구역의 경우 별도의 연관관계 처리 없이 엔티티 설정
        List<Location> locationLevel1 = rawData.stream()
                .filter(raw -> raw.getLevel() == 1)
                .map(LocationOfRawData::toEntity)
                .collect(Collectors.toList());

        List<Location> abbreviatedLocationLevel1 = locationLevel1.stream()
                .map(location -> new Location(locationAbbreviation.get(location.getName()), null, 1))
                .collect(Collectors.toList());

        abbreviatedLocationLevel1.forEach(location -> locationIdentifier.put(location.getName(), location));
        
        List<Location> initialLocationData = new ArrayList<>(abbreviatedLocationLevel1);

        // 상위 행정구역을 가지는 경우 레벨 2, 3, 4 순서대로 처리
        for (int i = 0; i < 3; i++) {
            int level = i + 2;
            List<LocationOfRawData> filtered = rawData.stream()
                    .filter(location -> location.getLevel() == level)
                    .collect(Collectors.toList());


            List<Location> locations = null;
            if (level == 2) {
                locations = filtered.stream()
                        .map(raw -> new Location(raw.getName(),
                                locationIdentifier.get(locationAbbreviation.get(raw.getParentName())),
                                raw.getLevel()))
                        .collect(Collectors.toList());
            } else {
                locations = filtered.stream()
                        .map(raw -> new Location(raw.getName(), locationIdentifier.get(raw.getParentName()), raw.getLevel()))
                        .collect(Collectors.toList());
            }

            locations.forEach(location -> locationIdentifier.put(location.getName(), location));

            initialLocationData.addAll(locations);
        }
        locationRepository.saveAll(initialLocationData);
    }


}
