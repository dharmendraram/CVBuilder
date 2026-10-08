package com.resumebuilderapi.service;

import com.resumebuilderapi.dto.AuthResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.resumebuilderapi.util.AppConstants.PREMIUM;

@Service
@RequiredArgsConstructor
@Slf4j
public class TemplatesService {

    private final AuthService authService;

    public Map<String, Object> getTemplates(@Nullable Object principal) {
        AuthResponse authResponse = authService.getProfile(principal);

        Boolean isPremium = PREMIUM.equalsIgnoreCase(authResponse.getSubscriptionPlan());
        
        // 01, 02, 03, 04 are FREE. 05 and 06 are PAID / PRO.
        List<String> availableTemplates;
        if (isPremium) {
            availableTemplates = List.of("01", "02", "03", "04", "05", "06");
        } else {
            availableTemplates = List.of("01", "02", "03", "04");
        }

        Map<String, Object> restrictions = new HashMap<>();
        restrictions.put("availableTemplates", availableTemplates);
        restrictions.put("allTemplates", List.of("01", "02", "03", "04", "05", "06"));
        restrictions.put("subscriptionPlan", authResponse.getSubscriptionPlan());
        restrictions.put("isPremium", isPremium);
        return restrictions;
    }
}
