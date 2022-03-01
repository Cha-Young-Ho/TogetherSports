package com.togethersports.tosproejct;

import com.togethersports.tosproejct.jwt.TestResponseMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class TestController {



    @GetMapping("/test")
    public ResponseEntity<TestResponseMessage> test(@RequestParam Map<String, String> map, HttpServletRequest request){

        //log.info("log -- str = {}", str);
        log.info("mail = {}", map.get("userEmail"));
       log.info("name = {}", map.get("userName"));
        log.info("provi = {}",map.get("provider"));

        log.info("request = {}", request.getHeader("Authorization"));

        log.info("test Controller 실행");

        String sign = "false";
        TestResponseMessage testResponseMessage = new TestResponseMessage(sign);
        return new ResponseEntity<TestResponseMessage>(testResponseMessage, HttpStatus.OK);
    }

    @GetMapping("/aa")
    public String aa(){
        log.info("get aa 실행");
        return "a";
    }

    @PostMapping("/aa")
    public String aa2(){
        log.info("post aa 실행");
        return "a2";
    }

}
