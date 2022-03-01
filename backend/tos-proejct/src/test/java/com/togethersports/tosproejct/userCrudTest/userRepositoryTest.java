package com.togethersports.tosproejct.userCrudTest;

import com.togethersports.tosproejct.user.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Commit;

@Slf4j
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Commit
public class userRepositoryTest {

    @Autowired
    private UserRepository userRepository;


    @Test
    public void 회원등록_테스트() {
        User user = User.builder()
                .userSequenceId(1)
                .userEmail("test@gmail.com")
                .userBirth("990131")
                .userNickname("야스오")
                .admin(Admin.일반회원)
                .gender(Gender.남)
                .build();

        User newUser = userRepository.save(user);

        log.info(user.toString());
        log.info(newUser.toString());
    }

    @Test
    public void getUserFindByEmail() {

        log.info("result test = " + userRepository.findByUserEmail("test@gmail.com"));

    }

}

