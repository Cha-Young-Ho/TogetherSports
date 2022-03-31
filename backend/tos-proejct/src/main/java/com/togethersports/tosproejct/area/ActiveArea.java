package com.togethersports.tosproejct.area;

import com.togethersports.tosproejct.account.User;
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
 *     신규 활동 지역을 생성하려면 다음 메소드를 참조 {@link #createActiveArea(User, String)}
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


    private String address; // 지역 주소 명

    // 활동 지역 엔티티를 생성자 및 빌더로 직접 접근해서 생성하는 것은 불가능 반드시 특정 메소드 사용하도록 강제
    @Builder(access = AccessLevel.PRIVATE)
    private ActiveArea(String address) {
        this.address = address;
    }

    protected ActiveArea() {}

    /**
     * 신규 활동 지역 엔티티를 생성한다. <br>
     * @param user 반드시 id 값을 가지는 user 가 들어와야 한다.
     * @param address 활동 지역 주소명
     * @return activeArea 활동 지역 엔티티
     */
    public static ActiveArea createActiveArea(String address) {
        return ActiveArea.builder()
                .address(address)
                .build();
    }
}
