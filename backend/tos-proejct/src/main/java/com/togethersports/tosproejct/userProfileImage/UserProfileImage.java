package com.togethersports.tosproejct.userProfileImage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.user.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Builder
@Getter
@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
public class UserProfileImage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userProfileSequenceId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userEmail")
    private User user;

    @Column(columnDefinition = "varchar(255) default 'Together_Sports_Image'")
    private String userProfileRealName;

    @Column(columnDefinition = "varchar(255) default 'Default_Image'")
    private String userProfileSaveName;

    @Column(columnDefinition = "varchar(255) default 'png'")
    private String userProfileExtension;

    @Column(columnDefinition = "varchar(255) default '/Users/younghocha/files/profile/img/TogetherSports_Default_Image.png'")
    private String userProfileImageFilePath;




}
