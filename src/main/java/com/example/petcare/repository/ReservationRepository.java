package com.example.petcare.repository;

import com.example.petcare.entity.Pet;
import com.example.petcare.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value="SELECT * FROM reservation WHERE pet_id = :petId",nativeQuery = true)
    List<Reservation> findByPetId(Long petId);
}
