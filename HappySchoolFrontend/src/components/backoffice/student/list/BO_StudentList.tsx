import { useState, useMemo } from "react";
import { Table, Input, InputGroup, Button, Modal } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import StudentDetail from "../detail/BO_StudentDetail";
import "rsuite/dist/rsuite.css";

const { Column, HeaderCell, Cell } = Table;

// Mocked student data
const mockStudents = [
  { id: 1, name: "João Silva", age: 20, class: "12A" },
  { id: 2, name: "Maria Fernandes", age: 19, class: "12B" },
  { id: 3, name: "Pedro Santos", age: 21, class: "12A" },
  { id: 4, name: "Ana Costa", age: 20, class: "12C" },
  { id: 5, name: "Rui Oliveira", age: 22, class: "12B" },
  { id: 6, name: "Carla Mendes", age: 19, class: "12C" },
];

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Filtered list based on search
  const filteredStudents = useMemo(() => {
    if (!search) return mockStudents;
    return mockStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.class.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleView = (student: any) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedStudent(null);
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Lista de Estudantes</h2>

      {/* Filter Input */}
      <InputGroup style={{ marginBottom: 20, width: 300 }}>
        <Input
          placeholder="Procurar por nome ou turma"
          value={search}
          onChange={setSearch}
        />
        <InputGroup.Button>
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>

      {/* RSuite Table */}
      <Table
        height={400}
        data={filteredStudents}
        bordered
        cellBordered
        hover
        autoHeight
      >
        <Column width={70} align="center" fixed>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>Idade</HeaderCell>
          <Cell dataKey="age" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>Turma</HeaderCell>
          <Cell dataKey="class" />
        </Column>

        <Column width={120} fixed="right" align="center">
          <HeaderCell>Ações</HeaderCell>
          <Cell>
            {(rowData) => (
              <Button size="sm" onClick={() => handleView(rowData)}>
                Ver
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

    
      <Modal open={modalOpen} onClose={handleClose} size="sm">
        <Modal.Body>
          {selectedStudent && (
            <StudentDetail student={selectedStudent} />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="subtle">
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
