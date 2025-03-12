export interface IForm {
    id: string;
    patente: string;
    observaciones: string;
    arreglo: string;
    secciones: Record<number, string[]>; // Un objeto donde la clave es un número y el valor es un array de strings
    aprobado?: boolean; // Opcional, ya que el formulario puede no estar aprobado aún
    createdAt: string;
    updatedAt: string;
}  