# petspital
<img src="https://github.com/user-attachments/assets/dc294e23-7b8b-4edd-8341-f69cd8ee6afc">
반려동물 안구/피부질환 진단 및 동물병원 예약 웹사이트 프로젝트

# 프로젝트 기간
24.09.02 ~ 24.11.25

# 팀원소개
|김영훈|문기태|김지환|문준범|
|----|----|----|----|
|AI|FrontEnd|BackEnd|BackEnd|

&nbsp;

# 프로젝트 소개
## 일반유저
-각 유저들은 자신의 반려묘/반려견을 등록할 수 있고, 피부,안구 질환에 대한 진단을 진행할 수 있습니다.

-반려동물 수첩및 커뮤니티 게시글을 작성할 수 있습니다.

-주위의 동물병원(petspital에 가입한 동물병원)에 예약을 진행할 수 있습니다.

-진단, 예약 기록을 확인할 수 있습니다.

## 수의사
-소유한 동물병원에 대한 일반유저들의 예약 현황, 예약한 동물에 대한 진단기록, 수첩기록을 확인할 수 있습니다.

# 시스템 구성도
<img src="https://github.com/user-attachments/assets/f28f2fb2-e5dc-4a96-8183-9c26fcc46d4b">

&nbsp;
# 백엔드 공통구현 사항
-DB 테이블 속성 설계

-API 명세 노션 페이지 작성 (각자 작성한 API에 관하여 명세)

# 개인 기여 사항
## 활용 기술 스택
![Generic badge](https://img.shields.io/badge/jdk-17-orange.svg)

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">

<img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white">

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)  

<img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">

<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white">

<img src="https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white">

![Generic badge](https://img.shields.io/badge/h2-1.4.200-blue.svg)

(AWS RDS) <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">

![JPA](https://img.shields.io/badge/JPA-hibernate-orange)

- 유저, 애완동물, 질병, 진단, 예약, 수첩, 게시글, 댓글, 동물병원 엔티티 구현 및 테이블 생성(Spring Data JPA를 활용)

- 각 엔티티 Create, Read, Delete 관련 service, controller, dto, repository 메소드 작성

- Spring Security를 활용하여 유저 로그인 구현, 일반유저와 수의사 구분

- 진단기능을 위한 AI모델 서빙을 위해 RestTemplate을 활용한 Post요청 구현 및 FastApi코드 작성
  
- AWS s3를 이미지 저장소로 활용하도록 구현, 개발 단계에서는 인메모리방식 h2 DB사용, 이후 배포 단계에서는 AWS rds mysql로 DB 변경

- AWS ec2 ubuntu 인스턴스를 생성하여 프론트엔드,백엔드,AI서버 배포 및 nginx를 활용한 https와 도메인 적용(petspital.shop)
