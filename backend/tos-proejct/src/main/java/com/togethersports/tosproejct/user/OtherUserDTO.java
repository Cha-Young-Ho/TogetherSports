package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.enums.Gender;
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

    public Optional<OtherUserDTO> parsingUser(Optional<User> user){

        this.userNickname = user.get().getUserNickname();
        this.gender = user.get().getGender();
        this.mannerPoint = user.get().getMannerPoint();

        return Optional.of(this);
    }
}
