const BASE_URL = "http://localhost:8080/api/persons";

export const register = async (person) => {
    const response = await fetch(`${BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
    });

    if (!response.ok) throw new Error("Error creating user.");
    return response.json();
};

export const login = async (person) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(person),
    });

    if (!response.ok) throw new Error("Error while login in.");
    return response.json();
};
