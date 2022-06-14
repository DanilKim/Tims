package com.example.springdatamongodbtutorial.controller;

import com.example.springdatamongodbtutorial.domain.Member;
import com.example.springdatamongodbtutorial.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("members")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("")
    public ResponseEntity<List<Member>> getMembers() {
        List<Member> memberList = memberService.getMembers();
        return ResponseEntity.status(HttpStatus.OK).body(memberList);
    }

    @PostMapping("create")
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        Member newMember = memberService.createMember(member);
        return ResponseEntity.status(HttpStatus.OK).body(newMember);
    }

    @PostMapping("login")
    public ResponseEntity<String> loginMember(@RequestBody Map<String, String> json) {
        String token = memberService.loginMember(json.get("email"), json.get("password"));
        if (token=="login failed") {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(token);
        }
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }
}
