package com.togethersports.tosproject.location;

import com.togethersports.tosproject.common.excel.Excel;
import com.togethersports.tosproject.common.excel.ExcelReader;
import com.togethersports.tosproject.common.file.util.ResourceFileLoader;
import com.togethersports.tosproject.location.dto.LocationOfRawData;

import org.apache.poi.ss.usermodel.Row;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

/**
 * <h1>LocationRawDataLoader</h1>
 * <p>
 *     행정 구역 정보를 엑셀에서 불러와 자바 타입으로 변환하는 클래스
 * </p>
 *
 * @author seunjeon
 */
@Component
public class LocationRawDataLoader {

    private final ExcelReader excelReader;

    /**
     * arealist.xlsx 파일을 리소스 경로에서 읽어서 사용하도록 하는 생성자.
     */
    public LocationRawDataLoader() {
        ResourceFileLoader resourceFileLoader = new ResourceFileLoader("/arealist.xlsx");
        Excel excel = new Excel(resourceFileLoader.getFile());
        this.excelReader = new ExcelReader(excel.getWorkbook());
    }

    /**
     * 엑셀 파일의 행정구역 정보를 자바 클래스 형식으로 변환하여 가져온다.<br>
     * 행정구역 정보를 파일에서 조회 시 표의 헤더는 자동으로 제거한다.<br>
     * 행정구역은 행정구역 명, 상위 행정구역 명, 레벨로 구분하여 중복되지 않는다.
     * @return locationOfRawData set
     */
    public Set<LocationOfRawData> retrieveLocationDataFromExcel() {
        normalize();

        Set<LocationOfRawData> rawData = new HashSet<>();

        for (Row row : excelReader) {
            List<LocationOfRawData> data = convertRawDataList(row);
            rawData.addAll(data);
        }

        return rawData;
    }

    /**
     * 엑셀 파일 내의 제목행과 헤더 부분을 제거한다.<br>
     * (현재 읽는 arealist.xlsx 파일의 경우 4번째 행부터 데이터가 시작되기 때문에 3번째 행까지는 제거한다.
     */
    private void normalize() {
        Iterator<Row> iterator = excelReader.iterator();

        for (int i = 0; i < 3; i++) {
            iterator.next();
            iterator.remove();
        }
    }

    /**
     * 행정구역 정보 파일의 한 행을 각 행정구역별 DTO 리스트로 변환한다.
     * @param row 엑셀 파일의 한 행
     * @return locationOfRawData list 행정구역 한 행에 대해서 나올 수 있는 행정구역 정보 리스트
     */
    private List<LocationOfRawData> convertRawDataList(Row row) {
        List<LocationOfRawData> locations = new ArrayList<>();

        String parentLocation = null;

        int level = 1;

        for (int i = 0; i < 4; i++) {
            String locationName = row.getCell(i).getStringCellValue();

            if (locationName.isEmpty()) {
                continue;
            }

            LocationOfRawData rawData = new LocationOfRawData(locationName, parentLocation, level);
            locations.add(rawData);

            parentLocation = locationName;
            level++;
        }

        return locations;
    }
}

