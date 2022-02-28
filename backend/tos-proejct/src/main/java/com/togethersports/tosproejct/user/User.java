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

    @Column(name = "USER_BIRTH", length = 6)
    private String userBirth;

    @Column(name = "USER_NICKNAME", length = 15)
    private String userNickname;

    @Column(name = "GENDER", length = 1)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "ADMIN", length = 4)
    @Enumerated(EnumType.STRING)
    private Admin admin;

    @Column(name = "OAUTH_ID", unique = true)
    private Long oauthId;

    @Column(name = "OAUTH_PROVIDER", length = 20, unique = true)
    @Enumerated(EnumType.STRING)
    private Provider oauthProvider;
}
