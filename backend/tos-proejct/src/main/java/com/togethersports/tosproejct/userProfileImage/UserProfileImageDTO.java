package com.togethersports.tosproejct.userProfileImage;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserProfileImageDTO {

    private String imageSource;
    private String userProfileRealName;
    private String userProfileSaveName;
    private String userProfileExtension;
    private String userProfileFilePath;

    public void updateSaveName(String userProfileSaveName){
        this.userProfileSaveName = userProfileSaveName;
    }

    public void updateUserProfileFilePath(String userProfileFilePath){
        this.userProfileFilePath = userProfileFilePath;
    }
}
