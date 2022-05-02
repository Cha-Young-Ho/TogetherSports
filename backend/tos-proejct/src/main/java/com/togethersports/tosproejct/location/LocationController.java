package com.togethersports.tosproejct.location;

import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/location/parent/{name}")
    public ResponseEntity<Response<List<String>>> retrieveChildLocations(@PathVariable String name) {
        List<String> childLocation = locationService.getChildLocation(name);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, childLocation));
    }
}
