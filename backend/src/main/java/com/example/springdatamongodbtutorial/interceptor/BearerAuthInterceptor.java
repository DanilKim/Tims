package com.example.springdatamongodbtutorial.interceptor;

import com.example.springdatamongodbtutorial.jwt.AuthorizationExtractor;
import com.example.springdatamongodbtutorial.jwt.JwtProvider;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class BearerAuthInterceptor implements HandlerInterceptor {
    private AuthorizationExtractor authExtractor;
    private JwtProvider jwtProvider;

    @Autowired
    public BearerAuthInterceptor(AuthorizationExtractor authExtractor, JwtProvider jwtProvider) {
        this.authExtractor = authExtractor;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) {
        System.out.println(">>> interceptor.preHandle 호출");
        String token = authExtractor.extract(request, "Bearer");
        if (!StringUtils.hasLength(token)) {
            return true;
        }

        if (!jwtProvider.validateToken(token)) {
            throw new IllegalArgumentException("유효하지 않은 토큰");
        }

        Claims claims = jwtProvider.parsingToken(token);
        request.setAttribute("userName", claims.get("userName"));
        return true;
    }
}
