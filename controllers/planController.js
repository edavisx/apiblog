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

exports.getPlanesByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await db.query('SELECT * FROM posts WHERE user2_id = $1', [userId]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener posts del usuario' });
  }
};


exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el post' });
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

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;
  try {
    const result = await db.query(
      'UPDATE posts SET titulo = $1, descripcion = $2 WHERE id = $3',
      [titulo, descripcion, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado o sin cambios' });
    }
    res.json({ message: 'Post actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar post' });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM posts WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ message: 'Post eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar post' });
  }
};
