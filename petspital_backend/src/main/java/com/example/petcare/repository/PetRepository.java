package com.example.petcare.repository;

import com.example.petcare.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    @Query(value="SELECT * FROM pet WHERE site_user_id = :userId",nativeQuery = true)
    List<Pet> findByUserId(Long userId);
}
