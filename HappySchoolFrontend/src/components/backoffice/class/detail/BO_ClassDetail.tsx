import { Tabs, Placeholder, Panel } from "rsuite";
import ClassForm from "./BO_ClassForm";
import { ClassItem } from "../../../../types";

interface Props {
  classItem: ClassItem;
  refetchfn?: () => void;
  closeModal?: () => void;
}

function ClassDetail({ classItem, refetchfn, closeModal }: Props) {
  return (
    <Panel
      header="Detalhes da Turma"
      bordered
      className="form-details-wrapper"
    >
      <Tabs defaultActiveKey="1">
        <Tabs.Tab eventKey="1" title="Turma">
          <ClassForm classItem={classItem} refetchfn={refetchfn} closeModal={closeModal} />
        </Tabs.Tab>
        <Tabs.Tab eventKey="2" title="Alunos">
          <Placeholder.Paragraph />
        </Tabs.Tab>
      </Tabs>
    </Panel>
  );
}

export default ClassDetail;
