package com.togethersports.tosproejct;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TestController {



    @PostMapping("/test")
    public String test(){

        return "<h1>test 통과</h1>";
    }

}
