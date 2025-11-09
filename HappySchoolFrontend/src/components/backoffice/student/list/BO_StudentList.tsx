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
  fullName: string;
  birthDate: Date;
  age: number;
  classId: number | null;
  photo?: File | null;
};

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const { isPending, error, data, refetch } = useQuery({
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
    fullName: "",
    birthDate: new Date(),
    age: 0,
    classId: null,
    photo: null,
  };

  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedStudent(undefined);
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Lista de Alunos</h2>

      {/* Filter Input */}
      <div className="student-list-filters-wrapper">
        <InputGroup style={{ width: 300 }}>
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
      </div>

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
        <Column width={70} align="center" fixed sortable>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={1} sortable>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="fullName" />
        </Column>

        <Column width={100} align="center" sortable>
          <HeaderCell>Turma</HeaderCell>
          <Cell dataKey="className" />
        </Column>

        <Column width={100} align="center" sortable>
          <HeaderCell>Idade</HeaderCell>
          <Cell dataKey="age" />
        </Column>        

        <Column width={150} align="center" sortable>
          <HeaderCell>Data de Nascimento</HeaderCell>
          <Cell dataKey="birthDate">
            {rowData => rowData.birthDate ? new Date(rowData.birthDate).toLocaleDateString("pt-PT") : ''}
          </Cell>
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
          {selectedStudent && <StudentDetail student={selectedStudent} refetchfn={refetch} closeModal={handleClose}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
}
