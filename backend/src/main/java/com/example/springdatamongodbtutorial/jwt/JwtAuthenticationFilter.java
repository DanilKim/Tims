//package com.example.springdatamongodbtutorial.jwt;
//
//import io.jsonwebtoken.ExpiredJwtException;
//import lombok.Builder;
//import org.springframework.http.HttpHeaders;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//    private final JwtUtil jwtUtil;
//
//    @Builder
//    private JwtAuthenticationFilter (JwtUtil jwtUtil) {
//        this.jwtUtil = jwtUtil;
//    }
//
//    public static JwtAuthenticationFilter of(JwtUtil jwtUtil) {
//        return JwtAuthenticationFilter.builder()
//                .jwtUtil(jwtUtil)
//                .build();
//    }
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//
//        try {
//            UserDto user = jwtTokenProvider.getUserDtoOf(authorizationHeader);
//            SecurityContextHolder.getContext().setAuthentication(new UsernamePasswordAuthenticationToken(
//                    user,
//                    "",
//                    user.getAuthorities()));
//
//            filterChain.doFilter(request, response);
//        } catch (ExpiredJwtException exception) {
//            logger.error("ExpiredJwtException", exception);
//        }
//    }
//}
