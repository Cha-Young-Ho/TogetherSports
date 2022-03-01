package com.togethersports.tosproejct.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Builder
@Data
@Entity
@Table(name = "T_USER")
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_SEQUENCE_ID")
    private int userSequenceId;

    @Column(name = "USER_EMAIL", length = 100, unique = true)
    private String userEmail;

    @Column(name = "USER_NAME", length = 5)
    private String userName;

    @Column(name = "USER_NICKNAME", length = 15)
    private String userNickname;

    @Column(name = "USER_BIRTH", length = 6)
    private String userBirth;

    @Column(name = "USER_STATE", length = 5)
    private String userState;

    @Column(name = "MANNER_POINT")
    private int mannerPoint;

    @Column(name = "LOCATION_X")
    private Double locationX;

    @Column(name = "LOCATION_Y")
    private Double locationY;

    @Column(name = "GENDER", length = 1)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "ADMIN", length = 4)
    @Enumerated(EnumType.STRING)
    private Admin admin;

    @Column(name = "PROVIDER", length = 20, unique = true)
    @Enumerated(EnumType.STRING)
    private Provider provider;
}
