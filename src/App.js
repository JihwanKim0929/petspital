import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signUp/SignUp";
import UserNavbar from "./components/userNavbar/UserNavbar";
import PetOwnerSidebar from "./components/sidebar/petOwnerSidebar/PetOwnerSidebar";
import DoctorSidebar from "./components/sidebar/doctorSidebar/DoctorSidebar";
import PetOwnerMain from "./pages/user/petOwner/petOwnerMain/PetOwnerMain";
import DoctorMain from "./pages/user/doctor/doctorMain/DoctorMain";
import Profile from "./pages/user/profile/Profile";
import Community from "./pages/user/community/Community";
import AboutPetspital from "./pages/aboutPetspital/AboutPetspital";
import Notifications from "./pages/notification/Notifications";
import Diagnosis from "./pages/user/diagnosis/Diagnosis";
import Hospital from "./pages/user/hospital/Hospital";
import PetOwnerAppointments from "./pages/user/petOwner/petOwnerAppointments/PetOwnerAppointments.jsx";
import DoctorAppointments from "./pages/user/doctor/doctorAppointments/DoctorAppointments";
import Records from "./pages/user/records/Records";
import Settings from "./pages/user/settings/Settings";
import Pets from "./pages/user/pets/Pets";
import CommunityBoard from "./pages/user/community/communityBoard/CommunityBoard";
import CommunityPost from "./pages/user/community/communityPost/CommunityPost";
import DiagnosisResult from "./pages/user/diagnosis/diagnosisResult/DiagnosisResult";
import CommunityPostView from "./pages/user/community/communityPostView/CommunityPostView.jsx";
import CommunityPostEdit from "./pages/user/community/communityPostEdit/CommunityPostEdit.jsx";
import Diary from "./pages/user/diary/Diary.jsx";
import AppointmentPetDiagnosis from "./pages/user/doctor/doctorAppointments/appointmentPetDiagnosis/AppointmentPetDiagnosis.jsx";
import AppointmentPetDiary from "./pages/user/doctor/doctorAppointments/appointmentPetDiary/AppointmentPetDiary.jsx";

function App() {
  
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Navbar />} >
          <Route index element={<Home />} />

          <Route path="/login">
            <Route index element={<Login />} />
          </Route>

          <Route path="/signup">
            <Route index element={<Signup />} />
          </Route>

          <Route path="/about">
            <Route index element={<AboutPetspital />} />
          </Route>

          <Route path="/notifications">
            <Route index element={<Notifications />} />
          </Route>
        </Route>

        <Route path="/user" element={<UserNavbar />}>
          <Route path="petowner" element={<PetOwnerSidebar />}>
            <Route index element={<PetOwnerMain />} />
            <Route path="pets" element={<Pets />} />
            <Route path="pets/diary" element={<Diary />} />
            <Route path="diagnosis" element={<Diagnosis />} />
            <Route path="diagnosis/result" element={<DiagnosisResult />} />
            <Route path="records" element={<Records />} />
            <Route path="hospital" element={<Hospital />} />
            <Route path="appointments" element={<PetOwnerAppointments />} />
            <Route path="community" element={<Community />}>
              <Route index element={<CommunityBoard />} />
              <Route path="post" element={<CommunityPost />} />
              <Route path="view" element={<CommunityPostView />} />
              <Route path="edit" element={<CommunityPostEdit />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="doctor" element={<DoctorSidebar />}>
            <Route index element={<DoctorMain />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="appointments/diagnosisRecords" element={<AppointmentPetDiagnosis />} />
            <Route path="appointments/diary" element={<AppointmentPetDiary />} />
            <Route path="community" element={<Community />}>
              <Route index element={<CommunityBoard />} />
              <Route path="post" element={<CommunityPost />} />
              <Route path="view" element={<CommunityPostView />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </Provider>
  );
}

export default App;
