import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
const dbName = "pizzas";

const cliente = new MongoClient(uri);

async function realizarPedido(clienteId, pizzasId) {
    await cliente.connect();
    const db = cliente.db(dbName);
    const session = cliente.startSession();

    try {
        await session.withTransaction(async () => {
            const coleccionCliente = db.collection("clientes");
            const coleccionPizza = db.collection("pizzas");
            const coleccionIngredientes=db.collection("ingredientes")
            const coleccionPedidos = db.collection("pedidos");
            const coleccionRepartidores = db.collection("repartidores");

            const cliente = await coleccionCliente.findOne({ nombre: clienteId }, { session });
            const pizza = await coleccionPizza.findOne({ nombre: pizzasId }, { session });

            if (!cliente || !pizza) {
                throw new error("Cliente o pizza no existe");
            }
            
            if (pizza.stock <= 0) {
                throw new Error("Cantidad no disponible");
            }

            await coleccionPizza.updateOne(
                { nombre: pizza.nombre },
                { $inc: { stock: -1 } },
                { session }
            );

            const total =pizza.precio;

            await coleccionPedidos.insertOne({
                pizzas: [pizzasId],
                cliente: clienteId,
                total: total
            },{session}
            );

            const repartidor = await coleccionRepartidores.updateOne(
                { estado: "disponible" },
                { $set: { estado: "ocupado" } },
                {session}
            )
            if (repartidor.estado !== "disponible") {
                console.log("No hay repartidores disponibles")
            };

            await pedido.updateOne({
                cliente:clienteId,
                pizzas:[pizzasId],
                total:pedido.total,
                repartidorAsignado:repartidores.forEach(r=>{
                    r.repartidor+=1
                })
            })
        })
    } catch (error) {

    }
}