package com.resumebuilderapi.document;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "resumes")
@EntityListeners(AuditingEntityListener.class)
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty("_id")
    private String id;

    private String userId;
    private String title;
    private String thumbnailLink;

    @Embedded
    @Builder.Default
    private Template template = new Template();

    @Embedded
    @Builder.Default
    private ProfileInfo profileInfo = new ProfileInfo();

    @Embedded
    @Builder.Default
    private ContactInfo contactInfo = new ContactInfo();

    @ElementCollection
    @Builder.Default
    private List<WorkExperience> workExperience = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<Education> education = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<Skill> skill = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<Project> project = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<Certification> certification = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<Language> language = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<String> interests = new ArrayList<>();

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @PostLoad
    public void initDefaults() {
        if (this.template == null) {
            this.template = Template.builder().colorPalette(new ArrayList<>()).build();
        } else if (this.template.getColorPalette() == null) {
            this.template.setColorPalette(new ArrayList<>());
        }
        if (this.profileInfo == null) {
            this.profileInfo = new ProfileInfo();
        }
        if (this.contactInfo == null) {
            this.contactInfo = new ContactInfo();
        }
        if (this.workExperience == null) {
            this.workExperience = new ArrayList<>();
        }
        if (this.education == null) {
            this.education = new ArrayList<>();
        }
        if (this.skill == null) {
            this.skill = new ArrayList<>();
        }
        if (this.project == null) {
            this.project = new ArrayList<>();
        }
        if (this.certification == null) {
            this.certification = new ArrayList<>();
        }
        if (this.language == null) {
            this.language = new ArrayList<>();
        }
        if (this.interests == null) {
            this.interests = new ArrayList<>();
        }
    }

    public ProfileInfo getProfileInfo() {
        if (this.profileInfo == null) {
            this.profileInfo = new ProfileInfo();
        }
        return this.profileInfo;
    }

    public ContactInfo getContactInfo() {
        if (this.contactInfo == null) {
            this.contactInfo = new ContactInfo();
        }
        return this.contactInfo;
    }

    public Template getTemplate() {
        if (this.template == null) {
            this.template = Template.builder().colorPalette(new ArrayList<>()).build();
        }
        return this.template;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Template {
        private String theme;
        @ElementCollection
        @Builder.Default
        private List<String> colorPalette = new ArrayList<>();
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ProfileInfo {
        private String profilePreviewUrl;
        private String fullName;
        private String designation;
        @Column(columnDefinition = "TEXT")
        private String summary;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ContactInfo {
        private String email;
        private String phone;
        private String location;
        private String linkedIn;
        private String github;
        private String website;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class WorkExperience {
        private String company;
        private String role;
        private String startDate;
        private String endDate;
        @Column(columnDefinition = "TEXT")
        private String description;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Education {
        private String degree;
        private String institute;
        private String startDate;
        private String endDate;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Skill {
        private String name;
        private Integer progress;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Project {
        private String title;
        @Column(columnDefinition = "TEXT")
        private String description;
        private String github;
        private String liveDemo;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Certification {
        private String title;
        private String issuer;
        private String year;
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Language {
        private String name;
        private Integer progress;
    }
}
