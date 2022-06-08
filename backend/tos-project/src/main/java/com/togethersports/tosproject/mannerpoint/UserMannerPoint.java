package com.togethersports.tosproject.mannerpoint;

import com.togethersports.tosproject.user.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class UserMannerPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_MANNER_POINT_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REQUEST_USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TARGET_USER_ID")
    private User targetUser;

    @Column(name = "MANNER_POINT_STATUS")
    @Enumerated(EnumType.STRING)
    private MannerPointStatus mannerPointStatus;

    @Builder(access = AccessLevel.PRIVATE)
    private UserMannerPoint(User user, User targetUser, MannerPointStatus mannerPointStatus){
        this.user = user;
        this.targetUser = targetUser;
        this.mannerPointStatus = mannerPointStatus;

    }

    public static UserMannerPoint of(User user, User targetUser, MannerPointStatus mannerPointStatus){

        return UserMannerPoint.builder()
                .mannerPointStatus(mannerPointStatus)
                .user(user)
                .targetUser(targetUser)
                .build();
    }

    public void updateMannerPointStauts(MannerPointStatus mannerPointStatus){
        this.mannerPointStatus = mannerPointStatus;
    }

}


