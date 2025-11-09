import { useState } from "react";
import { Table, Input, InputGroup, Button, Modal } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import ClassDetail from "../detail/BO_ClassDetail";
import "rsuite/dist/rsuite.css";
import { useQuery } from "@tanstack/react-query";
import { ClassItem } from "../../../../types";

const { Column, HeaderCell, Cell } = Table;

export default function ClassList() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassItem>();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7021/api/Classes");
      return await response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>'An error has occurred: {error.message}</div>;

  const emptyClass: ClassItem = {
    id: 0,
    name: "",
  };

  const handleView = (classItem: ClassItem) => {
    console.log(classItem);
    setSelectedClass(classItem);
    setModalOpen(true);
  };

  const handleClose = () => {
    setSelectedClass(undefined);
    setModalOpen(false);
  };

  return (
    <div>
      <h2>Lista de Turmas</h2>

      {/* Filter Input */}
      <div className="student-list-filters-wrapper">
        <InputGroup style={{ width: 300 }}>
          <Input
            placeholder="Procurar por turma"
            value={search}
            onChange={setSearch}
          />
          <InputGroup.Button>
            <SearchIcon />
          </InputGroup.Button>
        </InputGroup>
        <Button size="sm" onClick={() => handleView(emptyClass)}>
          Criar turma
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
          emptyMessage: "Nenhuma turma encontrado",
          loading: "Carregando...",
        }}
      >
        <Column width={70} align="center" fixed sortable>
          <HeaderCell>ID</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={1} sortable>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={120} fixed="right" align="center">
          <HeaderCell>Ações</HeaderCell>
          <Cell>
            {(rowData) => (
              <Button size="sm" onClick={() => handleView(rowData as ClassItem)}>
                Ver
              </Button>
            )}
          </Cell>
        </Column>
      </Table>

      <Modal open={modalOpen} onClose={handleClose} size="sm">
        <Modal.Header />
        <Modal.Body>
          {selectedClass && <ClassDetail classItem={selectedClass} refetchfn={refetch} closeModal={handleClose}/>}
        </Modal.Body>
      </Modal>
    </div>
  );
}
