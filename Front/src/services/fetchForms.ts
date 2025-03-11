const apiUrl = "http://localhost:3000";

export const sendForm = async (formData: {
  patente: string;
  observaciones: string;
  arreglo: string;
  secciones: Record<number, string[]>;
}) => {
  try {
    const response = await fetch(`${apiUrl}/formularios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error al enviar formulario: ${data.message}`);
    }

    return data; // Devolvemos la respuesta en caso de éxito
  } catch (error) {
    console.error("Error enviando formulario:", error);
    throw error;
  }
};