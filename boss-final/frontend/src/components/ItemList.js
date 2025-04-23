import React, { useState, useEffect } from 'react';

function ItemList() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/items")
            .then(res => res.json())
            .then(setItems)
            .catch(err => console.error("Erreur API:", err));
    }, []);

    const addItem = () => {
        if (!newItem.trim()) {
            setMessage("⚠️ Le champ ne peut pas être vide.");
            return;
        }

        fetch("/api/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newItem })
        })
            .then(res => res.json())
            .then(item => {
                setItems([...items, item]);
                setNewItem("");
                setMessage("✅ Élément ajouté !");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(() => {
                setMessage("❌ Erreur lors de l’ajout");
            });
    };

    const removeItem = (id) => {
        const input = prompt("Entrez le mot de passe pour supprimer :");
        if (input !== "admin123") {
            alert("❌ Mot de passe incorrect.");
            return;
        }

        fetch(`/api/items/${id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    setItems(items.filter(i => i._id !== id));
                    setMessage("🗑️ Élément supprimé !");
                    setTimeout(() => setMessage(""), 3000);
                } else {
                    setMessage("❌ Erreur lors de la suppression.");
                }
            });
    };

    return (
        <div style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            maxWidth: "400px"
        }}>
            <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Ajouter un item</h2>

            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    placeholder="Nom de l’item"
                    style={{
                        flex: 1,
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #ccc"
                    }}
                />
                <button
                    onClick={addItem}
                    style={{
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "0.5rem 1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                    Ajouter
                </button>
            </div>

            {message && (
                <div style={{ marginBottom: "1rem", color: "#444" }}>{message}</div>
            )}

            <ul style={{ paddingLeft: "1rem" }}>
                {items.map(i => (
                    <li key={i._id} style={{ marginBottom: "0.5rem" }}>
                        {i.name}
                        <button
                            onClick={() => removeItem(i._id)}
                            style={{
                                marginLeft: "0.5rem",
                                background: "none",
                                color: "red",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
