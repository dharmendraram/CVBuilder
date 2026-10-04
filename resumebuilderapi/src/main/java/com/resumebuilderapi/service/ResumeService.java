package com.resumebuilderapi.service;

import com.resumebuilderapi.document.Resume;
import com.resumebuilderapi.dto.AuthResponse;
import com.resumebuilderapi.dto.CreateResumeRequest;
import com.resumebuilderapi.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final AuthService authService;

    public Resume createResume(CreateResumeRequest request, Object principalObject) {
        // step 1: create resume object
        Resume newResume = new Resume();

        // step 2: get the current profile
        AuthResponse response = authService.getProfile(principalObject);

        // step 3: update the resume object
        newResume.setUserId(response.getId());
        newResume.setTitle(request.getTitle());

        // step 4: default data from the resume
        setDefaultResumeDate(newResume);

        // step 5: save the data
        return resumeRepository.save(newResume);
    }

    private void setDefaultResumeDate(Resume newResume) {
        newResume.setTemplate(Resume.Template.builder().colorPalette(new ArrayList<>()).build());
        newResume.setProfileInfo(new Resume.ProfileInfo());
        newResume.setContactInfo(new Resume.ContactInfo());
        newResume.setWorkExperience(new ArrayList<>());
        newResume.setEducation(new ArrayList<>());
        newResume.setSkill(new ArrayList<>());
        newResume.setProject(new ArrayList<>());
        newResume.setCertification(new ArrayList<>());
        newResume.setLanguage(new ArrayList<>());
        newResume.setInterests(new ArrayList<>());
    }

    public List<Resume> getUserResume(@Nullable Object principal) {
        // step 1: get the current profile
        AuthResponse response = authService.getProfile(principal);
        // step 2: call the repo method
        List<Resume> resumeList = resumeRepository.findByUserIdOrderByUpdatedAtDesc(response.getId());
        // step 3: return the response
        return resumeList;
    }

    public Resume getResumeById(String resumeId, Object principal) {
        // step 1: get the current profile
        AuthResponse response = authService.getProfile(principal);
        // step 2: call the repo method
        Resume existingUser = resumeRepository.findByUserIdAndId(response.getId(), resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        // step 3: return the result
        return existingUser;
    }

    public Resume updateResume(String resumeId, Resume updatedData, Object principal) {
        // step 1: get the current profile
        AuthResponse response = authService.getProfile(principal);
        // step 2: call the repo method
        Resume exitingResume = resumeRepository.findByUserIdAndId(response.getId(), resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        // step 3: update the newData
        exitingResume.setTitle(updatedData.getTitle());
        exitingResume.setThumbnailLink(updatedData.getThumbnailLink());
        exitingResume.setTemplate(updatedData.getTemplate());
        exitingResume.setProfileInfo(updatedData.getProfileInfo());
        exitingResume.setContactInfo(updatedData.getContactInfo());
        exitingResume.setWorkExperience(updatedData.getWorkExperience());
        exitingResume.setEducation(updatedData.getEducation());
        exitingResume.setSkill(updatedData.getSkill());
        exitingResume.setProject(updatedData.getProject());
        exitingResume.setCertification(updatedData.getCertification());
        exitingResume.setLanguage(updatedData.getLanguage());
        exitingResume.setInterests(updatedData.getInterests());
        // step 4: save the details
        resumeRepository.save(exitingResume);
        // step 5: return the data
        return exitingResume;
    }

    public void deleteResume(String resumeId, @Nullable Object principal) {
        //step 1: get the current profile
        AuthResponse response = authService.getProfile(principal);
        // step 2 : call the finder respo method
        Resume existingResume = resumeRepository.findByUserIdAndId(response.getId(), resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        resumeRepository.delete(existingResume);

    }
}
