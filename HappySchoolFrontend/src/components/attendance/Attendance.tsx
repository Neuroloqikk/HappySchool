import AttendanceFilters from "./AttendanceFilters";
import StudentsTable from "./StudentsTable";

export default function Attendance() {
  return (
    <div>
      <AttendanceFilters />
      <StudentsTable />
    </div>
  );
}
