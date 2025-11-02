import "./App.css";
import Sidebar from "./components/global/Sidenav";
import { CustomProvider } from "rsuite";
import StudentList from "./components/backoffice/student/list/BO_StudentList";
import Attendance from "./components/attendance/Attendance";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDetail from "./components/backoffice/student/detail/BO_StudentDetail";

function App() {
  return (
    <CustomProvider theme="dark">
      <BrowserRouter>
        <div className="main-content">
          <Sidebar />
          <div className="main-content-body">
            <Routes>
              <Route path="/" element={<h1>Dashboard</h1>} />
              <Route path="/presencas/diarias" element={<Attendance />} />
              <Route path="/presencas/mensais" element={<Attendance />} />
              <Route path="/backoffice/alunos" element={<StudentList />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CustomProvider>
  );
}

export default App;
