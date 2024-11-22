import React from 'react';
import './PetOwnerMain.scss';
import { Link } from 'react-router-dom';
import { Card, Text, Box, VStack, Separator, Icon } from '@chakra-ui/react';
import Dashboard from '../../../../components/dashboard/Dashboard';
import { Button } from '../../../../components/ui/button';
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidReport } from "react-icons/bi";
import { FaRegHospital } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { FaNotesMedical } from "react-icons/fa6";

const PetOwnerMain = () => {

  return (
    <div className="petOwnerMain">
      <Dashboard>
        <Card.Root height="400px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack w='100%'>
                <Text fontFamily='Pretendard Variable' fontWeight='600' fontSize={{ base: '20px', lg: '24px' }}>
                  Petspital에 오신걸 환영합니다!
                </Text>
                <Box m={4} />
                <Icon fontSize="30px" color='gray.700'>
                  <MdOutlinePets />
                </Icon>
                <Text fontFamily='Pretendard Variable'>반려동물을 먼저 등록하고 AI를 통한 진단을 받아보세요!</Text>
                <Link to='./pets'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    반려동물 등록하러 가기
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root height="400px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack w='100%'>
                <Icon fontSize="30px" color='gray.700'>
                  <BiSearchAlt2 />
                </Icon>
                <Text fontFamily='Pretendard Variable'>반려동물을 등록하셨으면 AI를 통해 피부와 눈 건강을 진단해보세요.</Text>
                <Link to='./diagnosis'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    진단하러 가기
                  </Button>
                </Link>
                <Separator m={6} />
                <Icon fontSize="30px">
                  <BiSolidReport />
                </Icon>
                <Text fontFamily='Pretendard Variable'>AI를 통한 진단 기록을 확인할 수 있어요.</Text>
                <Link to='./records'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    진단 기록 확인하기
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root height="400px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack w='100%'>
                <Icon fontSize="30px" color='gray.700'>
                  <FaRegHospital />
                </Icon>
                <Text fontFamily='Pretendard Variable'>근처의 병원에 예약할 수 있어요.</Text>
                <Link to='./hospital'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    병원 예약하러 가기
                  </Button>
                </Link>
                <Separator m={6} />
                <Icon fontSize="30px" color='gray.700'>
                  <FaNotesMedical />
                </Icon>
                <Text fontFamily='Pretendard Variable'>병원의 예약 기록을 확인할 수 있어요.</Text>
                <Link to='./appointments'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    예약 기록 확인하기
                  </Button>
                </Link>
              </VStack>
            </Box>
          </Card.Body>
        </Card.Root>
        <Card.Root height="400px">
          <Card.Body>
            <Box w='100%' h='100%' display='flex' alignItems='center' justifyContent='center'>
              <VStack w='100%'>
                <Icon fontSize="30px" color='gray.700'>
                  <FaUsers />
                </Icon>
                <Text fontFamily='Pretendard Variable'>커뮤니티 게시판을 둘러보세요.</Text>
                <Link to='./community'>
                  <Button fontFamily='LINESeedKR-Bd' colorPalette='teal'>
                    커뮤니티 게시판 둘러보기
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

export default PetOwnerMain