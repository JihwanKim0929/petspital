import { Routes, Route } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signUp/SignUp";
import UserNavbar from "./components/userNavbar/UserNavbar";
import PetOwnerSidebar from "./components/sidebar/petOwnerSidebar/PetOwnerSidebar";
import DoctorSidebar from "./components/sidebar/doctorSidebar/DoctorSidebar";
import PetOwnerMain from "./pages/user/petOwner/petOwnerMain/PetOwnerMain";
import DoctorMain from "./pages/user/doctor/doctorMain/DoctorMain";
import PetOwnerProfile from "./pages/user/petOwner/petOwnerProfile/PetOwnerProfile";
import DoctorProfile from "./pages/user/doctor/doctorProfile/DoctorProfile";
import Community from "./pages/user/community/Community";
import AboutPetspital from "./pages/aboutPetspital/AboutPetspital";
import Notifications from "./pages/notification/Notifications";
import Diagnosis from "./pages/user/diagnosis/Diagnosis";
import Hospital from "./pages/user/hospital/Hospital";
import Appointments from "./pages/user/appointments/Appointments";
import Records from "./pages/user/records/Records";
import Settings from "./pages/user/settings/Settings";
import { Toaster } from "./components/ui/toaster";

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
            <Route path="diagnosis" element={<Diagnosis />} />
            <Route path="records" element={<Records />} />
            <Route path="hospital" element={<Hospital />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<PetOwnerProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="doctor" element={<DoctorSidebar />}>
            <Route index element={<DoctorMain />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="community" element={<Community />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </Provider>
  );
}

export default App;
