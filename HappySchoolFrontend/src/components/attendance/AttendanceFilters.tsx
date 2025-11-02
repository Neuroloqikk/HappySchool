import React from "react";
import { Form, ButtonToolbar, Button, DatePicker, SelectPicker, useToaster, Message } from "rsuite";
import { TypeAttributes } from "rsuite/esm/internals/types";
import { PlacementType } from "rsuite/esm/toaster/ToastContainer";

const data = ['2º B', '3º B'].map(
  item => ({ label: item, value: item })
);

const initFormValue = {
  datePicker: new Date(),
  selectPicker: '2º B'
};

type FormModel = typeof initFormValue;

function AttendanceFilters() {
  
  const [formData, setFormData] = React.useState<FormModel>(initFormValue);
  const type : TypeAttributes.Status = 'success';
  const placement : PlacementType = 'topCenter';
  const toaster = useToaster();

  const message = (
    <Message showIcon type={type} closable>
      Filtros aplicados!
    </Message>
  );
  return (
    <header>
      <Form
        layout="inline"
        formValue={formData}
        onChange={(value: Record<string, any>) => {
          setFormData(value as FormModel);
        }}
      >
        <Form.Group controlId="datePicker">
          <Form.ControlLabel>Data:</Form.ControlLabel>
          <Form.Control name="datePicker" accepter={DatePicker} oneTap />
        </Form.Group>
        <Form.Group controlId="selectPicker">
          <Form.ControlLabel>Turma:</Form.ControlLabel>
          <Form.Control name="selectPicker" accepter={SelectPicker} data={data} />
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={() => toaster.push(message, { placement, duration: 5000 })}>Pesquisar</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
    </header>
  )
}

export default AttendanceFilters;
