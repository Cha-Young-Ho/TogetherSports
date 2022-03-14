package com.togethersports.tosproejct.userProfileImage;

import com.togethersports.tosproejct.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserProfileImageRepository extends JpaRepository<UserProfileImage, Integer> {

    @Query(value = "select * from t_user_profile_image where user_sequence_id = :user_sequence_id", nativeQuery = true)
    Optional<User> findByUserSequenceId(@Param(value = "user_sequence_id") int userSequenceId);
}
