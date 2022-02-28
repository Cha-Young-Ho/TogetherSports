package com.togethersports.tosproejct.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Builder
@Data
@Entity
@Table(name = "T_USER_INFO")
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {

    @Id @OneToOne
    @JoinColumn(name = "USER_SEQUENCE_ID")
    private User user;

    @Column(name = "LOCATION_X")
    private Float locationX;

    @Column(name = "LOCATION_Y")
    private Float locationY;

    @Column(name = "USER_STATE", length = 1)
    private String userState;

    @Column(name = "MANNER_POINT")
    private int mannerPoint;
}
