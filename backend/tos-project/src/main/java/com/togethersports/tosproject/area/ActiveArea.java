package com.togethersports.tosproject.area;

import com.togethersports.tosproject.user.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

/**
 * <h1>ActiveArea</h1>
 * <p>
 *     활동 지역 엔티티
 * </p>
 * <p>
 *     사용자가 활동 지역으로 선택한 주소를 저장하며 사용자별 최대 5개까지 지정될 수 있다.
 * </p>
 * <p>
 *     신규 활동 지역을 생성하려면 다음 메소드를 참조 {@link #createActiveArea(String)}
 * </p>
 * @see User
 * @author seunjeon
 */
@Getter
@Entity
public class ActiveArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACTIVE_AREA_ID")
    private Long id;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "LOCATION")
    private String location; // 지역 주소 명

    @Column(name = "LATITUDE", precision = 100, scale = 100)
    private double latitude;

    @Column(name = "LONGITUDE", precision = 100, scale = 100)
    private double longitude;

    // 활동 지역 엔티티를 생성자 및 빌더로 직접 접근해서 생성하는 것은 불가능 반드시 특정 메소드 사용하도록 강제
    @Builder(access = AccessLevel.PRIVATE)
    private ActiveArea(String location, Long latitude, Long longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;

    }

    protected ActiveArea() {}

    /**
     * 신규 활동 지역 엔티티를 생성한다. <br>
     * @param location 활동 지역 주소명
     * @return activeArea 활동 지역 엔티티
     */
    public static ActiveArea createActiveArea(String location, Long latitude, Long longitude) {
        return ActiveArea.builder()
                .location(location)
                .longitude(longitude)
                .latitude(latitude)
                .build();
    }
}
