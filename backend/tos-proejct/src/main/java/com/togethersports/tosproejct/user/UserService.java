package com.togethersports.tosproejct.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    public Optional<User> getUserFindByEmail(String userEmail) {
        return userRepository.findByUserEmail(userEmail);
    }
}
