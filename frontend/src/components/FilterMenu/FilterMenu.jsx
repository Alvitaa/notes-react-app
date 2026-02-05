import { useState } from "react";

import { BiSolidPencil } from "react-icons/bi";
import { FaArchive } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";

import "./FilterMenu.css";

export default function FilterMenu({
    onCardClick,
    onFilterCategory,
    onSortChange,
    onToggleArchived,
    onCategoryClick,
    categories
}) {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("updated");
    const [showArchived, setShowArchived] = useState(false);

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        onFilterCategory(value);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOrder(value);
        onSortChange(value);
    };

    const handleArchivedToggle = () => {
        const value = !showArchived;
        setShowArchived(value);
        onToggleArchived(value);

        setSelectedCategory("0");
        setSortOrder("updated");

        onFilterCategory("0");
        onSortChange("updated");
    };

    return (
        <div className="filter-menu">
            <div className="menu-create">
                <button onClick={onCardClick}>
                    Create note <IoAddCircle />
                </button>
                <label className="selectedCategory">
                    Filter by category
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option key={"0"} value={0}>
                            All categories
                        </option>
                        {Array.isArray(categories) &&
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </label>

                <label className="sortOrder">
                    Order by
                    <select value={sortOrder} onChange={handleSortChange}>
                        <option value="updated">Change date</option>
                        <option value="created">Creation date</option>
                    </select>
                </label>
            </div>

            <label className="archived-toggle">
                <button onClick={onCategoryClick}>
                    Editar Categorías
                    <BiSolidPencil />
                </button>
                <button onClick={handleArchivedToggle}>
                    {showArchived ? "Show unarchived " : "Show archived "}{" "}
                    <FaArchive />
                </button>
            </label>
        </div>
    );
}
