package com.togethersports.tosproejct.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> getUserFindByEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }

    public void userSignup(UserDTO userDTO) {

        User user = User.builder()
                .userSequenceId(userDTO.getUserSequenceId())
                .userEmail(userDTO.getUserEmail())
                .userName(userDTO.getUserName())
                .userBirth(userDTO.getUserBirth())
                .userNickname(userDTO.getUserNickname())
                .userState(userDTO.getUserState())
                .admin(userDTO.getAdmin())
                .gender(userDTO.getGender())
                .mannerPoint(userDTO.getMannerPoint())
                .locationX(userDTO.getLocationX())
                .locationY(userDTO.getLocationY())
                .provider(userDTO.getProvider())
                .build();

        userRepository.save(user);
    }
}

