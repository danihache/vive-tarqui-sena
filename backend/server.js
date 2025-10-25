const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/contactos", (req, res) => {
  const { nombre, email, telefono, mensaje } = req.body;

  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({ error: "nombre, email, telefono y mensaje son requeridos" });
  }

  db.contactos.query(
    "INSERT INTO contactos (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)",
    [nombre, email, telefono, mensaje], (err, resultado) => {
      if (err) return res.status(500).json({ error: "Error guardando el contacto" });

      res.json({id: resultado.insertId, nombre, email, telefono, mensaje});
    }
  );
});

app.get("/api/contactos", (req, res) => {
    db.contactos.query("SELECT * FROM contactos", (err, resultado) => {
        if (err) return res.status(500).json({error: "Error en la base de datos"});
         res.json(resultado);
    })
})


app.post("/api/reservas/restaurante-bar", (req, res) => {
  const { tipo, lugar, nombre, telefono, fecha, hora, personas } = req.body;
  
  if (!tipo || !lugar || !nombre || !telefono || !fecha || !hora || !personas) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  
  db.reservas.query(
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
  
   db.reservas.query(
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
  
  db.reservas.query(query, params, (err, resultado) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({error: "Error en la base de datos"});
    }
    res.json(resultado);
  });
});

app.get("/api/reservas/tipo/:tipo", (req, res) => {
  const { tipo } = req.params;
  
  db.reservas.query(
    "SELECT * FROM reservas WHERE tipo = ? ORDER BY created_at DESC",
    [tipo],
    (err, resultado) => {
      if (err) return res.status(500).json({error: "Error en la base de datos"});
      res.json(resultado);
    }
  );
});


app.get("/api/resenas", (req, res) => {
  const { lugarId } = req.query;
  
  if (!lugarId) {
    return res.status(400).json({ error: "lugarId es requerido" });
  }
  
  db.resenas.query(
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
  
  db.resenas.query(
    "INSERT INTO resenas (lugarId, nombre, comentario, calificacion, fecha) VALUES (?, ?, ?, ?, ?)",
    [lugarId, nombre, comentario, calificacion, fecha],
    (err, resultado) => {
      if (err) {
        console.error("Error al guardar reseÃ±a:", err);
        return res.status(500).json({ error: "Error al guardar la reseÃ±a" });
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
  db.resenas.query(
    "SELECT * FROM resenas ORDER BY created_at DESC",
    (err, resultado) => {
      if (err) {
        console.error("Error al obtener todas las reseñas:", err);
        return res.status(500).json({ error: "Error al obtener las reseÃ±as" });
      }
      
      res.json(resultado);
    }
  );
});

app.listen(3000, () => {
    console.log("El servidor esta corriendo en el puerto http://localhost:3000")
});