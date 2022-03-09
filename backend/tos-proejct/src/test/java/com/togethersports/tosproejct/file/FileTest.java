package com.togethersports.tosproejct.file;

import com.togethersports.tosproejct.user.UserRepository;
import com.togethersports.tosproejct.userProfileImage.UserProfileImageRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

@Slf4j
@SpringBootTest
public class FileTest {

    @Autowired
    private UserProfileImageRepository userProfileImageRepository;

    @Autowired
    private UserRepository userRepository;

//    @Test
//    public void 파일조회_테스트() {
//
//        userProfileImageRepository.findByUserSequenceId(1);
//
//        log.info(" 결과 --> {}", userProfileImageRepository.findByUserSequenceId(1));
//
//    }

//    @Test
//    public void 닉네임조회_테스트() {
//
//        userRepository.findByUserNickname("동현킴");
//
//    }
}
