const BASE_URL = "http://localhost:8080/api/notes";

export const getActiveNotes = async (personId) => {
    const response = await fetch(`${BASE_URL}/active/${personId}`);
    if (!response.ok) throw new Error("Error obtaining active notes");
    return response.json();
};

export const getArchivedNotes = async (personId) => {
    const response = await fetch(`${BASE_URL}/archived/${personId}`);
    if (!response.ok) throw new Error("Error obtaining archived notes");
    return response.json();
};

export const createNote = async (personId, note) => {
    const response = await fetch(`${BASE_URL}/create/${personId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });

    if (!response.ok) throw new Error("Error creating note");
    return response.json();
};

export const updateNote = async (personId, noteId, noteData) => {
    const response = await fetch(`${BASE_URL}/${personId}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noteData),
    });

    if (!response.ok) throw new Error(`Error updating note.`);
    return response.json();
};

export const deleteNote = async (personId, noteId) => {
    const response = await fetch(`${BASE_URL}/delete/${personId}/${noteId}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error(`Error deleting note.`);
};
