package com.togethersports.tosproejct.user.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.enums.Gender;
import com.togethersports.tosproejct.enums.Provider;
import com.togethersports.tosproejct.etc.ActiveAreas;
import com.togethersports.tosproejct.etc.Interests;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import java.util.List;

@Builder
@AllArgsConstructor
public class UserOfMyInfo {

    private String userEmail;
    private String userName;
    private String userNickname;
    private Gender gender;
    private int mannerPoint;
    private Provider provider;
    private List<Interests> interestsList;
    private List<ActiveAreas> activeAreas;
    private List<UserProfileImage> userProfileImageList;

    public UserOfMyInfo from(User user) {

        this.userEmail = user.getUserEmail();
        this.userName = user.getUserName();
        this.userNickname = user.getUserNickname();
        this.gender = user.getGender();
        this.mannerPoint = user.getMannerPoint();

        return null;
    }
}
