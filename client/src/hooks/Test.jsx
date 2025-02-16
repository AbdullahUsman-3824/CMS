import React, { useState, useEffect } from "react";
import useFetch from "./useFetch"; // Import the custom hook
import {
    Button,
    TextField,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
} from "@mui/material";

const TestAPI = () => {
    const [selectedCtgId, setSelectedCtgId] = useState(""); // Store selected category ID
    const [selectedCtgName, setSelectedCtgName] = useState(""); // Store selected category Name
    const [newCtgName, setNewCtgName] = useState(""); // Input field value

    // 1️⃣ GET: Fetch all categories
    const { data: categories, loading, error, fetchData: fetchCategories } = useFetch("/api/categories");

    // 2️⃣ POST: Create a new category
    const { loading: postLoading, error: postError, fetchData: createCategory } = useFetch("/api/categories", "POST");

    // 3️⃣ PUT: Update a category
    const { loading: putLoading, error: putError, fetchData: updateCategory } = useFetch(`/api/categories/${selectedCtgId}`, "PUT");

    // 4️⃣ DELETE: Delete a category
    const { loading: deleteLoading, error: deleteError, fetchData: deleteCategory } = useFetch(`/api/categories/${selectedCtgId}`, "DELETE");

    // Fetch categories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, []);

    // Create Category
    const handleCreateCategory = () => {
        createCategory({ name: newCtgName });
        setNewCtgName("")
        fetchCategories();
    }

    // Update Category
    const handleUpdateCategory = () => {
        updateCategory({ name: selectedCtgName })
        setSelectedCtgId("")
        setSelectedCtgName("")
        fetchCategories();
    }

    // Select Categoy
    const handleSelect = (id) => {
        setSelectedCtgId(id);
        setSelectedCtgName(categories.find(category => category._id === id).name);
    }

    // delete category
    const handleDeleteCategory = () => {
        deleteCategory();
        setSelectedCtgId("")
        setSelectedCtgName("")
        fetchCategories();
    }

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                📌 API Test - Categories
            </Typography>

            {/* 🟢 GET All Categories */}
            <Typography variant="h5" gutterBottom>
                1️⃣ GET - Fetch Categories
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">Error: {error}</Typography>
            ) : (
                <Grid container spacing={2}>
                    {categories?.map((ctg) => (
                        <Grid item xs={12} key={ctg._id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="h6">{ctg.name}</Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleSelect(ctg._id)}
                                        sx={{ mt: 1 }}
                                    >
                                        Select
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <Button variant="contained" color="secondary" onClick={() => fetchCategories()} sx={{ mt: 2 }}>
                🔄 Refresh Categories
            </Button>

            {/* 🔵 POST - Create a New Category */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                2️⃣ POST - Create Category
            </Typography>
            <TextField
                fullWidth
                label="New Category Name"
                value={newCtgName}
                onChange={(e) => setNewCtgName(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="success"
                onClick={() => handleCreateCategory()}
                disabled={postLoading}
            >
                {postLoading ? <CircularProgress size={24} /> : "Create Category"}
            </Button>
            {postError && <Typography color="error">{postError}</Typography>}

            {/* 🟠 PUT - Update Category */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                3️⃣ PUT - Update Category
            </Typography>
            <TextField
                fullWidth
                label="Updated Name"
                value={selectedCtgName}
                onChange={(e) => setSelectedCtgName(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="warning"
                onClick={() => handleUpdateCategory()}
                disabled={putLoading}
            >
                {putLoading ? <CircularProgress size={24} /> : "Update Category"}
            </Button>
            {putError && <Typography color="error">{putError}</Typography>}

            {/* 🔴 DELETE - Delete Category */}
            <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                4️⃣ DELETE - Remove Category {selectedCtgName}
            </Typography>
            <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteCategory()}
                disabled={deleteLoading}
            >
                {deleteLoading ? <CircularProgress size={24} /> : "Delete Category"}
            </Button>
            {deleteError && <Typography color="error">{deleteError}</Typography>}
        </Box>
    );
};

export default TestAPI;
