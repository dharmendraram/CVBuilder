package com.resumebuilderapi.controller;

import com.resumebuilderapi.dto.AuthResponse;
import com.resumebuilderapi.dto.LoginRequest;
import com.resumebuilderapi.dto.RegisterRequest;
import com.resumebuilderapi.service.AuthService;
import com.resumebuilderapi.service.FileUploadService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

import static com.resumebuilderapi.util.AppConstants.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping(AUTH_CONTROLLER)
public class AuthController {

    private final AuthService authService;
    private final FileUploadService fileUploadService;

    @PostMapping(REGISTER)
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request){
        log.info("Received registration request for user: {}", request);
        AuthResponse response = authService.register(request);
        log.info("User registered successfully: {}", response);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping(VERIFY_EMAIL)
    public ResponseEntity<?> verifyEmail(@RequestParam String token){
        log.info("Received email verification request for token: {}", token);
        authService.verifyEmail(token);
        log.info("Email verified successfully for token: {}", token);
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("message", "Email verified successfully"));
    }

    @PostMapping(UPLOAD_PROFILE)
    public ResponseEntity<?> uploadImage(@RequestParam("image")MultipartFile file) throws IOException {
        log.info("Received image upload request for file: {}", file.getOriginalFilename());
        Map<String, String> response =  fileUploadService.uploadSingleImage(file);
        return ResponseEntity.ok(response);
    }

    @PostMapping(LOGIN)
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping(RESEND_VERIFICATION)
    public ResponseEntity<?> resendVerificationCode(@RequestBody Map<String, String> body){
        // step 1: Get the email from request
        String email = body.get("email");

        // step 2: add the validation
        if (Objects.isNull(email)){
           return ResponseEntity.badRequest().body(Map.of("message", "Email address is missing"));
        }
        // step 3: call the service method  to send or resend the verification link
        authService.resendVerification(email);

        // step 4: Return the response
        return ResponseEntity.ok(Map.of("success", true, "message", "Verification code has been sent"));
    }

    @GetMapping(PROFILE)
    public ResponseEntity<?> getProfile(Authentication authentication){
        // step 1: get the principal object
        Object principalObject = authentication.getPrincipal();
        // step 2: call the service method
        AuthResponse currentProfile = authService.getProfile(principalObject);
        // step 3: return the response
        return ResponseEntity.ok(currentProfile);
    }

}
