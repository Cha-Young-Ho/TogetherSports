package com.togethersports.tosproject.user;

import com.togethersports.tosproject.chat.ChatMessage;
import com.togethersports.tosproject.participant.Participant;
import com.togethersports.tosproject.room.Room;
import com.togethersports.tosproject.user.dto.UserOfModifyInfo;
import com.togethersports.tosproject.area.ActiveArea;
import com.togethersports.tosproject.interest.Interest;
import com.togethersports.tosproject.security.Role;
import com.togethersports.tosproject.security.oauth2.model.OAuth2Provider;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

/**
 * <h1>User</h1>
 * <p>
 * 사용자 계정 엔티티
 * </p>
 * <p>신규 계정을 생성하려면 {@link #createUser(Long, String, OAuth2Provider)} 참조</p>
 * <p>기존 계정 정보를 계정 엔티티로 변환하려면 {@link #convertUser(Long, String, Role)} 참조</p>
 *
 * @author seunjeon
 * @author younghoCha
 */
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User {

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
    private boolean informationRequired;

    @OneToMany(mappedBy = "user")
    private List<Participant> participateRooms;

    @OneToMany(mappedBy = "user")
    private List<ChatMessage> chatMessages;

    /**
     * 신규 사용자 계정 엔티티를 생성해서 반환한다.<br>
     * 신규 사용자를 추가할 때 사용한다.
     *
     * @param oauth2Id OAuth2 로그인 후 받은 해당 OAuth2 계정 식별자
     * @param email    OAuth2 로그인 후 받은 해당 OAuth2 프로필 정보상의 이메일
     * @param provider OAuth2 사업자
     * @return account - 신규 계정 엔티티, 권한은 일반 사용자 권한, 추가 정보 입력 여부 미입력으로 자동 설정
     * @author seunjeon
     * @author younghoCha
     */
    public static User createUser(Long oauth2Id, String email, OAuth2Provider provider) {
        User newUser = new User();
        newUser.oauth2Id = oauth2Id;
        newUser.email = email;
        newUser.provider = provider;
        newUser.role = Role.ROLE_USER;
        newUser.informationRequired = true;
        return newUser;
    }

    /**
     * 기존 계정 정보를 바탕으로 계정 엔티티를 생성한다.<br>
     * 신규 계정 추가가 아닌 단순 계정 엔티티로의 변화가 필요할 때 사용한다.<br>
     * 이 메소드로 생성한 엔티티는 DB에서 조회하여 얻은 상태가 아니기 때문에 다양한 논리적 문제를 발생시킬 수 있다.<br>
     * User 에 대한 DB 조작이 필요한 경우 DB 에서 읽어온 User 엔티티로 처리해야 한다.
     *
     * @param id    계정 식별자
     * @param email 계정 이메일
     * @param role  계정 권한 정보
     * @return account 객체
     */
    public static User convertUser(Long id, String email, Role role) {
        User converted = new User();
        converted.id = id;
        converted.email = email;
        converted.role = role;
        return converted;
    }

    // TODO 주석 및 메소드 구조 개선
    public void updateUser(UserOfModifyInfo userOfModifyInfo, List<ActiveArea> activeAreas, List<Interest> interests, String userProfileImage) {
        this.gender = userOfModifyInfo.getGender();
        this.userBirth = userOfModifyInfo.getUserBirth();
        this.interests = interests;
        this.activeAreas = activeAreas;
        this.userProfileImage = userProfileImage;
        this.nickname = userOfModifyInfo.getUserNickname();
        this.informationRequired = false;
    }
}
