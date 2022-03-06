package com.togethersports.tosproejct.userCrudTest;


import com.togethersports.tosproejct.user.*;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.test.annotation.Commit;
import org.springframework.util.Assert;

import javax.persistence.EntityNotFoundException;

/*
    JPA연동 테스트 클래스 파일입니다.
    각자 1개씩 돌려야 합니다.
 */
@Slf4j
@DataJpaTest // 해당 어노테이션은 실제 데이터베이스를 사용하지 않고, in memory jpa 공간에서 db 테스트를 지원해주는 어노테이션입니다.
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Commit
public class JpaTest {

    @Autowired
    private UserRepository userRepository;

    final String USEREMAIL = "test@gmail.com";
    final String USERNAME = "이병건";
    final String USERNICKNAME = "침착맨";
    final String USERSTATE = "정상회원";
    final int MANNERPOINT = 0;
    final Double LOCATIONX = 1111.11;
    final Double LOCATIONY = 2222.22;
    final Gender GENDER = Gender.MALE;
    final Admin ADMIN = Admin.ROLE_ADMIN;
    final Provider PROVIDER = Provider.KAKAO;

    final String BLINK = "";

    User user = User.builder()
            .userEmail(USEREMAIL)
            .userName(USERNAME)
            .userNickname(USERNICKNAME)
            .userBirthYear(BLINK)
            .userBirthMonth(BLINK)
            .userBirthDay(BLINK)
            .userState(USERSTATE)
            .mannerPoint(MANNERPOINT)
            .locationX(LOCATIONX)
            .locationY(LOCATIONY)
            .gender(GENDER)
            .admin(ADMIN)
            .provider(PROVIDER)
            .build();


    @Test
    public void user_저장_테스트(){

        //given
        //when
        final User testUser = userRepository.save(user);

        //then
        Assertions.assertEquals(testUser.getUserEmail(), USEREMAIL);
        Assertions.assertEquals(testUser.getUsername(), USERNAME);
        Assertions.assertEquals(testUser.getUserNickname(), USERNICKNAME);
        Assertions.assertEquals(testUser.getUserBirthYear(), BLINK);
        Assertions.assertEquals(testUser.getUserBirthMonth(), BLINK);
        Assertions.assertEquals(testUser.getUserBirthDay(), BLINK);
        Assertions.assertEquals(testUser.getUserState(), USERSTATE);
        Assertions.assertEquals(testUser.getMannerPoint(), MANNERPOINT);
        Assertions.assertEquals(testUser.getLocationX(), LOCATIONX);
        Assertions.assertEquals(testUser.getLocationY(), LOCATIONY);
        Assertions.assertEquals(testUser.getGender(), GENDER);
        Assertions.assertEquals(testUser.getAdmin(), ADMIN);
        Assertions.assertEquals(testUser.getProvider(), PROVIDER);

    }

    @Test
    public void user_조회테스트(){
        //given

        //when
        userRepository.save(user);
        User testUser = userRepository.getById(1);


        //then
        Assertions.assertEquals(testUser.getUserEmail(), USEREMAIL);
        Assertions.assertEquals(testUser.getUsername(), USERNAME);
        Assertions.assertEquals(testUser.getUserNickname(), USERNICKNAME);
        //Assertions.assertEquals(testUser.getUserBirth(), USERBIRTH);
        Assertions.assertEquals(testUser.getUserState(), USERSTATE);
        Assertions.assertEquals(testUser.getMannerPoint(), MANNERPOINT);
        Assertions.assertEquals(testUser.getLocationX(), LOCATIONX);
        Assertions.assertEquals(testUser.getLocationY(), LOCATIONY);
        Assertions.assertEquals(testUser.getGender(), GENDER);
        Assertions.assertEquals(testUser.getAdmin(), ADMIN);
        Assertions.assertEquals(testUser.getProvider(), PROVIDER);

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

        //testUser.setUserBirth("19901220");

        User testUser2 = userRepository.getById(1);
        //then

        //Assertions.assertEquals(testUser2.getUserBirth(), "19901220");


    }

}
