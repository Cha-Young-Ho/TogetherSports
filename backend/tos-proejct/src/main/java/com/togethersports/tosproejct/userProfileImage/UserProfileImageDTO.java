package com.togethersports.tosproejct.userProfileImage;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserProfileImageDTO {

    private int userProfileSequenceId;
    private int userSequenceId;
    private String image;
    private String userProfileRealName;
    private String userProfileSaveName;
    private String userProfileExtension;
}
