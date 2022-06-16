//package com.example.springdatamongodbtutorial.jwt;
//
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import io.jsonwebtoken.impl.TextCodec;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//// https://lts0606.tistory.com/530 참고
//@Component
//public class JwtUtil {
////    @Value("${jwt.secret}")
//    private String key = "jwtsecretkey";
//
//    public String createToken(String userName) {
//
//        Claims claims = Jwts.claims();
//        claims.put("userName", userName);
//
//        return Jwts.builder()
//                .signWith(SignatureAlgorithm.HS256,
//                        TextCodec.BASE64.decode(key))
//                .setClaims(claims)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
//                .compact();
//    }
//
//    public boolean validateToken(String jwtToken) {
//        try {
//            Jws<Claims> claims = Jwts.parser().setSigningKey(key).parseClaimsJws(jwtToken);
//            return !claims.getBody().getExpiration().before(new Date());
//        } catch (Exception e) {
//            return false;
//        }
//    }
//
//    // Jwt Token에서 데이터를 전달 합니다.
//    public Claims getInformation(String token) {
//        Claims claims =Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
//        return claims;
//    }
//}
