import { useState } from "react";
import { Table, Input, InputGroup, Button, Modal } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import StudentDetail from "../detail/BO_StudentDetail";
import "rsuite/dist/rsuite.css";
import { useQuery } from "@tanstack/react-query";

const { Column, HeaderCell, Cell } = Table;

type Student = {
  id: number;           // use 0 for new
  firstName: string;
  otherNames?: string | null;
  birthDate: Date | string;
  classId: number | null;
  photo?: File | null;
};

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7021/api/Student");
      return await response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>'An error has occurred: {error.message}</div>;

  const emptyStudent: Student = {
    id: 0,
    firstName: "",
    otherNames: "",
    birthDate: new Date(),
    classId: null,
    photo: null,
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedStudent(null);
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Lista de Alunos</h2>

      {/* Filter Input */}
      <>
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
        <Button size="sm" onClick={() => handleView(emptyStudent)}>
          Criar aluno
        </Button>
      </>

      {/* RSuite Table */}
      <Table
        height={400}
        data={data}
        bordered
        cellBordered
        hover
        autoHeight
        locale={{
          emptyMessage: "Nenhum aluno encontrado",
          loading: "Carregando...",
        }}
      >
        <Column width={70} align="center" fixed>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>Idade</HeaderCell>
          <Cell dataKey="birthDate" />
        </Column>

        <Column width={100} align="center">
          <HeaderCell>Turma</HeaderCell>
          <Cell dataKey="className" />
        </Column>

        <Column width={120} fixed="right" align="center">
          <HeaderCell>Ações</HeaderCell>
          <Cell>
            {(rowData) => (
              <Button size="sm" onClick={() => handleView(rowData as Student)}>
                Ver
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

      <Modal open={modalOpen} onClose={handleClose} size="sm">
        <Modal.Header />
        <Modal.Body>
          {selectedStudent && <StudentDetail student={selectedStudent} />}
        </Modal.Body>
      </Modal>
    </div>
  );
}
