package com.togethersports.tosproejct.account;

import com.togethersports.tosproejct.account.dto.UserOfInitInfo;
import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.annotation.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 * <h1>UserController</h1>
 * <p>
 * 사용자 계정과 관련된 CRUD 수행
 * </p>
 *
 * @author seunjeon
 */
@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    // 계정 최초 로그인 시 추가정보 입력 처리
    @PostMapping("/api/user")
    public ResponseEntity<Response<?>> updateUserInfo(@CurrentUser User user,
                                                      @RequestBody @Validated UserOfInitInfo userOfInfoUpdate) {
        userService.initUserInfo(user.getId(), userOfInfoUpdate);
        return ResponseEntity.ok().body(Response.of(CommonCode.GOOD_REQUEST, null));
    }
}
