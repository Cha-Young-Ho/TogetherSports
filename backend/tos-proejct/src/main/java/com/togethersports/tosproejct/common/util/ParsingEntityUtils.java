package com.togethersports.tosproejct.common.util;

import com.togethersports.tosproejct.account.User;
import com.togethersports.tosproejct.area.ActiveArea;
import com.togethersports.tosproejct.interest.Interest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * <h1>ParsingEntityUtils</h1>
 * <p>
 *     Json과 객체 간 타입 변환 유틸리티
 * </p>
 * <p>
 *     입력받은 값과 실제 DB 객체의 연동을 위하여 양방향으로 변환해줍니다.
 * </p>
 *
 * @author younghoCha
 */
@Component
public class ParsingEntityUtils {

    // 문자열 리스트로 받은 "활동 지역"을 활동 지역 객체 리스트로 변환하는 메소드
    public List<ActiveArea> parsingStringToActivesEntity(List<String> areaList){
        List<ActiveArea> entityList = new ArrayList<>();

        for (String area : areaList){
            entityList.add(ActiveArea.createActiveArea(area));
        }
        return entityList;
    }
    // 문자열 리스트로 받은 "관심 종목"을 관심 종목 객체 리스트로 변환하는 메소드
    public List<Interest> parsingStringToInterestsEntity(List<String> interestsList){
        List<Interest> entityList = new ArrayList<>();

        for (String interest : interestsList){
            entityList.add(Interest.createInterest(interest));
        }
        return entityList;
    }

    public List<String> parsingInterestsEntityToString(List<Interest> interestList){
        List<String> strList = new ArrayList<>();

        for(Interest interest : interestList){
            strList.add(interest.getName());
        }

        return strList;
    }

    public List<String> parsingAreasEntityToString(List<ActiveArea> activeAreaList){
        List<String> strList = new ArrayList<>();

        for(ActiveArea activeArea : activeAreaList){
            strList.add(activeArea.getAddress());
        }

        return strList;
    }
}
