package com.togethersports.tosproejct.location;

import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.location.code.LocationCode;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <h1>LocationController</h1>
 * <p>
 *     행정구역 조회 기능을 제공하는 컨트롤러
 * </p>
 * @author seunjeon
 */
@RequiredArgsConstructor
@RestController
public class LocationController {

    private final LocationService locationService;

    // 특별시, 광역시, 도 단위 행정구역(최상위 행정구역) 조회
    @GetMapping("/api/locations")
    public ResponseEntity<Response<List<String>>> retrievePrimaryLocations() {
        List<String> primaryLocation = locationService.getPrimaryLocation();

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, primaryLocation));
    }

    // 하위 행정구역 조회
    @GetMapping("/api/locations/parent/{name}")
    public ResponseEntity<Response<List<String>>> retrieveChildLocations(@PathVariable String name) {
        List<String> childLocation = locationService.getChildLocation(name);

        if (childLocation.isEmpty()) {
            return ResponseEntity.badRequest().body(Response.of(LocationCode.CHILD_NOT_FOUND, null));
        }

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, childLocation));
    }
}
