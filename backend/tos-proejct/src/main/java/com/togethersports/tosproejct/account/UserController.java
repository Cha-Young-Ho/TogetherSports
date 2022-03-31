package com.togethersports.tosproejct.account;

import com.togethersports.tosproejct.account.code.UserCode;
import com.togethersports.tosproejct.account.dto.UserOfInitInfo;
import com.togethersports.tosproejct.account.dto.UserOfModifyInfo;
import com.togethersports.tosproejct.account.dto.UserOfMyInfo;
import com.togethersports.tosproejct.account.dto.UserOfOtherInfo;
import com.togethersports.tosproejct.account.exception.NicknameDuplicationException;
import com.togethersports.tosproejct.area.ActiveArea;
import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.interest.Interest;
import com.togethersports.tosproejct.security.annotation.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * <h1>UserController</h1>
 * <p>
 * 사용자 계정과 관련된 CRUD 수행
 * </p>
 *
 * @author seunjeon
 * @author younghoCha
 */
@Slf4j
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

    // 닉네임 중복확인
    @GetMapping("/api/duplication")
    public ResponseEntity<Response> nicknameDuplicationCheck(@RequestParam String nickname){

        if(userService.nicknameDuplicationCheck(nickname)){
            // 존재하지 않을 경우
            return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, null));
        }

        //존재할 경우
        throw new NicknameDuplicationException("닉네임이 중복되었습니다.");
    }

    @GetMapping("/api/user/{id}")
    public ResponseEntity<Response> otherInfo(@PathVariable Long id){
        UserOfOtherInfo userOfOtherInfo = userService.getOtherInfo(id);

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, userOfOtherInfo));

    }

    @PutMapping("/api/user")
    public ResponseEntity<Response> modifyMyInfo(@CurrentUser User user,
                                                 @RequestBody @Validated UserOfModifyInfo userOfOtherInfo){

        userService.modifyMyInfo(user.getId(), userOfOtherInfo);
        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, userOfOtherInfo));
    }

    @GetMapping("/api/user")
    public ResponseEntity<Response> getMyInfo(@CurrentUser User user){
        UserOfMyInfo myinfo = userService.getMyInfo(user.getId());

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, myinfo));
    }
}
