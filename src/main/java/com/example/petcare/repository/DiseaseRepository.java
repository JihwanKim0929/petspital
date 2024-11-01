package com.example.petcare.repository;

import com.example.petcare.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiseaseRepository extends JpaRepository<Disease,Long> {
}
