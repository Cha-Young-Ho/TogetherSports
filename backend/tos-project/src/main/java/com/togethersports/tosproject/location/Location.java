package com.togethersports.tosproject.location;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import lombok.Setter;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import javax.persistence.*;

/**
 * <h1>Location</h1>
 * <p>
 *     행정구역 하나에 대한 정보를 나타내는 엔티티 클래스
 * </p>
 * <p>
 *     자기참조 형식으로 상위 행정구역을 가질 수 있다.
 * </p>
 * @author seunjeon
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Location {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LOCATION_ID")
    private Long id;

    @Setter
    @Column(name = "LOCATION_NAME")
    private String name;

    @Setter
    @ManyToOne
    @JoinColumn(name = "PARENT_ID")
    private Location parent;

    @Column(name = "LOCATION_LEVEL")
    private int level;

    /**
     * 행정구역 정보 생성 시 행정구역 이름과 해당 행정구역이 속하는 상위 행정구역이 있을 경우 해당 행정구역 엔티티를 받아 생성한다.<br>
     * @param name 행정구역 명 (e.g 경상남도)
     * @param parent 상위 행정구역 엔티티  null 값이 가능하다. (e.g 서울 등의 최상위 행정구역은 상위 행정구역이 없음)
     * @param level 1: 상위 행정구역이 없음, 2: 상위 행정 구역 1개 ... N: 상위 행정 구역 N-1개
     */
    public Location(@NonNull String name, @Nullable Location parent, int level) {
        this.name = name;
        this.parent = parent;
        this.level = level;
    }
}
