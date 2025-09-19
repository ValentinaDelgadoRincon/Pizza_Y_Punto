# 🍕 Pizza y Punto

Bienvenid@ al sistema de **gestión de pedidos, inventario y ventas** para la cadena de pizzerías **Pizza y Punto**.  
Este proyecto busca resolver el caos de la cocina con un sistema modular y robusto en **Node.js + MongoDB**.  

---

## 🚀 Características principales

- 📦 **Gestión de Pedidos**: registra pedidos completos de clientes.  
- 🧀 **Control de Inventario**: descuenta ingredientes automáticamente según los pedidos.  
- 🛵 **Asignación de Repartidores**: asignación automática según disponibilidad.  
- 📊 **Reportes con Aggregation Framework**: pizzas más populares, ventas por categoría, ingredientes más consumidos.  
- 🔒 **Transacciones**: asegura consistencia en múltiples colecciones al registrar pedidos.  
- 💻 **Interfaz CLI** con `inquirer`: manejo amigable desde la consola.  

---

## 📂 Estructura de Datos

### 🧀 Ingredientes
```json
{
  "nombre": "Mozzarella",
  "tipo": "queso",
  "stock": 50
}
```

### 🍕 Pizzas
```json
{
  "nombre": "Margarita",
  "categoria": "tradicional",
  "precio": 25000,
  "ingredientes": ["Mozzarella", "Salsa de Tomate", "Albahaca"]
}
```

### 📦 Pedidos
```json
{
  "clienteId": "abc123",
  "pizzas": ["Margarita", "Hawaiana"],
  "total": 50000,
  "fecha": "2025-09-19T16:00:00Z",
  "repartidorAsignado": "rep01"
}
```

### 🛵 Repartidores
```json
{
  "nombre": "Carlos Pérez",
  "zona": "Norte",
  "estado": "disponible"
}
```

### 👤 Clientes
```json
{
  "nombre": "Ana Torres",
  "telefono": "3001234567",
  "direccion": "Calle 123 #45-67"
}
```

---

## 🛠️ Tecnologías utilizadas

- [Node.js](https://nodejs.org/) ⚡
- [MongoDB](https://www.mongodb.com/) 🍃
- [Inquirer](https://www.npmjs.com/package/inquirer) 🎛️

---

## 📖 Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/pizza-y-punto.git
   cd pizza-y-punto
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar la conexión a MongoDB en el archivo `config/db.js`.

4. Ejecutar la aplicación:
   ```bash
   node index.js
   ```

---

## 📊 Ejemplos de Agregaciones

- **Top 5 pizzas más vendidas**
- **Ingredientes más usados en el mes**
- **Ventas por categoría**
- **Zonas con mayor demanda de pedidos**

---

## 👥 Autores

- https://github.com/ValentinaDelgadoRincon
- https://github.com/CamilaFlorez12 

---