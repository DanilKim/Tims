package com.example.springdatamongodbtutorial.repository;

import com.example.springdatamongodbtutorial.domain.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends MongoRepository<Member, String> {
    public Member save(Member member);
    public Optional<Member> findByUserName(String userName);
    public Optional<Member> findByEmail(String email);
}
