package com.togethersports.tosproject.mannerpoint;

import com.togethersports.tosproject.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserMannerPointRepository extends JpaRepository<UserMannerPoint, Long> {

    Optional<UserMannerPoint> findByUserAndTargetUser(User user, User targetUser);
}
