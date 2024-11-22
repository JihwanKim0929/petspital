import React from 'react';
import './DoctorMain.scss';
import { Link } from 'react-router-dom';
import { Card, Text, Box, VStack, Icon } from '@chakra-ui/react';
import Dashboard from '../../../../components/dashboard/Dashboard';
import { Button } from '../../../../components/ui/button';
import { FaUsers } from "react-icons/fa6";
import { FaNotesMedical } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";

const DoctorMain = () => {

  return (
    <div className="doctorMain">
      <Dashboard>
        <Card.Root height="250px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{ base: '20px', lg: '25px' }}>
                Petspital에 오신걸 환영합니다!
              </Text>
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root height="250px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack>
                <Icon fontSize="30px">
                  <FaNotesMedical />
                </Icon>
                <Text fontFamily='Pretendard Variable' fontSize={{ base: '16px', lg: '20px' }}>
                  반려동물 보유자들의 병원 예약 정보를 확인할 수 있어요.
                </Text>
                <Link to='./appointments'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    예약 정보 확인하기
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root height="250px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack>
                <Icon fontSize="30px">
                  <FaUsers />
                </Icon>
                <Text fontFamily='Pretendard Variable' fontSize={{ base: '16px', lg: '20px' }}>
                  커뮤니티 게시판을 둘러보세요.
                </Text>
                <Link to='./community'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    커뮤니티 게시판 둘러보기
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root height="250px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack>
                <Icon fontSize="30px">
                  <BiUserCircle />
                </Icon>
                <Text fontFamily='Pretendard Variable' fontSize={{ base: '16px', lg: '20px' }}>
                  프로필 설정을 확인할 수 있어요.
                </Text>
                <Link to='./profile'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    프로필 확인하기
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Card.Body>
        </Card.Root>
      </Dashboard>
    </div>
  )
}

export default DoctorMain