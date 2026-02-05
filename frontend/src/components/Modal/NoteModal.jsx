import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getCategories } from "../../api/CategoryApi";
import { createNote, deleteNote, updateNote } from "../../api/NoteApi";
import SelectCategory from "./SelectCategory";
import "./Modal.css"
import "./NoteModal.css";

export default function NoteModal({ note, onClose, setNotes, fetchNotes }) {
    const { user } = useUser();
    const [title, setTitle] = useState(note?.title || "");
    const [content, setContent] = useState(note?.content || "");
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState(
        note?.categories || []
    );

    useEffect(() => {
        setTitle(note?.title || "");
        setContent(note?.content || "");
        setSelectedCategories(note?.categories || []);
    }, [note]);

    useEffect(() => {
        getCategories(user.id)
            .then((data) => setCategories(data))
            .catch(console.error);
    }, [user.id]);

    const toggleCategory = (category) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.some((cat) => cat.id === category.id)) {
                return prevSelectedCategories.filter(
                    (cat) => cat.id !== category.id
                );
            } else {
                return [...prevSelectedCategories, category];
            }
        });
    };

    const handleUpdate = () => {
        const updatedNote = {
            title,
            content,
            categoryIds: selectedCategories.map((cat) => cat.id),
        };

        if (note?.id != null) {
            updateNote(user.id, note.id, updatedNote)
                .then((updatedNote) => {
                    setNotes((prevNotes) =>
                        prevNotes.map((n) =>
                            n.id === updatedNote.id ? updatedNote : n
                        )
                    );
                    onClose();
                })
                .catch((error) => {
                    console.error("Error al actualizar la nota:", error);
                    alert("Hubo un error al actualizar la nota.");
                });
        }
    };

    const handleNewSave = () => {
        const newNote = {
            title,
            content,
            categoryIds: selectedCategories.map((cat) => cat.id),
        };

        createNote(user.id, newNote)
            .then((savedNote) => {
                setNotes((prevNotes) => [savedNote, ...prevNotes]);
                onClose();
            })
            .catch((error) => {
                console.error("Error al guardar la nota:", error);
                alert("Hubo un error al guardar la nota.");
            });
    };

    const handleDiscard = () => {
        if (window.confirm("¿Discard changes?")) {
            onClose();
        }
    };

    const toggleArchive = () => {
        if (note?.id != null) {
            const archive = {
                archived: !note.archived,
            };
            updateNote(user.id, note.id, archive)
                .then((savedNote) => {
                    setNotes((prevNotes) =>
                        prevNotes.map((n) =>
                            n.id === savedNote.id ? savedNote : n
                        )
                    );
                    fetchNotes(note.archived);
                    onClose();
                })
                .catch((error) => {
                    console.error("Error al guardar la nota:", error);
                    alert("Hubo un error al guardar la nota.");
                });
        }
    };

    const handleDelete = () => {
        if (
            window.confirm(
                "This will permanently delete the note. Are you sure?"
            ) &&
            note?.id != null
        ) {
            deleteNote(user.id, note.id);
            fetchNotes(note.archived);
            onClose();
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="modal-body">
                    <input
                        type="text"
                        className="title-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title..."
                    />
                    <textarea
                        className="content-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your note content here..."
                    />
                </div>

                <div className="modal-sidebar">
                    <div className="categories">
                        <p>Categories:</p>
                        <ul>
                            {selectedCategories.map((category) => (
                                <li key={category.id}>{category.name}</li>
                            ))}
                        </ul>
                        <SelectCategory
                            availableCategories={categories}
                            selectedCategories={selectedCategories}
                            onCategoryToggle={toggleCategory}
                        />
                    </div>

                    <div className="actions">
                        <button
                            onClick={note?.id ? handleUpdate : handleNewSave}
                        >
                            Save note
                        </button>
                        <button
                            onClick={handleDiscard}
                            className={note?.id ? "" : "primary"}
                        >
                            Discard changes
                        </button>
                        {note?.id && (
                            <>
                                <button
                                    onClick={toggleArchive}
                                    className="info"
                                >
                                    {note.archived ? "Unarchive note" : "Archive note"}
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="primary"
                                >
                                    Delete note
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
