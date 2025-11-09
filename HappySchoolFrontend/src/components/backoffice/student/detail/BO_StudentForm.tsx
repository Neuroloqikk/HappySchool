import {
  Form,
  DatePicker,
  SelectPicker,
  Uploader,
  ButtonToolbar,
  Button,
  useToaster,
  Message,
  Schema
} from "rsuite";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

type Student = {
  id: number; // use 0 for new
  firstName: string;
  otherNames?: string | null;
  birthDate: Date;
  classId: number | null;
  PhotoUpload?: File | null;
  photoBase64?: string | null; // Changed to lowercase to match backend
};

type ClassItem = {
  id: number;
  name: string;
}

interface Props {
  student: Student;
  refetchfn?: () => void;
  closeModal?: () => void;
}



function StudentForm({ student, refetchfn, closeModal }: Props) {
  const toaster = useToaster();
  const { data : ClassList = [] } = useQuery({
    queryKey: ["classesData"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7021/api/Classes");
      return await response.json();
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const [formValue, setFormValue] = React.useState<any>({
    ...student,
    birthDate: student.birthDate ? new Date(student.birthDate) : null,
  });
  
  // Store the actual File object separately
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  
  // Store existing photo preview URL
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);

  // Set initial photo preview
  React.useEffect(() => {
    if (student.photoBase64) {
      // Try to detect image format or use a generic one
      setPhotoPreview(`data:image/png;base64,${student.photoBase64}`);
    }
  }, [student.photoBase64]);


  const mutation = useMutation({
    mutationFn: (student: Student) => {
      const payload = toFormData(student);

      const isNew = !student.id || student.id === 0;
      const url = isNew
        ? "https://localhost:7021/api/Student"
        : `https://localhost:7021/api/Student/${student.id}`;

      return fetch(url, {
        method: isNew ? "POST" : "PUT",
        body: payload,
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to save student");
        const data = res.status === 204 ? null : res.json();

        return { data, isNew }; // <-- return it
      });
    },
    onSuccess: (result) => {
      toaster.push(
        <Message showIcon type='success' closable>
          {result.isNew ? 'Aluno criado com sucesso!' : 'Aluno atualizado com sucesso!'}
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
      birthDate: new Date(formValue.birthDate).toISOString().split("T")[0],
    };

    // Only include PhotoUpload if a new file was selected
    if (photoFile) {
      payload.PhotoUpload = photoFile;
    }
    mutation.mutate(payload);
  };

  const handlePhotoChange = (files: any[]) => {
    if (files.length > 0 && files[0].blobFile) {
      const file = files[0].blobFile;
      setPhotoFile(file);
      
      // Create preview URL for new upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoFile(null);
      // Restore original photo if available
      if (student.photoBase64) {
        setPhotoPreview(`data:image/png;base64,${student.photoBase64}`);
      } else {
        setPhotoPreview(null);
      }
    }
  };

  return (
    <div className="student-form-wrapper">
      <Form
        fluid
        formValue={formValue}
        onChange={setFormValue}
        onSubmit={handleSubmit}
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
            data={ClassList.map((classes : ClassItem) => ({ label: classes.name, value: classes.id }))}
            className="full-width"
          />
        </Form.Group>

        <Form.Group controlId="PhotoUpload">
          <Form.ControlLabel>Fotografia</Form.ControlLabel>
          
          {/* Show existing photo preview */}
          {photoPreview && (
            <div style={{ marginBottom: "10px" }}>
              <img 
                src={photoPreview} 
                alt="Student" 
                style={{ 
                  maxWidth: "200px", 
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #e5e5ea"
                }} 
              />
            </div>
          )}
          
          <Uploader
            action="#"
            fileList={photoFile ? [{ name: photoFile.name, fileKey: 1 }] : []}
            onChange={handlePhotoChange}
            autoUpload={false}
            listType="picture"
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

function toFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === null) continue;

    if (obj[key] instanceof Date) {
      // Convert Date to YYYY-MM-DD
      formData.append(key, obj[key].toISOString().split("T")[0]);
    } else if (obj[key] instanceof File) {
      formData.append(key, obj[key]);
    } else {
      formData.append(key, String(obj[key]));
    }
  }
  return formData;
}

export default StudentForm;