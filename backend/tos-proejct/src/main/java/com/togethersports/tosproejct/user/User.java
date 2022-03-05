package com.togethersports.tosproejct.user;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Data
@Entity
@Table(name = "T_USER")
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

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

    @Column(name = "USER_BIRTH_YEAR", length = 4)
    private String userBirthYear;

    @Column(name = "USER_BIRTH_MONTH", length = 2)
    private String userBirthMonth;

    @Column(name = "USER_BIRTH_DAY", length = 2)
    private String userBirthDay;

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

    @Column(name = "ADMIN")
    @Enumerated(EnumType.STRING)
    private Admin admin;

    @Column(name = "PROVIDER", length = 20)
    @Enumerated(EnumType.STRING)
    private Provider provider;

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return null;
    }

    public String getUserName() {
        return userName;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void update(UserDTO userDTO){

        this.userEmail = userDTO.getUserEmail();
        this.userBirthYear = userDTO.getUserBirthYear();
        this.userBirthMonth = userDTO.getUserBirthMonth();
        this.userBirthDay = userDTO.getUserBirthDay();
        this.userName = userDTO.getUserName();
        this.userState = userDTO.getUserState();
        this.locationX = userDTO.getLocationX();
        this.locationY = userDTO.getLocationY();
        this.mannerPoint = userDTO.getMannerPoint();
        this.userNickname = userDTO.getUserNickname();

    }
}
