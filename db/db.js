let Paises = {};

const respuesta = {
  codigo: 200,
  error: false,
  mensaje: ''
}

const id = {
  conteo: 0
}

class Pais {
  constructor(nombre, codigo_pais) {
    this.nombre = nombre;
    this.codigo_pais = codigo_pais;
    this.id = id.conteo;
  }
}

const nuevoPais = (nombre, codigo_pais) => {
  Paises[nombre] = new Pais(nombre, codigo_pais);
  id.conteo ++;
}


const buscaPais = (nombre) => {
  if (Paises.hasOwnProperty(nombre)) {
    return true;
  } else {
    return false;
  }
}

const borrarPais = (nombre) => {
  delete Paises[nombre];
}


module.exports = {
  Paises,
  respuesta,
  nuevoPais,
  buscaPais,
  borrarPais
}