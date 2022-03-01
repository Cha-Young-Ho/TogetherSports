package com.togethersports.tosproejct.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping
public class UserController {

    private final UserService userService;

    @PostMapping("/user")
    public Map<String, String> userSignup(@RequestBody UserDTO userDTO) {

        Map<String, String> map = new HashMap<>();

        map.put("userSignup", "true");

        // 잘못된 인수가 메서드에 요청될 경우 exception 발생
        /*Optional.of(userService.userSignup(userDTO)).orElseThrow(
                () -> new IllegalArgumentException("부적절한 파라미터가 요청되었습니다. -> "));*/

        log.info("userDTO -------------------> " + userDTO);

        try {
            userService.userSignup(userDTO);
        } catch (IllegalArgumentException e) {
            e.getMessage();
            map.put("userSignup", "false");
        }

        return map;
    }

    @GetMapping("/user/check")
    public Map<String, String> userCheck(@RequestBody UserDTO userDTO) {

        Map<String, String> map = new HashMap<>();

        try {
            Optional<User> user = userService.getUserFindByEmail(userDTO.getUserEmail());

            // 회원 조회에 성공했을 경우. (데이터가 있을 경우)
            if (user.isPresent()) {
                map.put("userCheck", "true");
            } else {
                map.put("userCheck", "false");
            }
        } catch (NoSuchElementException e) {
            log.info("요청 데이터의 값이 없습니다. -> " + e.getMessage());
        } catch (IllegalArgumentException e) {
            log.info("잘못된 파라미터 요청 입니다. -> " + e.getMessage());
        }

        return map;
    }
}