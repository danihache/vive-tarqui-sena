require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { conexionContactos, conexionReservas, conexionResenas } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/contactos", (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({ error: "nombre, email, telefono y mensaje son requeridos" });
  }

  conexionContactos.query(
    "INSERT INTO contactos (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)",
    [nombre, email, telefono, mensaje], (err, resultado) => {
      if (err) return res.status(500).json({ error: "Error guardando el contacto" });
      res.json({id: resultado.insertId, nombre, email, telefono, mensaje});
    }
  );
});

app.get("/api/contactos", (req, res) => {
  conexionContactos.query("SELECT * FROM contactos ORDER BY created_at DESC", (err, resultado) => {
    if (err) return res.status(500).json({error: "Error en la base de datos"});
    res.json(resultado);
  });
});

app.get("/api/contactos/:id", (req, res) => {
  const { id } = req.params;
  
  conexionContactos.query(
    "SELECT * FROM contactos WHERE id = ?",
    [id],
    (err, resultado) => {
      if (err) return res.status(500).json({error: "Error en la base de datos"});
      if (resultado.length === 0) return res.status(404).json({error: "Contacto no encontrado"});
      res.json(resultado[0]);
    }
  );
});

app.put("/api/contactos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, mensaje } = req.body;
  
  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  
  conexionContactos.query(
    "UPDATE contactos SET nombre = ?, email = ?, telefono = ?, mensaje = ? WHERE id = ?",
    [nombre, email, telefono, mensaje, id],
    (err, resultado) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({error: "Error al actualizar el contacto"});
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Contacto no encontrado"});
      }
      res.json({id: parseInt(id), nombre, email, telefono, mensaje});
    }
  );
});

app.delete("/api/contactos/:id", (req, res) => {
  const { id } = req.params;
  
  conexionContactos.query(
    "DELETE FROM contactos WHERE id = ?",
    [id],
    (err, resultado) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({error: "Error al eliminar el contacto"});
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Contacto no encontrado"});
      }
      res.json({mensaje: "Contacto eliminado exitosamente", id: parseInt(id)});
    }
  );
});

app.post("/api/reservas/restaurante-bar", (req, res) => {
  const { tipo, lugar, nombre, telefono, fecha, hora, personas } = req.body;
  
  if (!tipo || !lugar || !nombre || !telefono || !fecha || !hora || !personas) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  
  conexionReservas.query(
    "INSERT INTO reservas (tipo, lugar, nombre, telefono, fecha, hora, personas) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [tipo, lugar, nombre, telefono, fecha, hora, personas], 
    (err, result) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({ error: "Error confirmando la reserva" });
      }
      
      res.json({
        id: result.insertId, 
        tipo,
        lugar, 
        nombre, 
        telefono, 
        fecha, 
        hora, 
        personas
      });
    }
  );
});

app.post("/api/reservas/hotel", (req, res) => {
  const { lugar, nombre, telefono, fecha, noches, personas } = req.body;
  
  if (!lugar || !nombre || !telefono || !fecha || !noches || !personas) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  
  conexionReservas.query(
    "INSERT INTO reservas (tipo, lugar, nombre, telefono, fecha, hora, noches, personas) VALUES ('hotel', ?, ?, ?, ?, NULL, ?, ?)",
    [lugar, nombre, telefono, fecha, noches, personas], 
    (err, result) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({ error: "Error confirmando la reserva" });
      }
      
      res.json({
        id: result.insertId,
        tipo: 'hotel',
        lugar, 
        nombre, 
        telefono, 
        fecha, 
        noches,
        personas
      });
    }
  );
});

app.get("/api/reservas", (req, res) => {
  const { tipo, lugar } = req.query;
  
  let query = "SELECT * FROM reservas";
  let params = [];
  let conditions = [];
  
  if (tipo) {
    conditions.push("tipo = ?");
    params.push(tipo);
  }
  
  if (lugar) {
    conditions.push("lugar = ?");
    params.push(lugar);
  }
  
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  
  query += " ORDER BY created_at DESC";
  
  conexionReservas.query(query, params, (err, resultado) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({error: "Error en la base de datos"});
    }
    res.json(resultado);
  });
});

app.get("/api/reservas/tipo/:tipo", (req, res) => {
  const { tipo } = req.params;
  
  conexionReservas.query(
    "SELECT * FROM reservas WHERE tipo = ? ORDER BY created_at DESC",
    [tipo],
    (err, resultado) => {
      if (err) return res.status(500).json({error: "Error en la base de datos"});
      res.json(resultado);
    }
  );
});

app.get("/api/reservas/:id", (req, res) => {
  const { id } = req.params;
  
  conexionReservas.query(
    "SELECT * FROM reservas WHERE id = ?",
    [id],
    (err, resultado) => {
      if (err) return res.status(500).json({error: "Error en la base de datos"});
      if (resultado.length === 0) return res.status(404).json({error: "Reserva no encontrada"});
      res.json(resultado[0]);
    }
  );
});

app.put("/api/reservas/:id", (req, res) => {
  const { id } = req.params;
  const { lugar, nombre, telefono, fecha, hora, noches, personas } = req.body;
  
  conexionReservas.query(
    "UPDATE reservas SET lugar = ?, nombre = ?, telefono = ?, fecha = ?, hora = ?, noches = ?, personas = ? WHERE id = ?",
    [lugar, nombre, telefono, fecha, hora || null, noches || null, personas, id],
    (err, resultado) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({error: "Error al actualizar la reserva"});
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Reserva no encontrada"});
      }
      res.json({id: parseInt(id), lugar, nombre, telefono, fecha, hora, noches, personas});
    }
  );
});

app.delete("/api/reservas/:id", (req, res) => {
  const { id } = req.params;
  
  conexionReservas.query(
    "DELETE FROM reservas WHERE id = ?",
    [id],
    (err, resultado) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({error: "Error al eliminar la reserva"});
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Reserva no encontrada"});
      }
      res.json({mensaje: "Reserva eliminada exitosamente", id: parseInt(id)});
    }
  );
});

app.get("/api/resenas", (req, res) => {
  const { lugarId } = req.query;
  
  if (!lugarId) {
    return res.status(400).json({ error: "lugarId es requerido" });
  }
  
  conexionResenas.query(
    "SELECT * FROM resenas WHERE lugarId = ? ORDER BY created_at DESC",
    [lugarId],
    (err, resultado) => {
      if (err) {
        console.error("Error al obtener reseñas:", err);
        return res.status(500).json({ error: "Error al obtener las reseñas" });
      }
      res.json(resultado);
    }
  );
});

app.post("/api/resenas", (req, res) => {
  const { lugarId, nombre, comentario, calificacion, fecha } = req.body;
  
  if (!lugarId || !nombre || !comentario || !calificacion || !fecha) {
    return res.status(400).json({ 
      error: "Todos los campos son requeridos: lugarId, nombre, comentario, calificacion, fecha" 
    });
  }
  
  conexionResenas.query(
    "INSERT INTO resenas (lugarId, nombre, comentario, calificacion, fecha) VALUES (?, ?, ?, ?, ?)",
    [lugarId, nombre, comentario, calificacion, fecha],
    (err, resultado) => {
      if (err) {
        console.error("Error al guardar reseña:", err);
        return res.status(500).json({ error: "Error al guardar la reseña" });
      }
      
      res.json({
        id: resultado.insertId,
        lugarId,
        nombre,
        comentario,
        calificacion,
        fecha
      });
    }
  );
});

app.get("/api/resenas/all", (req, res) => {
  conexionResenas.query(
    "SELECT * FROM resenas ORDER BY created_at DESC",
    (err, resultado) => {
      if (err) {
        console.error("Error al obtener todas las reseñas:", err);
        return res.status(500).json({ error: "Error al obtener las reseñas" });
      }
      res.json(resultado);
    }
  );
});

app.get("/api/resenas/:id", (req, res) => {
  const { id } = req.params;
  
  conexionResenas.query(
    "SELECT * FROM resenas WHERE id = ?",
    [id],
    (err, resultado) => {
      if (err) return res.status(500).json({error: "Error en la base de datos"});
      if (resultado.length === 0) return res.status(404).json({error: "Reseña no encontrada"});
      res.json(resultado[0]);
    }
  );
});

app.put("/api/resenas/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, comentario, calificacion } = req.body;
  
  if (!nombre || !comentario || !calificacion) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  
  conexionResenas.query(
    "UPDATE resenas SET nombre = ?, comentario = ?, calificacion = ? WHERE id = ?",
    [nombre, comentario, calificacion, id],
    (err, resultado) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({error: "Error al actualizar la reseña"});
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Reseña no encontrada"});
      }
      res.json({id: parseInt(id), nombre, comentario, calificacion});
    }
  );
});

app.delete("/api/resenas/:id", (req, res) => {
  const { id } = req.params;
  
  conexionResenas.query(
    "DELETE FROM resenas WHERE id = ?",
    [id],
    (err, resultado) => {
      if (err) {
        console.error("Error SQL:", err);
        return res.status(500).json({error: "Error al eliminar la reseña"});
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({error: "Reseña no encontrada"});
      }
      res.json({mensaje: "Reseña eliminada exitosamente", id: parseInt(id)});
    }
  );
});


app.get('/', (req, res) => {
  res.json({ mensaje: 'API Vive Tarquí funcionando correctamente' });
});

app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});