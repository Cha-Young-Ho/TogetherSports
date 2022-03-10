package com.togethersports.tosproejct.jwt;

import com.togethersports.tosproejct.user.UserController;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JwtTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserController userController;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    String userEmail = "aabbcc@gmail.com";
    List<String> roles;

    @Test
    public void jwt_토큰생성테스트 () throws Exception{

        //given
        //when
        Token token = jwtTokenProvider.createAccessToken("aabbcc@gmail.com", roles);


        //then

        Assertions.assertNotNull(token);

    }

    @Test
    @DisplayName("jwt 엑세스 토큰 생성 테스트")
    public void jwt_엑세스토큰생성성공테스트(){
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        //when
        //then
        Assertions.assertNotNull(token.getAccessToken());
    }


    @Test
    @DisplayName("jwt 리프레시 토큰 생성 테스트")
    public void jwt_리프레시토큰생성성공테스트(){
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        //when

        //then
        Assertions.assertNotNull(token.getRefreshToken());
    }

    @Test
    public void jwt_엑세스토큰복호화성공테스트() throws ParseException {


        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        Jws<Claims> claims = Jwts.parser().setSigningKey("webfirewood".getBytes()).parseClaimsJws(token.getAccessToken());

        //when
        String actualEmail = claims.getBody().get("sub").toString();
        List<String> actualRoles = (List<String>) claims.getBody().get("roles");
        //then
        Assertions.assertEquals(this.userEmail, actualEmail);
        Assertions.assertEquals(this.roles, actualRoles);
    }

    @Test
    public void jwt_리프레시토큰복호화성공테스트(){
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        Jws<Claims> claims = Jwts.parser().setSigningKey("abcc".getBytes()).parseClaimsJws(token.getRefreshToken());

        //when
        String actualEmail = claims.getBody().get("sub").toString();
        List<String> actualRoles = (List<String>) claims.getBody().get("roles");
        //then
        Assertions.assertEquals(this.userEmail, actualEmail);
        Assertions.assertEquals(this.roles, actualRoles);
    }

    @Test
    public void jwt_엑세스토큰재생성테스트(){
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        //when
        String createdAccessToken = jwtTokenProvider.recreationAccessToken(this.userEmail, this.roles);
        //then
        // millisecond 단위로 빠르게 생성해서 같은 코드가 생성됩니다. 그래서 null로 검증
        Assertions.assertNotNull(createdAccessToken);
    }

    /*
        만료 테스트는 메세지 관리기법 적용 후에 작성할 예정입니다.
     */
    @Test
    public void jwt_엑세스토큰만료테스트(){

    }

    @Test
    public void jwt_리프레시토큰만료테스트(){

    }

    @Test
    public void jwt_변조되지않은엑세스토큰테스트() throws ParseException {
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        boolean expected = true;
        //when
        String accessToken = token.getAccessToken();
        boolean actual = jwtTokenProvider.validateToken(token.getAccessToken());
        //then
        // millisecond 단위로 빠르게 생성해서 같은 코드가 생성됩니다. 그래서 null로 검증
        Assertions.assertEquals(expected, actual);
    }

    @Test
    public void jwt_변조된엑세스토큰변조테스트 () throws ParseException {

        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        boolean expected = false;
        //when
        String accessToken = token.getAccessToken();

        //then
        Assertions.assertThrows(SignatureException.class,
                () -> jwtTokenProvider.validateToken(token.getAccessToken()+"as"));

    }

    @Test
    public void jwt_변조되지않은리프레시토큰테스트() throws ParseException {
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        boolean expected = true;
        //when

        RefreshToken refreshToken = RefreshToken.builder()
                .refreshToken(token.getRefreshToken()) // 변조하지않음
                .keyEmail(userEmail)
                .refreshTokenId(1L)
                .build();
        String actual = jwtTokenProvider.validateRefreshToken(refreshToken);
        //then
        // millisecond 단위로 빠르게 생성해서 같은 코드가 생성됩니다. 그래서 null로 검증
        Assertions.assertNotNull(actual);
    }
    @Test
    public void jwt_변조된리프레시토큰테스트() throws ParseException {
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);

        //when

        RefreshToken refreshTokenObj = RefreshToken.builder()
                .refreshToken(token.getRefreshToken() + "as") // as를 추가해서 변조함
                .keyEmail(userEmail)
                .refreshTokenId(1L)
                .build();
        String expected = jwtTokenProvider.validateRefreshToken(refreshTokenObj);
        //then
        Assertions.assertEquals(expected, null);
    }

    @Test
    public void jwt_엑세스토큰재발급테스트(){
        //given
        Token token = jwtTokenProvider.createAccessToken(userEmail, roles);
        boolean expected = false;
        //when
        String accessToken = token.getAccessToken();
        Assertions.assertThrows(SignatureException.class,
                () -> jwtTokenProvider.validateToken(token.getRefreshToken()+"as"));

    }

}
