package com.example.springdatamongodbtutorial.service;

import com.example.springdatamongodbtutorial.domain.Member;
import com.example.springdatamongodbtutorial.jwt.JwtUtil;
import com.example.springdatamongodbtutorial.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public MemberService(MemberRepository memberRepository, JwtUtil jwtUtil) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtUtil = jwtUtil;
    }

    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    public Member createMember(Member member) {
        // check if username exists
        Optional<Member> memberExist = memberRepository.findByUserName(member.getUserName());
        if (memberExist.isPresent()) {
            return null;
        }

        // check if email exits
        Optional<Member> emailExist = memberRepository.findByUserName(member.getUserName());
        if (emailExist.isPresent()) {
            return null;
        }

        // password encryption
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);

        memberRepository.save(member);
        return member;
    }

    public String loginMember(String email, String password) {
        Optional<Member> member = memberRepository.findByEmail(email);
        // check email exists
        if (member.isEmpty()) {
            return "login failed";
        }

        // check password
        boolean pwCorrect = passwordEncoder.matches(password, member.get().getPassword());
        if (!pwCorrect) {
            return "login failed";
        }

        String token = jwtUtil.createToken(member.get().getUserName());

        return token;
    }
}
