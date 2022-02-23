package com.togethersports.tosproejct.user;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserDTO {

    private String userName;
    private String userEmail;
    private String provider;
}
