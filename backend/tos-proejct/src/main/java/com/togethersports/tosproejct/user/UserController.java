package com.togethersports.tosproejct.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/test")
    public String mappingTest2() {

        return "테스트 성공";
    }

    @PostMapping("/test")
    public String mappingTest(@RequestBody Map<String, String> param) {

        System.out.println("param = " + param);

        return "테스트 성공";
    }

    @PostMapping("/Oauth")
    public String userCheckOauthEmail(@RequestBody UserDTO userDTO) {

        String userEmail = userDTO.getUserEmail();
        String userName = userDTO.getUserName();
        String provider = userDTO.getProvider();

        System.out.println("userEmail = " + userEmail);
        System.out.println("userName = " + userName);
        System.out.println("provider = " + provider);

        Optional<User> user = userService.getUserFindByEmail(userEmail);

        if(user.isEmpty()) {

        } else {

        }


        System.out.println("user = " + user);
        System.out.println("user = " + user.toString());

        return "test success";
    }

    /*@PostMapping("/Oauth")
    public String userCheckOauthEmail(@RequestBody User user) {

        Optional<User> userParam = Optional.ofNullable(user);




        return "test success";
    }*/
}
