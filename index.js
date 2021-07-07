const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`)
});

app.get('/', (req, res) => {
  db.respuesta = {
    codigo: 200,
    error: false,
    mensaje: 'punto de inicio'
  }
  res.send(db.respuesta)
})

app.get('/paises', (req, res) => {
  res.send(db.Paises);
})

/// CREAR PAÍS
app.post('/pais', (req, res) => {
  if (!req.body.nombre || !req.body.codigo_pais) {
    db.respuesta = {
      codigo: 400,
      error: true,
      mensaje: 'El campo nombre y Código de pais son requeridos'
    }
  } else {
    if (db.buscaPais(req.body.nombre)) {
        db.respuesta = {
        codigo: 409,
        error: true,
        mensaje: 'El pais ya existe'
      }
    } else {
      db.nuevoPais(req.body.nombre, req.body.codigo_pais);
      db.respuesta = {
        codigo: 200,
        error: false,
        mensaje: 'Pais Creado',
        respuesta: db.Paises
      }
    }
  }
  res.send(db.respuesta);
})


/// BORRAR UN PAÍS

app.delete('/pais/:pais', (req, res) => {
  if (db.buscaPais(req.params.pais)) {
    db.borrarPais(req.params.pais)
    db.respuesta = {
      codigo: 200,
      error: false,                
      mensaje: 'Pais eliminado correctamente',
    };
  } else {
    db.respuesta = {
      codigo: 404,
      error: true,                
      mensaje: 'No existe el Pais q intenta borrar',
    };
  }
  res.send(db.respuesta)
})

