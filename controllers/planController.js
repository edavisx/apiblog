const db = require('../config/db');

exports.getAllPlanes = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM planes;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener posts' });
  }
};

exports.createPlan = async (req, res) => {
  const { titulo, descripcion, fecha, lugar, capacidad } = req.body;
  const userId = req.user.id;
  try {
    const result = await db.query(
      'INSERT INTO planes (titulo, descripcion, fecha, lugar, capacidad, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [titulo, descripcion, fecha, lugar, capacidad, userId]
    );
    res.json({ message: 'Plan creado', planId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el plan' });
  }
};
