package com.togethersports.tosproejct.location;

import com.togethersports.tosproejct.location.dto.LocationOfRawData;
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
        if (locationRepository.existsByName("서울특별시")) {
            return;
        }

        Set<LocationOfRawData> rawData = dataLoader.retrieveLocationDataFromExcel();

        Map<String, Location> locationIdentifier = new HashMap<>();

        // 상위 행정구역이 없는 행정구역의 경우 별도의 연관관계 처리 없이 엔티티 설정
        List<Location> locationLevel1 = rawData.stream()
                .filter(raw -> raw.getLevel() == 1)
                .map(LocationOfRawData::toEntity)
                .collect(Collectors.toList());

        locationLevel1.forEach(location -> locationIdentifier.put(location.getName(), location));
        List<Location> initialLocationData = new ArrayList<>(locationLevel1);

        // 상위 행정구역을 가지는 경우 레벨 2, 3, 4 순서대로 처리
        for (int i = 0; i < 3; i++) {
            int level = i + 2;
            List<LocationOfRawData> filtered = rawData.stream()
                    .filter(location -> location.getLevel() == level)
                    .collect(Collectors.toList());

            List<Location> locations = filtered.stream()
                    .map(raw -> new Location(raw.getName(), locationIdentifier.get(raw.getParentName()), raw.getLevel()))
                    .collect(Collectors.toList());

            locations.forEach(location -> locationIdentifier.put(location.getName(), location));

            initialLocationData.addAll(locations);
        }
        locationRepository.saveAll(initialLocationData);
    }



}
