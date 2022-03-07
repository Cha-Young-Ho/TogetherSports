package com.togethersports.tosproejct.userProfileImage;

import com.togethersports.tosproejct.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Builder
@Data
@Entity
@Table(name = "T_USER_PROFILE_IMAGE")
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_PROFILE_SEQUENCE_ID")
    private int userProfileSequenceId;

    @ManyToOne
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

    @Column(name = "USER_PROFILE_REAL_NAME")
    private String userProfileRealName;

    @Column(name = "USER_PROFILE_SAVE_NAME")
    private String userProfileSaveName;

    @Column(name = "USER_PROFILE_EXTENSION")
    private String userProfileExtension;
}
