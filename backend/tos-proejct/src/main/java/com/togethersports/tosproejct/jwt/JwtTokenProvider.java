package com.togethersports.tosproejct.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

// 토큰을 생성하고 검증하는 클래스입니다.
// 해당 컴포넌트는 필터클래스에서 사전 검증을 거칩니다.
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenProvider {
    private String accessSecretKey = "webfirewood";
    private String refreshSecretKey = "abcc";


    // 토큰 유효시간 30분
    private long accessTokenValidTime = 5*1000L;//30 * 60 * 1000L; // 30 minutes
    private long refreshTokenValidTime = 7* 24 * 60 * 60 * 1000L; // 7 days

    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    // 객체 초기화, secretKey를 Base64로 인코딩한다.
    @PostConstruct
    protected void init() {

        accessSecretKey = Base64.getEncoder().encodeToString(accessSecretKey.getBytes());
        refreshSecretKey = Base64.getEncoder().encodeToString(refreshSecretKey.getBytes());
    }

    // JWT AccessToken 및 RefreshToken 생성
    public Token createAccessToken(String userEmail, List<String> roles) {

        Claims claims = Jwts.claims().setSubject(userEmail); // JWT payload 에 저장되는 정보단위
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();

        //Access Token
        String accessToken = Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + accessTokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, accessSecretKey)  // 사용할 암호화 알고리즘과
                // signature 에 들어갈 secret값 세팅
                .compact();

        //Refresh Token
        String refreshToken =  Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + refreshTokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, refreshSecretKey)  // 사용할 암호화 알고리즘과
                // signature 에 들어갈 secret값 세팅
                .compact();

        jwtService.login(RefreshToken.builder().token(refreshToken).keyEmail(userEmail).build());


        return Token.builder().accessToken(accessToken).refreshToken(refreshToken).key(userEmail).build();



    }

    // Access Token 재생성

    public String recreationAccessToken(String userEmail, List<String> roles){

        Claims claims = Jwts.claims().setSubject(userEmail); // JWT payload 에 저장되는 정보단위
        claims.put("roles", roles); // 정보는 key / value 쌍으로 저장된다.
        Date now = new Date();

        //Access Token
        String accessToken = Jwts.builder()
                .setClaims(claims) // 정보 저장
                .setIssuedAt(now) // 토큰 발행 시간 정보
                .setExpiration(new Date(now.getTime() + accessTokenValidTime)) // set Expire Time
                .signWith(SignatureAlgorithm.HS256, accessSecretKey)  // 사용할 암호화 알고리즘과
                // signature 에 들어갈 secret값 세팅
                .compact();

        return accessToken;
    }


    // JWT 토큰에서 인증 정보 조회, 실제 db에서 토큰 정보에 대한 정보를 가져온다. 그리고 userdetails에 대한 정보를 넘겨준다.
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
        log.info("토큰 인증 정보 조회");
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    // 토큰에서 회원 정보 추출
    public String getUserPk(String token) {

        return Jwts.parser().setSigningKey(accessSecretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // Request의 Header에서 token 값을 가져옵니다. "Authorization" : "TOKEN값'
    public String resolveToken(HttpServletRequest request) {

        log.info("토큰 값 가져오기 = {}", request.getHeader("Authorization"));
        return request.getHeader("Authorization");
    }

    // 토큰의 유효성 + 만료일자 확인, 이 부분에서 토큰에 대한 유효성 검증을 하게 된다.
    public boolean validateToken(String jwtToken) throws ParseException, JsonProcessingException {
        try {


            Jws<Claims> claims = Jwts.parser().setSigningKey(accessSecretKey).parseClaimsJws(jwtToken);
            log.info("claims의 get email = {}", claims.getBody().get("sub"));

            return !claims.getBody().getExpiration().before(new Date());
        } catch (Exception e) {

            // access 토큰 만료 시, 프론트에 재요청 과정이 필요할 수도 있음.
            // 현재 아래 구현 코드는 refresh validation check를 바로 하는 로직.

            String[] chunks = jwtToken.split("\\.");
            Base64.Decoder decoder = Base64.getUrlDecoder();
            String payload = new String(decoder.decode(chunks[1]));

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(payload);
            ObjectMapper objectMapper = new ObjectMapper();
            log.info("payload = {}", payload);

            String newAccessToken = validateRefreshToken((String) jsonObject.get("sub"), (List<String>) (List<String>)jsonObject.get("roles"));

            log.info("이전의 access 토큰 = {}", jwtToken);
            log.info("새로운 access 토큰 = {}", newAccessToken);

            // null일 경우에는 refresh 토큰도 만료, 재로그인 필요
            if(newAccessToken != null){
                return true;
            }
            log.info("refresh 토큰 만료되었음");
            return false;
        }
    }

    public String validateRefreshToken(String userEmail, List<String> roles){

        RefreshToken refreshTokenObj = jwtService.getRefreshToken(userEmail).get();
        String refreshToken = refreshTokenObj.getToken();
        Jws<Claims> claims = Jwts.parser().setSigningKey(refreshSecretKey).parseClaimsJws(refreshToken);

        //refresh 토큰의 만료시간이 지나지 않았을 경우, 새로운 access 토큰을 생성합니다.
        if(!claims.getBody().getExpiration().before(new Date())){
            return recreationAccessToken(userEmail, roles);
        }

        //refresh 토큰이 만료되었을 경우, 로그인이 필요합니다.

        return null;

    }



}
