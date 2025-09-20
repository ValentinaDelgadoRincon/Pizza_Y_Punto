import { MongoClient } from "mongodb";
import { ingredientesMasUsados, promedioPrecioPorCategoria, categoriaMasVendida } from "./aggregation.js";

const uri = "mongodb+srv://camila:08072007@cluster0.upz3fbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "pizzas";
const cliente = new MongoClient(uri);

async function funcionalidad() {
    try {
        await cliente.connect();
        console.log("Conectado a MongoDB");
        const db = cliente.db(dbName);

        await ingredientesMasUsados(db);
        await promedioPrecioPorCategoria(db);
        await categoriaMasVendida(db);

    } catch (err) {
        console.error(" Error:", err);
    } finally {
        await cliente.close();
    }
}

funcionalidad();
