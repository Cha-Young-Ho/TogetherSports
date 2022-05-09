package com.togethersports.tosproject.common.excel;

import lombok.Getter;
import lombok.SneakyThrows;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.File;

/**
 * <h1>Excel</h1>
 * <p>
 * MS Excel 형식의 파일을 읽어 {@link org.apache.poi.ss.usermodel.Workbook} 타입으로 저장하는 클래스
 * </p>
 *
 * @author seunjeon
 */
public class Excel {

    @Getter
    private Workbook workbook;

    @SneakyThrows
    public Excel(File excelFile)  {
        this.workbook = WorkbookFactory.create(excelFile);
    }
}
