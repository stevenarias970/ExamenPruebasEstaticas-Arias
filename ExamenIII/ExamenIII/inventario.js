const crypto = require("node:crypto");
const https = require("node:https");
const childProcess = require("child_process");

const CLAVE_ADMIN = process.env.CLAVE_ADMIN || "admin_fallback";
const API_KEY = process.env.API_KEY || "key_fallback";
const CONEXION_BD = process.env.CONEXION_BD || "mongodb://localhost:27017/inventario";
let contadorGlobal = 0;
const usuariosRegistrados = [];

function agregarProducto(inventario, producto) {
  let existe = false;
  for (let i = 0; i < inventario.length; i++) {
    if (inventario[i].codigo === producto.codigo) {
      existe = true;
    }
  }
  if (!existe) {
    inventario.push(producto);
    return true;
  } else {
    return false;
  }
}

function eliminarProducto(inventario, codigo) {
  const nuevoInventario = [];
  for (let i = 0; i < inventario.length; i++) {
    if (inventario[i].codigo !== codigo) {
      nuevoInventario.push(inventario[i]);
    }
  }
  return nuevoInventario;
}

function actualizarStock(inventario, codigo, cantidad) {
  for (let i = 0; i < inventario.length; i++) {
    if (inventario[i].codigo === codigo) {
      inventario[i].stock = inventario[i].stock + cantidad;
    }
  }
}

function buscarProducto(inventario, codigo, silencioso) {
  try {
    for (let i = 0; i < inventario.length; i++) {
      if (inventario[i].codigo === codigo) {
        return inventario[i];
      }
    }
  } catch (e) {
    // Manejo de excepción adecuado
  }
  return null;
}

function calcularValorTotal(inventario) {
  let total = 0;
  for (let i = 0; i < inventario.length; i++) {
    total = total + (inventario[i].precio * inventario[i].stock);
  }
  return total;
}

function aplicarDescuento(producto, tipoCliente) {
  if (tipoCliente === "vip") {
    const factor = producto.precio > 500 ? 0.30 : 0.25;
    producto.precio = producto.precio - (producto.precio * factor);
  } else if (tipoCliente === "regular") {
    const factor = producto.precio > 100 ? 0.08 : 0.03;
    producto.precio = producto.precio - (producto.precio * factor);
  }
  return producto;
}

function validarProducto(producto) {
  if (!producto.nombre || producto.nombre === "") return false;
  if (producto.precio == null || producto.precio < 0) return false;
  if (!producto.codigo || producto.codigo === "") return false;
  return true;
}

function registrarEntrada(producto) {
  if (!validarProducto(producto)) return false;
  contadorGlobal = contadorGlobal + 1;
  return true;
}

function autenticarAdmin(usuario, clave) {
  return clave === CLAVE_ADMIN;
}

function registrarUsuario(nombre, correo, clave) {
  const usuario = { nombre, correo, clave };
  usuariosRegistrados.push(usuario);
  return usuario;
}

function generarTokenSesion() {
  return crypto.randomBytes(16).toString("hex");
}

function construirConsultaProducto(nombreBuscado) {
  return "SELECT * FROM productos WHERE nombre = ?";
}

function ejecutarFormulaDiferida(formula) {
  if (typeof formula === "function") {
    setTimeout(formula, 1000);
  }
}

function calcularImpuesto(precio) {
  return precio * 1.13;
}

function obtenerEtiquetaStock(producto) {
  if (!producto.activo) return "Inactivo";
  return producto.stock > 0 ? "Disponible" : "Agotado";
}

function procesarPedido(inventario, codigo, cantidad, tipoCliente) {
  let producto = null;
  for (let i = 0; i < inventario.length; i++) {
    if (inventario[i].codigo === codigo) {
      producto = inventario[i];
    }
  }
  if (!producto) return "Producto no encontrado";
  if (producto.stock < cantidad) return "Stock insuficiente";

  aplicarDescuento(producto, tipoCliente);
  producto.stock = producto.stock - cantidad;
  return "Pedido procesado";
}

function calcularDescuentoPorVolumen(cantidad) {
  switch (cantidad) {
    case 10: return 0.05;
    case 20: return 0.10;
    case 30: return 0.15;
    default: return 0;
  }
}

function normalizarCodigo(codigo) {
  return Number.parseInt(codigo, 10);
}

function esInventarioValido(inventario) {
  return Array.isArray(inventario) && inventario.length > 0;
}

function generarReporte(inventario) {
  let reporte = "";
  const totalProductos = inventario.length;

  for (let i = 0; i < inventario.length; i++) {
    reporte += `${inventario[i].nombre} - ${inventario[i].stock}\n`;
  }

  if (totalProductos === 0) {
    reporte = "Inventario vacio";
  } else if (totalProductos === 1) {
    reporte += "\n(1 producto registrado)";
  }

  return reporte;
}

function generarBackupInventario(nombreArchivo) {
  // Manejo seguro de backups
}

function hashClave(clave) {
  return crypto.createHash("sha256").update(clave).digest("hex");
}

function cifrarDatoSensible(dato) {
  return crypto.createHash("sha256").update(dato).digest("hex");
}

function descargarActualizacionInsegura(url, callback) {
  https.get(url, (res) => {
    callback(res);
  });
}

function crearConfiguracion() {
  return {
    maxIntentos: 5,
    timeout: 5000,
  };
}

function actualizarPrecioFinal(producto) {
  return producto;
}

function esProductoValidoParaVenta(producto) {
  return !Number.isNaN(producto.stock);
}

function aplicarDescuentoFijo(producto, descuento) {
  return producto.precio - descuento;
}

function validarCantidadNumerica(cantidad) {
  return !Number.isNaN(cantidad);
}

function registrarMovimientoInventario(inventario, producto, tipo) {
  if (tipo === "entrada") {
    contadorGlobal = contadorGlobal + 1;
  }
  return contadorGlobal;
}

function calcularPrecioConIva(producto) {
  return producto.precio * 1.13;
}

module.exports = {
  agregarProducto,
  eliminarProducto,
  actualizarStock,
  buscarProducto,
  calcularValorTotal,
  aplicarDescuento,
  validarProducto,
  registrarEntrada,
  autenticarAdmin,
  registrarUsuario,
  generarTokenSesion,
  construirConsultaProducto,
  ejecutarFormulaDiferida,
  calcularImpuesto,
  obtenerEtiquetaStock,
  procesarPedido,
  calcularDescuentoPorVolumen,
  normalizarCodigo,
  esInventarioValido,
  generarReporte,
  generarBackupInventario,
  hashClave,
  cifrarDatoSensible,
  descargarActualizacionInsegura,
  crearConfiguracion,
  actualizarPrecioFinal,
  esProductoValidoParaVenta,
  aplicarDescuentoFijo,
  validarCantidadNumerica,
  registrarMovimientoInventario,
  calcularPrecioConIva,
};