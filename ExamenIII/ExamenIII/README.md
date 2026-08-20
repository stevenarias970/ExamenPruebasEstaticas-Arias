# InventarioJS

Proyecto de práctica para el laboratorio de **Pruebas Estáticas con SonarCloud**.

Este módulo simula un sistema básico de gestión de inventario (agregar, eliminar,
actualizar stock, calcular valor total, aplicar descuentos, autenticar un
administrador y generar un reporte).

**Importante:** el código contiene defectos y malas prácticas colocadas a propósito
(variables sin usar, comparaciones con `==`, bloques `catch` vacíos, código
duplicado, uso de `eval`, credenciales quemadas en el código, alta complejidad
ciclomática, etc.) para que el analizador estático (SonarCloud) los detecte
durante la práctica. No corrija nada hasta que el laboratorio se lo indique.

## Archivos

- `inventario.js` — lógica del inventario (aquí están los defectos).
- `package.json` — metadatos del proyecto (no tiene dependencias externas).

## Uso

Este proyecto no requiere instalación. Solo debe subirse tal cual a un
repositorio de GitHub nuevo y conectarse a SonarCloud, siguiendo las
instrucciones del laboratorio.
