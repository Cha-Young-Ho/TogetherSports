package com.togethersports.tosproejct.user;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class UserDTO {

    private int userSequenceId;
    private String userEmail;
    private String userName;
    private String userNickname;
    private String userBirth;
    private String userState;
    private int mannerPoint;
    private Double locationX;
    private Double locationY;
    private Gender gender;
    private Admin admin;
    private Provider provider;
}
