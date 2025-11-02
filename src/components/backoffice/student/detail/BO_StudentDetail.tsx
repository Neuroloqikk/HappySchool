import { Tabs, Placeholder, Panel } from "rsuite";
import StudentForm from "./BO_StudentForm";

type Student = {
  id: number;
  name: string;
  age: number;
  class: string;
  email: string;
};

interface Props {
  student: Student;
}

function StudentDetail({ student }: Props) {
  return (
    <Panel header="Detalhes do Aluno" bordered className="student-details-wrapper">
      <Tabs defaultActiveKey="1">
        <Tabs.Tab eventKey="1" title="Aluno">
          <StudentForm />
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="Encarregado de educação">
          <Placeholder.Paragraph />
        </Tabs.Tab>
      </Tabs>
    </Panel>
  );
}

export default StudentDetail;
