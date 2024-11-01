package com.example.petcare.repository;

import com.example.petcare.entity.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteUserRepository extends JpaRepository<SiteUser, Long> {
    SiteUser findByUsername(String username);
}
