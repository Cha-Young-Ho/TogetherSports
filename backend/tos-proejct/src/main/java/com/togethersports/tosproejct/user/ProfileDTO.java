package com.togethersports.tosproejct.user;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data // @Getter + Constructor로 바꿔야함
@ToString
public class ProfileDTO {

    private String image;
    private String userProfileRealName;
    private String userProfileExtension;
}
