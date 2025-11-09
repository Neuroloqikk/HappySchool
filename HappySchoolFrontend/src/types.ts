export type Student = {
  id: number; // use 0 for new
  firstName: string;
  otherNames?: string | null;
  fullName: string;
  birthDate: Date;
  age: number;
  classId: number | null;
  PhotoUpload?: File | null;
  photoBase64?: string | null;
};

export type ClassItem = {
    id: number;
    name: string;
}