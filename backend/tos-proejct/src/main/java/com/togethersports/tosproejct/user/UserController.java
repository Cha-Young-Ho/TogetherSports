package com.togethersports.tosproejct.user;

import com.togethersports.tosproejct.common.code.CommonCode;
import com.togethersports.tosproejct.common.dto.Response;
import com.togethersports.tosproejct.security.annotation.CurrentUser;
import com.togethersports.tosproejct.user.dto.UserOfModifyInfo;
import com.togethersports.tosproejct.user.dto.UserOfMyInfo;
import com.togethersports.tosproejct.user.dto.UserOfOtherInfo;
import com.togethersports.tosproejct.user.exception.NicknameDuplicationException;
import lombok.RequiredArgsConstructor;
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

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

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
    //내 정보 수정
    @PostMapping("/api/user")
    public ResponseEntity<Response> modifyMyInfo(@CurrentUser User user,
                                                 @RequestBody @Validated UserOfModifyInfo userOfOtherInfo){

        userService.modifyMyInfo(user.getId(), userOfOtherInfo);
        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, userOfOtherInfo));
    }
    //내 정보 조회
    @GetMapping("/api/user")
    public ResponseEntity<Response> getMyInfo(@CurrentUser User user){
        UserOfMyInfo myInfo = userService.getMyInfo(user.getId());

        return ResponseEntity.ok(Response.of(CommonCode.GOOD_REQUEST, myInfo));
    }

}
