package com.togethersports.tosproejct.user.dto;

import com.togethersports.tosproejct.enums.Gender;
import com.togethersports.tosproejct.user.User;
import lombok.*;

import java.util.Optional;

@Builder
@ToString
@Getter
@NoArgsConstructor
@AllArgsConstructor
//@RequiredArgsConstructor
public class OtherUserDTO {

    private String userNickname;
    private int mannerPoint;
    private Gender gender;

    public Optional<OtherUserDTO> parsingUser(User user){

        this.userNickname = user.getUserNickname();
        this.gender = user.getGender();
        this.mannerPoint = user.getMannerPoint();

        return Optional.of(this);
    }
}
