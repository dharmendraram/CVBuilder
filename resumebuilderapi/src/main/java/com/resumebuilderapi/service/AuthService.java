package com.resumebuilderapi.service;

import com.resumebuilderapi.document.User;
import com.resumebuilderapi.dto.AuthResponse;
import com.resumebuilderapi.dto.LoginRequest;
import com.resumebuilderapi.dto.RegisterRequest;
import com.resumebuilderapi.exception.ResourceExistsException;
import com.resumebuilderapi.repository.UserRepository;
import com.resumebuilderapi.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Value("${app.base.url:http://localhost:8080}")
    private String appBaseUrl;

    public AuthResponse register(RegisterRequest request) {
        log.info("Inside AuthService: register() {}", request);
        if(userRepository.existsByEmail(request.getEmail())){
            throw new ResourceExistsException("Email already exists");
        }
        User newUser = toDocument(request);
        userRepository.save(newUser);

        //TODO: Send verification email
        sendVerificationEmail(newUser);

        return toResponse(newUser, null);
    }

    private void sendVerificationEmail(User newUser) {
        log.info("Sending verification email to: {}", newUser.getEmail());
        try {
            String link = appBaseUrl + "/api/auth/verify-email?token="+newUser.getVerificationToken();
            String htmlContent = "<h3>Hello "+newUser.getName()+",</h3>" +
                    "<p>Thank you for registering with us. Please click on the link below to verify your email address:</p>" +
                    "<a href='"+link+"' style='background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;'  target='_blank'>Verify Email</a>" +
                    "<p>Or copy this link: "+link+" </p>"+
                    "<p>This link will expire in 24 hours.</p>" +
                    "<p>If you did not create an account, please ignore this email.</p>";
            emailService.sendHtmlEmail(newUser.getEmail(), "Verify your email address", htmlContent);

        } catch (Exception e){
            log.error("Failed to send verification email to: {}", newUser.getEmail(), e);
            throw new RuntimeException("Failed to send verification email:" + e.getMessage());
        }
    }

    private AuthResponse toResponse(User newUser, String token){
        return AuthResponse.builder()
                .id(newUser.getId())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .profileImageUrl(newUser.getProfileImageUrl())
                .emailVerified(newUser.isEmailVerified())
                .subscriptionPlan(newUser.getSubscriptionPlan())
                .token(token)
                .createdAt(newUser.getCreatedAt())
                .updatedAt(newUser.getUpdatedAt())
                .build();
    }

    private User toDocument(RegisterRequest request){
       return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .profileImageUrl(request.getProfileImageUrl())
                .subscriptionPlan("Basic")
                .emailVerified(false)
                .verificationToken(UUID.randomUUID().toString())
                .verificationExpires(LocalDateTime.now().plusHours(24))
                .build();
    }
    public void verifyEmail(String token){
        log.info("Verifying email for token: {}", token);
        User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid verification token"));
        if (user.getVerificationExpires() != null && user.getVerificationExpires().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Verification token has expired");
        }
        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setVerificationExpires(null);
        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest request){
        log.info("Inside AuthService: login() {}", request);
        User existingUser = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new UsernameNotFoundException("User not found with email: " + request.getEmail()));

        if(!passwordEncoder.matches(request.getPassword(), existingUser.getPassword())){
            throw new UsernameNotFoundException("Invalid password for email: " + request.getEmail());
        }
        if(!existingUser.isEmailVerified()){
            throw new RuntimeException("Please verify your email address before logging in");
        }
        String token = jwtUtil.generateToken(existingUser.getId());
        return toResponse(existingUser, token);
    }

    public void resendVerification(String email) {
        log.info("Inside AuthService: resendVerification() {}", email);
        // step 1: Fetch the user account by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        // step 2: Check the email verified
        if (user.isEmailVerified()) {
            throw new RuntimeException("Email already verified");
        }
        // step 3: Set the new verification token and exp time
        user.setVerificationToken(UUID.randomUUID().toString());
        user.setVerificationExpires(LocalDateTime.now().plusHours(24));
        // step 4: Update the user
        userRepository.save(user);
        // step 5: Resend the verification email
        sendVerificationEmail(user);
    }

    public AuthResponse getProfile(Object principalObject) {
        User currentUser = (User) principalObject;
        return toResponse(currentUser, null);
    }
}
