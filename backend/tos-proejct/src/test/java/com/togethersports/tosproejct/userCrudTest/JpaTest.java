package com.togethersports.tosproejct.userCrudTest;


import com.togethersports.tosproejct.user.Admin;
import com.togethersports.tosproejct.user.Gender;
import com.togethersports.tosproejct.user.User;
import com.togethersports.tosproejct.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;

/*
    JPA연동 테스트 클래스 파일입니다.
    각자 1개씩 돌려야 합니다.
 */
@Slf4j
@DataJpaTest // 해당 어노테이션은 실제 데이터베이스를 사용하지 않고, in memory jpa 공간에서 db 테스트를 지원해주는 어노테이션입니다.
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class JpaTest {

    @Autowired
    private UserRepository userRepository;

    final String BIRTH = "001200";
    final String EMAIL = "aabbcc@gmail.com";
    final String NICKNAME = "침착맨";
    final int SEQUENCEID = 1;
    final Gender GENDER = Gender.남;
    final Admin ADMIN = Admin.일반회원;
    User user = User.builder()
            .userEmail(EMAIL)
            .userBirth(BIRTH)
            .userNickname(NICKNAME)
            .admin(ADMIN)
            .gender(GENDER)
            .userSequenceId(SEQUENCEID).build();



    @Test
    public void user_저장_테스트(){

        //given
        //when
        final User testUser = userRepository.save(user);

        //then
        Assertions.assertEquals(testUser.getUserBirth(), BIRTH);
        Assertions.assertEquals(testUser.getUserEmail(), EMAIL);
        Assertions.assertEquals(testUser.getUserNickname(), NICKNAME);
        Assertions.assertEquals(testUser.getAdmin(), ADMIN);
        Assertions.assertEquals(testUser.getGender(), GENDER);

    }

    @Test
    public void user_조회테스트(){
        //given

        //when
        userRepository.save(user);
        User testUser = userRepository.getById(1);


        //then
        Assertions.assertEquals(testUser.getUserBirth(), BIRTH);
        Assertions.assertEquals(testUser.getUserEmail(), EMAIL);
        Assertions.assertEquals(testUser.getUserNickname(), NICKNAME);
        Assertions.assertEquals(testUser.getUserSequenceId(), SEQUENCEID);
        Assertions.assertEquals(testUser.getAdmin(), ADMIN);
        Assertions.assertEquals(testUser.getGender(), GENDER);

    }

    @Test
    public void user_삭제테스트(){
        //given

        //when
        userRepository.save(user);

        userRepository.deleteAll();


        //then

        Exception exception = Assertions.assertThrows(JpaObjectRetrievalFailureException.class, () ->{
            User testUser = userRepository.getById(1);
        });

        String expectedMessage = "Unable to find";
        String actualMessage = exception.getMessage();

        Assertions.assertTrue(actualMessage.contains(expectedMessage));

    }

    @Test
    public void user_수정테스트(){
        //given

        //when
        userRepository.save(user);
        User testUser = userRepository.getById(1);

        testUser.setUserBirth("19901220");

        User testUser2 = userRepository.getById(1);
        //then

        Assertions.assertEquals(testUser2.getUserBirth(), "19901220");


    }

}
