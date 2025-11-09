import { Tabs, Placeholder, Panel } from "rsuite";
import StudentForm from "./BO_StudentForm";

type Student = {
  id: number;           // use 0 for new
  firstName: string;
  otherNames?: string | null;
  birthDate: Date;
  classId: number | null;
  photo?: File | null;
};

interface Props {
  student: Student;
  refetchfn?: () => void;
  closeModal?: () => void;
}

function StudentDetail({ student, refetchfn, closeModal }: Props) {
  return (
    <Panel
      header="Detalhes do Aluno"
      bordered
      className="student-details-wrapper"
    >
      <Tabs defaultActiveKey="1">
        <Tabs.Tab eventKey="1" title="Aluno">
          <StudentForm student={student} refetchfn={refetchfn} closeModal={closeModal} />
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="Encarregado de educação">
          <Placeholder.Paragraph />
        </Tabs.Tab>
      </Tabs>
    </Panel>
  );
}

export default StudentDetail;
