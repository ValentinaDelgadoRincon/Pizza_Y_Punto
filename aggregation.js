import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/";
const dbName = "pizzas";

const cliente = new MongoClient(uri);

// 1.¿Cuáles son los ingredientes más utilizados en los pedidos del último mes?

export async function ingredientesMasUsados(db) {
    const fechaInicio = new Date();
    fechaInicio.setMonth(fechaInicio.getMonth() - 1);

    const resultados = await db.collection("pedidos").aggregate([
        { $match: { fecha: { $gte: fechaInicio } } },
        { $unwind: "$pizzas" },
        {
            $lookup: {
                from: "pizzas",
                localField: "pizzas",
                foreignField: "_id",
                as: "infoPizza",
            },
        },
        { $unwind: "$infoPizza" },
        { $unwind: "$infoPizza.ingredientes" },
        {
            $group: {
                _id: "$infoPizza.ingredientes",
                totalUsos: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: "ingredientes",
                localField: "_id",
                foreignField: "_id",
                as: "ingredienteInfo",
            },
        },
        { $unwind: "$ingredienteInfo" },
        {
            $project: {
                _id: 0,
                nombre: "$ingredienteInfo.nombre",
                totalUsos: 1,
            },
        },
        { $sort: { totalUsos: -1 } },
    ]).toArray();
    console.log("Los inngredientes más utilizados en el último mes son: ");

    resultados.forEach(r => {
        console.log(`- ${r.nombre}: ${r.totalUsos} usos`);
    });
}


// 2.¿Cuál es el promedio de precios por categoría de pizza?

export async function promedioPrecioPorCategoria(db) {
    const resultados = await db.collection("pizzas").aggregate([
        {
            $group: {
                _id: "$categoria",
                promedioPrecio: { $avg: "$precio" },
            },
        },
        { $sort: { promedioPrecio: -1 } },
    ]).toArray();

    console.log("\nPromedio de precios por categoría:");
    resultados.forEach(r => {
        console.log(`- ${r._id}: $${r.promedioPrecio.toFixed(2)}`);
    });
}


// 3.¿Qué categoría de pizzas ha tenido más ventas históricas?

export async function categoriaMasVendida(db) {
    const resultados = await db.collection("pedidos").aggregate([
        { $unwind: "$pizzas" },
        {
            $lookup: {
                from: "pizzas",
                localField: "pizzas",
                foreignField: "_id",
                as: "infoPizza",
            },
        },
        { $unwind: "$infoPizza" },
        {
            $group: {
                _id: "$infoPizza.categoria",
                totalVentas: { $sum: 1 },
            },
        },
        { $sort: { totalVentas: -1 } },
        { $limit: 1 },
    ]).toArray();
    const top = resultados[0];
    console.log(`\nCategoría más vendida históricamente: ${top._id} con ${top.totalVentas} ventas`);
} 