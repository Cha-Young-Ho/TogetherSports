package com.togethersports.tosproejct.user;

import lombok.Data;
import javax.persistence.*;


@Data
@Entity
@Table(name = "T_USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_SEQUENCE_ID")
    private int userSequenceId;

    @Column(name = "USER_EMAIL", length = 100, unique = true)
    private String userEmail;

    @Column(name = "USER_BIRTH", length = 6)
    private String userBirth;

    @Column(name = "USER_NICKNAME", length = 15)
    private String userNickname;

    @Column(name = "GENDER", length = 1)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "ADMIN", length = 1)
    @Enumerated(EnumType.STRING)
    private Admin admin;

}
