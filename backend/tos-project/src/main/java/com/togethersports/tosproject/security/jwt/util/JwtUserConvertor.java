package com.togethersports.tosproject.security.jwt.util;

import com.togethersports.tosproject.security.Role;
import com.togethersports.tosproject.user.User;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.util.function.Function;

/**
 * <h1>JwtUserConvertor</h1>
 * <p>
 *     JWT 페이로드 정보를 사용자 객체로 변환하는데 사용하는 클래스
 * </p>
 * <p>
 *     페이로드의 담긴 정보 중 id, email, role 정보를 바탕으로 User 엔티티로 변환
 * </p>
 * @author seunjeon
 */
@Component
public class JwtUserConvertor implements Function<Claims, User> {

    @Override
    public User apply(Claims claims) {
        long id = Long.parseLong(claims.getSubject());

        String email = (String) claims.get("email");

        Role role = Role.valueOf((String) claims.get("role"));

        return User.convertUser(id, email, role);
    }
}
