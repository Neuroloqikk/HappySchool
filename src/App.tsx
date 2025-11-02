import './App.css';
import Sidebar from './components/global/Sidenav';
import { CustomProvider } from 'rsuite';
import AttendanceFilters from './components/attendance/AttendanceFilters';
import StudentsTable from './components/attendance/StudentsTable';
import StudentDetail from './components/backoffice/student/StudentDetail';

function App() {
  return (
    <CustomProvider theme="dark">
      <div className="main-content">
        <Sidebar />
        <div className="main-content-body">
          <AttendanceFilters />
          <StudentsTable />
          <StudentDetail />
        </div>
      </div>
    </CustomProvider>

  );
}

export default App;
