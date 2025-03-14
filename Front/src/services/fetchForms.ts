const apiUrl = "https://c24-69-webapp.onrender.com";

export const fetchForms = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${apiUrl}/formularios?page=${page}&limit=${limit}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error al obtener formularios: ${data.message}`);
    }

    return data; // Devuelve los formularios con paginación
  } catch (error) {
    console.error("Error obteniendo formularios:", error);
    throw error;
  }
};

export const fetchFormById = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/formularios/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error al obtener formulario: ${data.message}`);
    }

    return data; // Devuelve un formulario específico
  } catch (error) {
    console.error("Error obteniendo formulario por ID:", error);
    throw error;
  }
};

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

    return data; // Devuelve la respuesta en caso de éxito
  } catch (error) {
    console.error("Error enviando formulario:", error);
    throw error;
  }
};

export const updateFormStatus = async (id: string, updateData: { status: boolean }) => {
  try {
    const response = await fetch(`${apiUrl}/formularios/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Error al actualizar formulario: ${data.message}`);
    }

    return data; // Devuelve la respuesta en caso de éxito
  } catch (error) {
    console.error("Error actualizando formulario:", error);
    throw error;
  }
};