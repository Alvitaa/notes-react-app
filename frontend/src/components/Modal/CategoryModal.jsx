import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
    createCategory,
    deleteCategory,
    updateCategory,
} from "../../api/CategoryApi";
import {
    BiSolidPencil,
    BiSolidXCircle,
    BiSolidCheckCircle,
} from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";
import "./CategoryModal.css";
import "./Modal.css";

export default function CategoryModal({
    categories,
    setCategories,
    onClose,
    setCategoriesUpdated,
}) {
    const { user } = useUser();
    const [newCategory, setNewCategory] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingId]);

    const handleClose = () => {
        setCategoriesUpdated(true);
        onClose();
    };

    const handleEditClick = (category) => {
        setEditingId(category.id);
        setEditingName(category.name);
    };

    const handleCreate = async () => {
        if (!newCategory.trim()) return;
        try {
            const categoryData = { name: newCategory.trim() };
            const createdCategory = await createCategory(
                user.id,
                categoryData
            );

            setCategories((prev) => [...prev, createdCategory]);
            setNewCategory("");
        } catch (error) {
            console.error("Error creating category.");
            alert("Error creating category.");
        }
    };

    const handleUpdate = async (categoryId) => {
        if (!editingName.trim()) return;

        try {
            const updatedCategory = await updateCategory(categoryId, user.id, {
                name: editingName.trim(),
            });

            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === categoryId ? updatedCategory : cat
                )
            );

            setEditingId(null);
            setEditingName("");
        } catch (error) {
            console.error("Error updating category.");
            alert("Error updating category.");
        }
    };

    const handleDelete = async (categoryId) => {
        if (
            window.confirm(
                "This will permanently delete the note. Are you sure?"
            )
        ) {
            try {
                await deleteCategory(user.id, categoryId);

                setCategories((prev) =>
                    prev.filter((cat) => cat.id !== categoryId)
                );
            } catch (error) {
                console.error("Error deleting category.");
                alert("Error deleting category.");
            }
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container-category">
                <h2>Edit Categories</h2>
                <div className="add-category">
                    <input
                        type="text"
                        placeholder="Type a new Category and add it!"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <button onClick={handleCreate}>
                        Add <IoAddCircle />
                    </button>
                </div>
                <h3>Categories of {user.username}</h3>
                <ul className="modal-category-list">
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <li key={category.id}>
                                {editingId === category.id ? (
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={editingName}
                                        onChange={(e) =>
                                            setEditingName(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === "Enter" &&
                                            handleUpdate(category.id)
                                        }
                                    />
                                ) : (
                                    <span>{category.name}</span>
                                )}
                                <div className="category-list-button">
                                    {editingId === category.id ? (
                                        <BiSolidCheckCircle
                                            className="list-button"
                                            onClick={() =>
                                                handleUpdate(category.id)
                                            }
                                            title="Save"
                                        />
                                    ) : (
                                        <BiSolidPencil
                                            className="list-button"
                                            onClick={() =>
                                                handleEditClick(category)
                                            }
                                            title="Edit"
                                        />
                                    )}
                                    <BiSolidXCircle
                                        className="list-button"
                                        onClick={() =>
                                            handleDelete(category.id)
                                        }
                                        title="delete"
                                    />
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>You have no categories created.</p>
                    )}
                </ul>
                <button
                    className="modal-category-button"
                    onClick={() => handleClose()}
                >
                    Go back
                </button>
            </div>
        </div>
    );
}
