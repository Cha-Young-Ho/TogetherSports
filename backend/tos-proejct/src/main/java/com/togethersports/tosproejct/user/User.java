package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.room.Room;
import com.togethersports.tosproejct.user.dto.UserOfModifyInfo;
import com.togethersports.tosproejct.area.ActiveArea;
import com.togethersports.tosproejct.interest.Interest;
import com.togethersports.tosproejct.security.Role;
import com.togethersports.tosproejct.security.oauth2.model.OAuth2Provider;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * <h1>User</h1>
 * <p>
 *     사용자 계정 엔티티
 * </p>
 * <p>신규 계정을 생성하려면 {@link #createUser(Long, String, String, OAuth2Provider)} 참조</p>
 * <p>기존 계정 정보를 계정 엔티티로 변환하려면 {@link #convertUser(Long, String, Role)} 참조</p>
 * @author seunjeon
 * @author younghoCha
 */
@Getter
@Entity
public class User implements Serializable {

    private static final long serialVersionUID = 6866208578606279365L;

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private Long id;

    @Column(name = "USER_OAUTH2_ID")
    private Long oauth2Id;

    @Column(name = "USER_EMAIL")
    private String email;

    @Column(name = "USER_NICKNAME")
    private String nickname;

    @Column(name = "USER_OAUTH2_PROVIDER")
    @Enumerated(EnumType.STRING)
    private OAuth2Provider provider;

    @Column(name = "USER_ROLE")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "USER_IS_FIRST") // 가입 이후 추가정보 입력 여부
    private boolean isFirst;

    //fixme yml에서 파일 끌고와야함
    //설정 안할 시 기본 이미지 등록
    @Column(name = "USER_PROFILE_IMAGE_PATH")
    private String userProfileImage; // 프로필 이미지 저장 경로

    @Column(name = "USER_GENDER")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "USER_BIRTH_DAY")
    private LocalDate userBirth;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID")
    private List<Interest> interests;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "USER_ID")
    private List<ActiveArea> activeAreas;

    @Column(name = "MANNER_POINT", columnDefinition = "int default 10")
    private int mannerPoint;

    @OneToMany(mappedBy = "host")
    private List<Room> hostingRooms;

    @OneToMany(mappedBy = "createUser")
    private List<Room> madeRooms;

    @Column(name = "INFORMATION_REQUIRED")
    private boolean isInformationRequired;

    // 계정 엔티티를 생성자 및 빌더로 직접 접근해서 생성하는 것은 불가능 반드시 특정 메소드 사용하도록 강제
    @Builder(access = AccessLevel.PRIVATE)
    private User(Long id, Long oauth2Id, String email, String nickname, OAuth2Provider provider, Role role, boolean isFirst) {
        this.id = id;
        this.oauth2Id = oauth2Id;
        this.email = email;
        this.nickname = nickname;
        this.provider = provider;
        this.role = role;
        this.isFirst = isFirst;
        this.isInformationRequired = true;
    }
    protected User() {}

    /**
     * 신규 사용자 계정 엔티티를 생성해서 반환한다.<br>
     * 신규 사용자를 추가할 때 사용한다.
     * @param oauth2Id OAuth2 로그인 후 받은 해당 OAuth2 계정 식별자
     * @param email OAuth2 로그인 후 받은 해당 OAuth2 프로필 정보상의 이메일
     * @param provider OAuth2 사업자
     * @return account - 신규 계정 엔티티, 권한은 일반 사용자 권한, 추가 정보 입력 여부 미입력으로 자동 설정
     * @author seunjeon
     * @author younghoCha
     */
    public static User createUser(Long oauth2Id, String email, OAuth2Provider provider) {
        return User.builder()
                .oauth2Id(oauth2Id)
                .email(email)
                .provider(provider)
                .role(Role.ROLE_USER)
                .isFirst(true)
                .build();
    }

    /**
     * 기존 계정 정보를 바탕으로 계정 엔티티를 생성한다.<br>
     * 신규 계정 추가가 아닌 단순 계정 엔티티로의 변화가 필요할 때 사용한다.<br>
     * 이 메소드로 생성한 엔티티는 영속상태가 아니기 때문에 다양한 논리적 문제를 발생시킬 수 있다.<br>
     * User 에 대한 DB 조작이 필요한 경우 DB 에서 읽어온 User 엔티티로 처리해야 한다.
     * @param id 계정 식별자
     * @param email 계정 이메일
     * @param role 계정 권한 정보
     * @return account 객체
     */
    public static User convertUser(Long id, String email, Role role) {
        return User.builder()
                .id(id)
                .email(email)
                .role(role)
                .build();
    }

    /**
     * 신규 계정에 추가정보를 입력한다. <br>
     * 해당 메소드 호출 이후 {@link #isFirst} 값이 false 로 설정된다.
     * @param profileImagePath 프로필 이미지 접근 경로
     * @param gender 성별
     * @param userBirth 생년월일
     */
    public void initUser(String profileImagePath, Gender gender, LocalDate userBirth, List<ActiveArea> activeAreas, List<Interest> interests) {
        this.userProfileImage = profileImagePath;
        this.gender = gender;
        this.userBirth = userBirth;
        this.isFirst = false;
        this.activeAreas = activeAreas;
        this.interests = interests;
        this.isInformationRequired = false;

    }
    public void initUser(Gender gender, LocalDate userBirth, List<ActiveArea> activeAreas, List<Interest> interests) {
        this.gender = gender;
        this.userBirth = userBirth;
        this.isFirst = false;
        this.activeAreas = activeAreas;
        this.interests = interests;
        this.isInformationRequired = false;

    }

    public void updateUser(UserOfModifyInfo userOfModifyInfo, List<ActiveArea> activeAreas, List<Interest> interests, String userProfileImage){
        this.gender = userOfModifyInfo.getGender();
        this.userBirth = userOfModifyInfo.getUserBirth();
        this.interests = interests;
        this.activeAreas = activeAreas;
        this.userProfileImage = userProfileImage;
        this.nickname = userOfModifyInfo.getUserNickname();
        this.isInformationRequired = false;
        this.isFirst = false;
    }

    public void updateIsFirst(){
        this.isFirst = false;
    }

}
