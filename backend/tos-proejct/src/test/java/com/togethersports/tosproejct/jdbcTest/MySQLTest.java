
package com.togethersports.tosproejct.jdbcTest;

import java.sql.Connection;
import java.sql.DriverManager;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MySQLTest {

    private static final String DRIVER = "com.mysql.cj.jdbc.Driver";
    private static final String URL = "jdbc:mysql://localhost:3306/together_sports_db?serverTimezone=UTC&characterEncoding=UTF-8";
    private static final String USER = "admin1";
    private static final String PW = "1234";

    /*
    mysql 연동 테스트입니다.
     */
    @Test
    public void testConnection() throws Exception{
        //given
        Class.forName(DRIVER);

        //when
        String con = String.valueOf(DriverManager.getConnection(URL, USER, PW));

        //then
        Assertions.assertNotNull(con);

    }

    /*
    jpa create 테스트입니다.
     */
    @Test
    public void JPA테이블_생성_테스트(){
        //given

        //when

        //then
    }
}//MySQLConnectionTest_
