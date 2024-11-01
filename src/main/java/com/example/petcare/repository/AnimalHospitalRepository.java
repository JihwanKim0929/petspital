package com.example.petcare.repository;

import com.example.petcare.entity.Comment;
import com.example.petcare.entity.AnimalHospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AnimalHospitalRepository extends JpaRepository<AnimalHospital, Long> {
    @Query(value="SELECT * FROM animal_hospital WHERE site_user_id = :siteUserId",nativeQuery = true)
    Optional<AnimalHospital> findBySiteUserId(Long siteUserId);

    @Query(value="SELECT * FROM animal_hospital WHERE hospital_address = :hospitalAddress",nativeQuery = true)
    Optional<AnimalHospital> findByHospitalAddress(String hospitalAddress);

}
