const db = require('../config/db');

// Ini Tampilankan semua data
const getAllskill = async () => {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY category, name');
    return rows;
};

// ini tampilkan semua data berdasarkan id
const getskillById = async (id) => {
    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
    return rows[0];
};

// membuat data
const createskill = async (data) => {
    const { name, category, percentage, icon_url } = data;
    const [result] = await db.query(
        'INSERT INTO skills (name, category, percentage, icon_url) VALUES (?, ?, ?, ?)',
        [name, category || 'other', percentage || 0, icon_url]
    );
    return result;
};

// mengedit data
const updateskill = async (id, data) => {
const { name, category, percentage, icon_url } = data;
    const [result] = await db.query(
        'UPDATE skills SET name = ?, category = ?, percentage = ?, icon_url = ? WHERE id = ?',
        [name, category, percentage, icon_url, id]
    );
    return result;
};

const deleteskill = async (id) => {
const [result] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
return result;
};

module.exports = {getAllskill, getskillById, createskill, updateskill, deleteskill };