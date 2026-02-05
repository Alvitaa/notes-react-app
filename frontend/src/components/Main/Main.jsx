import { useEffect, useState } from "react";
import { useUser } from "../../context/useUser";
import { getActiveNotes, getArchivedNotes } from "../../api/NoteApi";
import Card from "../Card/Card";
import NoteModal from "../Modal/NoteModal";
import FilterMenu from "../FilterMenu/FilterMenu";

import "./Main.css";
import CategoryModal from "../Modal/CategoryModal";
import { getCategories } from "../../api/CategoryApi";

export default function Main() {
    const { user } = useUser();
    const [notes, setNotes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showArchived, setShowArchived] = useState(false);
    const [sortOrder, setSortOrder] = useState("updated");
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [filteredNotes, setFilteredNotes] = useState([]);

    const [selectedNote, setSelectedNote] = useState(null);
    const [categoriesUpdated, setCategoriesUpdated] = useState(false);
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

    const handleToggleArchived = (value) => {
        setShowArchived(value);
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const handleFilterCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleCardClick = (note) => {
        setSelectedNote(note);
        setIsNoteModalOpen(true);
    };

    const handleCloseNoteModal = () => {
        setIsNoteModalOpen(false);
        setSelectedNote(null);
    };

    const handleCategoryModal = () => {
        setIsCategoryModalOpen(!isCategoryModalOpen);
    };

    const fetchNotes = async (isArchived) => {
        try {
            const data = isArchived
                ? await getArchivedNotes(user.id)
                : await getActiveNotes(user.id);
            setNotes(data);
            setFilteredNotes(data);
        } catch (e) {
            console.error("Error al obtener notas:", e);
        }
    };

    const fetchCategories = async () => {
        const data = await getCategories(user.id);
        setCategories(data);
    };

    useEffect(() => {
        if (!user?.id) return;

        const loadData = async () => {
            await fetchNotes(showArchived);
            await fetchCategories();
            await setCategoriesUpdated(false);
        };

        loadData();
    }, [showArchived, user.id, categoriesUpdated]);

    useEffect(() => {
        const loadData = async (data) => {
            await setFilteredNotes(data);
        }

        if (selectedCategory === "0" || selectedCategory === 0) {
            loadData(notes);
        } else {
            const filtered = notes.filter((note) =>
                Array.isArray(note.categories)
                    ? note.categories.some(
                          (category) =>
                              category.id === Number(selectedCategory),
                      )
                    : false,
            );
            loadData(filtered);
        }
    }, [notes, selectedCategory]);

    useEffect(() => {
        const loadData = async (data) => {
            await setFilteredNotes(data);
        }

        if (sortOrder === "created") {
            loadData((prevNotes) =>
                [...prevNotes].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                ),
            );
        } else if (sortOrder === "updated") {
            loadData((prevNotes) =>
                [...prevNotes].sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
                ),
            );
        }
    }, [notes, sortOrder]);

    return (
        <div className="main-content">
            <div className="wrapper">
                {Array.isArray(filteredNotes) && filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => (
                        <Card
                            key={note.id}
                            note={note}
                            function={handleCardClick}
                        />
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "#888" }}>
                        There are no {showArchived ? "archived" : ""} notes.
                    </p>
                )}
            </div>
            <FilterMenu
                onFilterCategory={handleFilterCategory}
                onSortChange={handleSortChange}
                onToggleArchived={handleToggleArchived}
                onCardClick={handleCardClick}
                onCategoryClick={handleCategoryModal}
                categories={categories}
            />
            {isNoteModalOpen && (
                <NoteModal
                    note={selectedNote}
                    onClose={handleCloseNoteModal}
                    setNotes={setNotes}
                    fetchNotes={fetchNotes}
                />
            )}
            {isCategoryModalOpen && (
                <CategoryModal
                    categories={categories}
                    setCategories={setCategories}
                    onClose={handleCategoryModal}
                    setCategoriesUpdated={setCategoriesUpdated}
                />
            )}
        </div>
    );
}
