const BASE_URL = "http://localhost:8080/api/categories";

export const getCategories = async (personId) => {
    const response = await fetch(`${BASE_URL}/person/${personId}`);
    if (!response.ok) throw new Error("Error obtaining categories.");
    return response.json();
};

export const createCategory = async (personId, category) => {
    const response = await fetch(`${BASE_URL}/person/${personId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    });

    if (!response.ok) throw new Error(`Error creating category.`);
    return response.json();
};

export const updateCategory = async (categoryId, personId, category) => {
    const response = await fetch(
        `${BASE_URL}/${categoryId}/person/${personId}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category),
        }
    );

    if (!response.ok) throw new Error(`Error updating category.`);
    return response.json();
};

export const deleteCategory = async (personId, categoryId) => {
    const response = await fetch(`${BASE_URL}/${personId}/${categoryId}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error(`Error deleting category.`);
};
