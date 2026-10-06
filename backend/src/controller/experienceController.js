const experienceModel = require('../models/experienceModel');

// Mengambil semua data experience
const getAllExperience = async (req, res) => {
    try {
        const experiences = await experienceModel.getAllExperience();

        res.status(200).json({
            success: true,
            total: experiences.length,
            data: experiences
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Mengambil experience berdasarkan ID
const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await experienceModel.getExperienceById(id);

        if (!experience) {
            return res.status(404).json({
                success: false,
                message: 'Data tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: experience
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// Membuat data experience
const createExperience = async (req, res) => {
    try {
        const data = req.body;

        if (!data.title) {
            return res.status(400).json({
                success: false,
                message: 'Judul experience wajib diisi'
            });
        }

        const result = await experienceModel.createExperience(data);

        res.status(201).json({
            success: true,
            message: 'Experience ditambahkan',
            data: {
                id: result.insertId
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// UPDATE experience
const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!data.title) {
            return res.status(400).json({
                success: false,
                message: 'Judul experience wajib diisi'
            });
        }

        const result = await experienceModel.updateExperience(id, data);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Experience diperbarui'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// DELETE experience
const deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await experienceModel.deleteExperience(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Data tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Experience dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience
};