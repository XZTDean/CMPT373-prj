package com.orcus.hha_report_manager.controller;

import com.orcus.hha_report_manager.security.SignedJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                           authRequest.getPassword()));
            var userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
            return new ResponseEntity<>(new AuthResponse(SignedJwt.make(userDetails), "tbd"), HttpStatus.OK);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

    }

    @ResponseStatus(code = HttpStatus.UNAUTHORIZED)
    public static class Unauthorized extends RuntimeException {
        public Unauthorized() {
            super();
        }
    }

    public static class AuthRequest {
        private String username;
        private String password;

        public AuthRequest(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    public static class AuthResponse {
        private final String jwt;
        private final String department;

        public String getJwt() {
            return jwt;
        }

        public String getDepartment() {
            return department;
        }

        public AuthResponse(String jwt, String department) {
            this.jwt = jwt;
            this.department = department;
        }
    }
}
