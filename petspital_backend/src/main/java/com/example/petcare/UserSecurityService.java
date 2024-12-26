package com.example.petcare;

import com.example.petcare.entity.SiteUser;
import com.example.petcare.repository.SiteUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class UserSecurityService implements UserDetailsService {
    @Autowired
    SiteUserRepository siteUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SiteUser user = siteUserRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException(username);
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        if(user.getRole().equals("VET")){
        authorities.add(new SimpleGrantedAuthority(UserRole.VET.getValue()));}
        else{
            authorities.add(new SimpleGrantedAuthority(UserRole.PETOWNER.getValue()));
        }
        log.info("loggined user : "+user.toString());
        return new User(user.getUsername(),user.getPassword(),authorities);
    }
}