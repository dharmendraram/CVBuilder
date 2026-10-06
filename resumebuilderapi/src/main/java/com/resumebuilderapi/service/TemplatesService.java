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
        // step 1: get the current profile
        AuthResponse authResponse = authService.getProfile(principal);

        // step 2: get the available template based on subscription
        List<String> availableTemplates ;

        Boolean isPremium = PREMIUM.equalsIgnoreCase(authResponse.getSubscriptionPlan());
        if(isPremium){
            availableTemplates = List.of("01","02", "03");
        }
        else{
            availableTemplates = List.of("01");
        }
        // step 3: add to data into map
        Map<String, Object> restrictions = new HashMap<>();
        restrictions.put("availableTemplates", availableTemplates);
        restrictions.put("allTemplates", List.of("01","02","03"));
        restrictions.put("subscriptionPlan", authResponse.getSubscriptionPlan());
        restrictions.put("isPremium", isPremium);
        // step 4: return the result
        return restrictions;
    }
}
