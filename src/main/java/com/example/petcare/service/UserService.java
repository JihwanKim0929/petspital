package com.example.petcare.service;

import com.example.petcare.S3Service;
import com.example.petcare.dto.AnimalHospitalDto;
import com.example.petcare.dto.PetDto;
import com.example.petcare.dto.SiteUserDto;
import com.example.petcare.entity.*;
import com.example.petcare.repository.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private SiteUserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private PetService petService;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private BoardService boardService;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private CommentService commentService;
    @Autowired
    private AnimalHospitalService animalHospitalService;
    @Autowired
    private AnimalHospitalRepository animalHospitalRepository;
    @Autowired
    private S3Service s3Service;

    public SiteUserDto createUser(MultipartFile image, SiteUserDto userDto) throws IOException {
        if(!image.isEmpty()){
            String fileName = s3Service.uploadFile(image);
            userDto.setImage_url(fileName);
        }

        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        SiteUser created = userRepository.save(userDto.get_SiteUser());
        return created.get_SiteUserDto();
    }

    public SiteUserDto get_user_by_username(String username){
        SiteUser user = userRepository.findByUsername(username);
        return user!=null? user.get_SiteUserDto() : null;
    }

    public SiteUserDto deleteUser(Long id) {
        SiteUser target = userRepository.findById(id).orElse(null);
        if(target != null){
//            s3Service.deleteFile(target.getImage_url());
            List<Pet> pets = petRepository.findByUserId(id);
            for(Pet pet : pets){
                petService.deletePet(pet.getId());
            }

            List<Board> boards = boardRepository.findByAuthorId(id);
            for(Board board : boards){
                boardService.deleteBoard(board.getId());
            }

            List<Comment> comments = commentRepository.findByAuthorId(id);
            for(Comment comment : comments){
                commentService.deleteComment(comment.getId());
            }

            if(target.getRole().equals("VET")){
                AnimalHospitalDto animalHospitalDto = animalHospitalService.getAnimalHospitalByUserId(target.getId());
                if(animalHospitalDto!=null){
                    AnimalHospital animalHospital = animalHospitalDto.getAnimalHospital();
                    animalHospitalRepository.delete(animalHospital);
                }
            }

            SiteUserDto dto =target.get_SiteUserDto();
            userRepository.delete(target);
            return dto;
        }
        else
            return null;
    }

    public SiteUserDto updateUser(Long id, SiteUserDto newUserDto) throws IOException {   //유저 수정
        SiteUser target = userRepository.findById(id).orElse(null);//기존user
        if(target != null){
            BeanUtils.copyProperties(newUserDto, target, "id","image_url");
            userRepository.save(target);
        }
        return target.get_SiteUserDto();
    }

}
