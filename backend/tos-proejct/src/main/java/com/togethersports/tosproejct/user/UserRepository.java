package com.togethersports.tosproejct.user;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findByUserNickname(String userNickname);
}
