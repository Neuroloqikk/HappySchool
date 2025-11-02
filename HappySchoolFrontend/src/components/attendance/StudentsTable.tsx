import { Table } from "rsuite";


const { Column, HeaderCell, Cell } = Table;

const studentData = ['Tyamo', 'Ariel', 'Asaf', 'Kemer', 'Jason', 'Clara', 'Leandro', 'Yuri', 'Kledmir', 'Ana', 'Diana', 'Zendaya', 'Noah', 'Paolah'].map(
    (name, index) => ({
        id: index + 1,
        firstName: name
    })
);

function StudentsTable() {
    return (
        <div className="students-table">
            <Table height={600} data={studentData} rowHeight={35}>
                <Column sortable width={100}>
                    <HeaderCell>Número</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column sortable width={150}>
                    <HeaderCell>Nome</HeaderCell>
                    <Cell dataKey="firstName" />
                </Column>
            </Table>
        </div>
    );
}

export default StudentsTable;
