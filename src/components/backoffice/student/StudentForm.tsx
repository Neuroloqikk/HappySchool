import { Form, DatePicker, SelectPicker, Uploader, ButtonToolbar, Button } from "rsuite";
import React from "react";

function StudentForm() {
    const [errorVisible, setErrorVisible] = React.useState<boolean>(true);
    const errorMessage = errorVisible ? 'This field is required' : null;

    const data = ['2º B', '3º B'].map(
        item => ({ label: item, value: item })
    );


    return (
        <div className="student-form-wrapper">
            <Form fluid>
                <Form.Group controlId="firstName">
                    <Form.ControlLabel>Primeiro Nome</Form.ControlLabel>
                    <Form.Control name="firstName"
                        errorMessage={errorMessage}
                        errorPlacement={"rightEnd"} />
                </Form.Group>
                <Form.Group controlId="otherNames">
                    <Form.ControlLabel>Outros nomes</Form.ControlLabel>
                    <Form.Control name="otherNames"
                        errorMessage={errorMessage}
                        errorPlacement={"rightEnd"} />
                </Form.Group>
                <Form.Group controlId="datePicker">
                    <Form.ControlLabel>Data de Nascimento</Form.ControlLabel>
                    <Form.Control name="datePicker" accepter={DatePicker} className="full-width"/>
                </Form.Group>
                <Form.Group controlId="selectPicker">
                    <Form.ControlLabel>Turma</Form.ControlLabel>
                    <Form.Control name="selectPicker" accepter={SelectPicker} data={data} className="full-width"/>
                </Form.Group>
                <Form.Group controlId="uploader">
                    <Form.ControlLabel>Fotografia</Form.ControlLabel>
                    <Form.Control name="uploader" accepter={Uploader} action="#" className="full-width"/>
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary">Gravar</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </div>
    );
}

export default StudentForm;