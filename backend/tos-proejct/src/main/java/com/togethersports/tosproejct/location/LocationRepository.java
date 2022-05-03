package com.togethersports.tosproejct.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * <h1>LocationRepository</h1>
 * <p>
 * 행정구역 엔티티 CRUD 리포지토리
 * </p>
 *
 * @author seunjeon
 */
public interface LocationRepository extends JpaRepository<Location, Long> {

    /**
     * 셀프 조인을 통해 특정 상위 행정구역 바로 아래에 위치하는 하위 행정구역 목록을 조회한다.
      * @param parentName 상위 행정구역 명
     * @return locations 하위 행정구역 엔티티 리스트
     */
    @Query("SELECT c FROM Location c INNER JOIN c.parent p ON c.parent.id = p.id WHERE p.name = :parentName")
    List<Location> findChildLocations(@Param("parentName") String parentName);

    /**
     * 최상위 행정구역을 조회한다. (최상위 행정구역: 상위 행정구역을 가지지 않는 행정구역 도, 광역시, 특별시 등)<br>
     * 최상위 행정구역의 level 1 을 이용한다.
     * @return locations 최상위 행정구역 엔티티 리스트
     */
    @Query("SELECT l FROM Location l WHERE l.level = 1")
    List<Location> findPrimaryLocations();

    /**
     * 특정 행정구역 데이터가 존재하는지 확인한다.<br>
     * 주로 서버 가동 시 행정구역 데이터의 초기화 여부 판단을 위해 사용된다.<br>
     * 서비스에서 제공하는 API 는 READ 뿐이기 때문에 데이터 초기화 여부 판단에 사용가능하다.
     * @param name 행정구역명
     * @return t/f (t: 해당 행정구역 정보 존재 (데이터 생성 되어있음), f: 해당 행정구역 정보 없음 (데이터 생성 안됨))
     */
    boolean existsByName(String name);
}
