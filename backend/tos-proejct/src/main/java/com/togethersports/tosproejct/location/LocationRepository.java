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

    @Query("SELECT c FROM Location c INNER JOIN c.parent p ON c.parent.id = p.id WHERE p.name = :parentName")
    List<Location> findChildLocations(@Param("parentName") String parentName);
}
