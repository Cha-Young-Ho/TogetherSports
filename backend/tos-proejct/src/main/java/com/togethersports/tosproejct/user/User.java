package com.togethersports.tosproejct.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.togethersports.tosproejct.enums.Gender;
import com.togethersports.tosproejct.enums.Provider;
import com.togethersports.tosproejct.etc.ActiveAreas;
import com.togethersports.tosproejct.etc.Interests;
import com.togethersports.tosproejct.userProfileImage.UserProfileImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
@Table
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int userSequenceId;

    @Column(length = 100, unique = true)
    private String userEmail;

    @Column(length = 5)
    private String userName;

    @Column(length = 15)
    private String userNickname;

    @Column(length = 4)
    private String userBirthYear;

    @Column(length = 2)
    private String userBirthMonth;

    @Column(length = 2)
    private String userBirthDay;

    @Column
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(columnDefinition = "integer default 0")
    private int mannerPoint;

    @Column(length = 20)
    @Enumerated(EnumType.STRING)
    private Provider provider;
//
//    @OneToMany(mappedBy = "user")
//    private List<ActiveAreas> activeAreasList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "user")
//    private List<Interests> interestsList = new ArrayList<>();


    @OneToMany(mappedBy = "user")
    private List<Interests> interestsList;

    @OneToMany(mappedBy = "user")
    private List<ActiveAreas> activeAreas;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<UserProfileImage> userProfileImageList;

    @JsonIgnore
    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return null;
    }

    @JsonIgnore
    public String getUserName() {
        return userName;
    }

    @JsonIgnore
    @Override
    public String getUsername() {
        return userEmail;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
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
        this.userNickname = userDTO.getUserNickname();

    }
}
