package com.togethersports.tosproject.common.excel;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import java.util.Iterator;

/**
 * <h1>ExcelReader</h1>
 * <p>
 *     엑셀 파일은 시트 단위로 읽는 역할을 담당하는 클래스
 * </p>
 * @author seunjeon
 */
public class ExcelReader implements Iterable<Row> {

    private Sheet sheet;

    /**
     * 인자로 받는 Workbook 의 첫번째 시트를 열어서 읽기 대상으로 지정하는 생성자
     * @param workbook 시트를 읽어올 대상 엑셀 파일
     */
    public ExcelReader(Workbook workbook) {
        this.sheet = workbook.getSheetAt(0);
    }

    @Override
    public Iterator<Row> iterator() {
        return sheet.rowIterator();
    }
}
