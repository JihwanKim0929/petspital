package com.example.petcare;

import lombok.Getter;

@Getter
public enum UserRole {
    PETOWNER("ROLE_PETOWNER"),
    VET("ROLE_VET");

    UserRole(String value){
        this.value = value;
    }

    private String value;
}
