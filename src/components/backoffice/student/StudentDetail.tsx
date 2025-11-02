import { Tabs, Placeholder } from 'rsuite';
import StudentForm from './StudentForm';

function StudentDetail() {
    return (
        <Tabs defaultActiveKey="1">
            <Tabs.Tab eventKey="1" title="Aluno">
                <StudentForm />
            </Tabs.Tab>
            <Tabs.Tab eventKey="2" title="Encarregado de educação">
                <Placeholder.Paragraph/>
            </Tabs.Tab>
        </Tabs>
    );
}


export default StudentDetail;