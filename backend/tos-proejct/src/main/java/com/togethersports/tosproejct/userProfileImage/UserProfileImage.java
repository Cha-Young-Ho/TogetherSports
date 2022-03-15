package com.togethersports.tosproejct.userProfileImage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Builder
@Getter
@Entity
@Table(name = "T_USER_PROFILE_IMAGE")
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class UserProfileImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_PROFILE_SEQUENCE_ID")
    private int userProfileSequenceId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

    @Column(name = "USER_PROFILE_REAL_NAME", columnDefinition = "varchar(255) default 'Together_Sports_Image'")
    private String userProfileRealName;

    @Column(name = "USER_PROFILE_SAVE_NAME", columnDefinition = "varchar(255) default 'Default_Image'")
    private String userProfileSaveName;

    @Column(name = "USER_PROFILE_EXTENSION", columnDefinition = "varchar(255) default 'png'")
    private String userProfileExtension;

    @Column(name = "USER_PROFILE_IMAGE_FILE_PATH", columnDefinition = "varchar(255) default '/Users/younghocha/files/profile/img/TogetherSports_Default_Image.png'")
    private String userProfileImageFilePath;




}
