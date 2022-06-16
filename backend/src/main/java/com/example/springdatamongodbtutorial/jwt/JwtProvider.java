package com.example.springdatamongodbtutorial.jwt;

import com.example.springdatamongodbtutorial.domain.Member;
import io.jsonwebtoken.*;

import java.time.Duration;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

// 참고: https://ocblog.tistory.com/56
@RequiredArgsConstructor
@Component
public class JwtProvider {

    @Value("${jwt.secretkey}")
    private String jwtSecretKey;

    public String createToken(Member member) {
        Date now = new Date();

        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis()))
                .claim("userName", member.getUserName())
                .claim("email", member.getEmail())
                .signWith(SignatureAlgorithm.HS256, jwtSecretKey)
                .compact();
    }

//    public UserDto getUserDtoOf(String authorizationHeader) {
//        validationAuthorizationHeader(authorizationHeader);
//
//        String token = extractToken(authorizationHeader);
//        Claims claims = parsingToken(token);
//
//        return new UserDto(claims);
//    }

    public Claims parsingToken(String token) {
        return Jwts.parser()
                .setSigningKey(jwtSecretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public void validationAuthorizationHeader(String header) {
        if (header == null || !header.startsWith("Bearer")) {
            throw new IllegalArgumentException();
        }
    }

    public String extractToken(String authorizationHeader) {
        return authorizationHeader.substring("Bearer".length());
    }

    public boolean validateToken(String token) {
        try {
            Claims claims = parsingToken(token);
            if (claims.getExpiration().before(new Date())) {
                return false;
            }
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

}