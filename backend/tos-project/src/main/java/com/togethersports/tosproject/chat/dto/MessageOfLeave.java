
package com.togethersports.tosproject.chat.dto;


import com.togethersports.tosproject.user.Gender;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageOfLeave {

    private Long id;
    private String userNickname;
    private int mannerPoint;
    private Gender gender;
}
