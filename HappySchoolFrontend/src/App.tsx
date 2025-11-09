import "./App.css";
import Sidebar from "./components/global/Sidenav";
import { CustomProvider } from "rsuite";
import StudentList from "./components/backoffice/student/list/BO_StudentList";
import Attendance from "./components/attendance/Attendance";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ClassList from "./components/backoffice/class/list/BO_ClassList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
                <Route path="/backoffice/turmas" element={<ClassList />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </CustomProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
