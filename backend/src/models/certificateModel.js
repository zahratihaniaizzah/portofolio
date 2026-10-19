const db = require('../config/db');

// 1. GET ALL - Mengambil semua data sertifikat
const getAllCertificates = async () => {
    const [rows] = await db.query(
        'SELECT * FROM certifications ORDER BY issue_date DESC'
    );
    return rows;
};

// 2. GET BY ID - Mengambil sertifikat berdasarkan ID
const getCertificateById = async (id) => {
    const [rows] = await db.query(
        'SELECT * FROM certifications WHERE id = ?',
        [id]
    );
    return rows[0];
};

// 3. CREATE - Menambahkan sertifikat baru
const createCertificate = async (data) => {
    const {
        name, issuer, issue_date, expiration_date,
        credential_id, credential_url, description
    } = data;

    const [result] = await db.query(
        `INSERT INTO certifications
        (name, issuer, issue_date, expiration_date,
        credential_id, credential_url, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            name, issuer, issue_date, expiration_date || null,
            credential_id || null, credential_url || null,
            description || null
        ]
    );
    return result;
};

// 4. UPDATE - Memperbarui sertifikat berdasarkan ID
const updateCertificate = async (id, data) => {
    const {
        name, issuer, issue_date, expiration_date,
        credential_id, credential_url, description
    } = data;

    const [result] = await db.query(
        `UPDATE certifications SET
        name = ?, issuer = ?, issue_date = ?,
        expiration_date = ?, credential_id = ?,
        credential_url = ?, description = ?
        WHERE id = ?`,
        [
            name, issuer, issue_date, expiration_date || null,
            credential_id || null, credential_url || null,
            description || null, id
        ]
    );
    return result;
};

// 5. DELETE - Menghapus sertifikat berdasarkan ID
const deleteCertificate = async (id) => {
    const [result] = await db.query(
        'DELETE FROM certifications WHERE id = ?',
        [id]
    );
    return result;
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
};
