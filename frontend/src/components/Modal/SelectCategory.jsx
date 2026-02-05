import React from "react";

export default function SelectCategory({
    availableCategories,
    onCategoryToggle,
}) {
    return (
        <div className="select-category">
            <p>Seleccionar Categorías:</p>
            <select
                defaultValue=""
                onChange={(e) =>
                    onCategoryToggle({
                        id: e.target.value,
                        name: e.target.options[e.target.selectedIndex].text,
                    })
                }
            >
                <option value="" disabled>
                    Seleccionar categoría
                </option>
                {availableCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
