const db = require('../config/db');

// Menampilkan semua data experience
const getAllExperience = async () => {
    const [rows] = await db.query(
        'SELECT * FROM experiences ORDER BY start_date DESC'
    );

    return rows;
};

// Menampilkan data experience berdasarkan ID
const getExperienceById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM experiences WHERE id = ?',
        [id]
    );

    return rows[0];
};

// Membuat data experience
const createExperience = async (data) => {
    const { title, company, description, start_date, end_date } = data;

    const [result] = await db.query(
        'INSERT INTO experiences (title, company, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
        [title, company, description, start_date, end_date]
    );

    return result;
};

// Mengedit data experience
const updateExperience = async (id, data) => {
    const { title, company, description, start_date, end_date } = data;

    const [result] = await db.query(
        'UPDATE experiences SET title = ?, company = ?, description = ?, start_date = ?, end_date = ? WHERE id = ?',
        [title, company, description, start_date, end_date, id]
    );

    return result;
};

// Menghapus data experience
const deleteExperience = async (id) => {
    const [result] = await db.query(
        'DELETE FROM experiences WHERE id = ?',
        [id]
    );

    return result;
};

module.exports = {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
};