import {
  Form,
  DatePicker,
  SelectPicker,
  Uploader,
  ButtonToolbar,
  Button,
} from "rsuite";
import React from "react";
import { useMutation } from "@tanstack/react-query";

type Student = {
  id: number; // use 0 for new
  firstName: string;
  otherNames?: string | null;
  birthDate: Date | string;
  classId: number | null;
  photo?: File | null;
};
interface Props {
  student: Student;
}

function StudentForm({ student }: Props) {
  const [formValue, setFormValue] = React.useState<any>(student);
  console.log("Student Form initialized with: ", student);

  const mutation = useMutation({
    mutationFn: async (student: Student) => {
      const isNew = student.id == null || student.id === 0;

      const url = isNew
        ? "https://localhost:7021/api/Student"
        : `https://localhost:7021/api/Student/${student.id}`;

      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to save student");
      }

      return response.json();
    },
    onSuccess: () => {
      console.log("✅ Student saved successfully!");
      // e.g. invalidate query to refresh list
    },
  });

  const handleSubmit = () => {
    const payload = {
      ...formValue,
      id: formValue.id ?? 0, // new record must be 0
      birthDate: new Date(formValue.birthDate).toISOString(),
    };

    mutation.mutate(payload);
  };

  return (
    <div className="student-form-wrapper">
      <Form
        fluid
        formValue={formValue}
        onChange={setFormValue}
        onSubmit={handleSubmit} // ⬅️ triggers mutation
      >
        <Form.Group controlId="firstName">
          <Form.ControlLabel>Primeiro Nome</Form.ControlLabel>
          <Form.Control name="firstName" />
        </Form.Group>

        <Form.Group controlId="otherNames">
          <Form.ControlLabel>Outros nomes</Form.ControlLabel>
          <Form.Control name="otherNames" />
        </Form.Group>

        <Form.Group controlId="birthDate">
          <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
          <Form.Control
            name="birthDate"
            accepter={DatePicker}
            className="full-width"
          />
        </Form.Group>

        <Form.Group controlId="classId">
          <Form.ControlLabel>Turma</Form.ControlLabel>
          <Form.Control
            name="classId"
            accepter={SelectPicker}
            data={["2º B", "3º B"].map((i) => ({ label: i, value: i }))}
            className="full-width"
          />
        </Form.Group>

        <Form.Group controlId="uploader">
          <Form.ControlLabel>Fotografia</Form.ControlLabel>
          <Form.Control
            name="uploader"
            accepter={Uploader}
            action="#"
            className="full-width"
          />
        </Form.Group>

        <Form.Group>
          <ButtonToolbar>
            <Button
              appearance="primary"
              type="submit"
              loading={mutation.isPending}
            >
              Gravar
            </Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </div>
  );
}

export default StudentForm;
