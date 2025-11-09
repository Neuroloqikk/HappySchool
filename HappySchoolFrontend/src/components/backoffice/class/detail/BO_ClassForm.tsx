import {
  Form,
  ButtonToolbar,
  Button,
  useToaster,
  Message
} from "rsuite";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClassItem } from "../../../../types";

interface Props {
  classItem: ClassItem;
  refetchfn?: () => void;
  closeModal?: () => void;
}

function ClassForm({ classItem, refetchfn, closeModal }: Props) {
  const toaster = useToaster();

  const [formValue, setFormValue] = React.useState<any>(classItem);

  const mutation = useMutation({
    mutationFn: (classItem: ClassItem) => {
      const isNew = !classItem.id || classItem.id === 0;
      const url = isNew
        ? "https://localhost:7021/api/Classes"
        : `https://localhost:7021/api/Classes/${classItem.id}`;

      return fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(classItem),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to save class");
        const data = res.status === 204 ? null : res.json();

        return { data, isNew }; // <-- return it
      });
    },
    onSuccess: (result) => {
      toaster.push(
        <Message showIcon type='success' closable>
          {result.isNew ? 'Turma criada com sucesso!' : 'Turma atualizada com sucesso!'}
        </Message>
      )
      refetchfn?.();
      closeModal?.();
    },
  });

  const handleSubmit = () => {
    const payload: any = {
      ...formValue,
      id: formValue.id ?? 0,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="form-wrapper">
      <Form
        fluid
        formValue={formValue}
        onChange={setFormValue}
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="name">
          <Form.ControlLabel>Nome</Form.ControlLabel>
          <Form.Control name="name" />
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

export default ClassForm;