import { MongoClient } from "mongodb";
const uri = "mongodb+srv://camila:08072007@cluster0.upz3fbc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
            const coleccionIngredientes = db.collection("ingredientes")
            const coleccionPedidos = db.collection("pedidos");
            const coleccionRepartidores = db.collection("repartidores");

            const cliente = await coleccionCliente.findOne({ nombre: clienteId }, { session });
            const pizza = await coleccionPizza.findOne({ nombre: pizzasId }, { session });

            if (!cliente || !pizza) {
                throw new Error("Cliente o pizza no existe");
            }

            for( const ing of pizza.ingredientes){
            const ingrediente = await coleccionIngredientes.findOne({ nombre: ing.nombre }, { session });
                        if (!ingrediente || ingrediente.stock <= 0) {
                            throw new Error("Ingrediente no disponible");
                        }

                        await coleccionIngredientes.updateOne(
                            { nombre: ing.nombre },
                            { $inc: { stock: -1 } },
                            { session }
                        );

                        await coleccionPizza.updateOne(
                            {nombre:pizza.nombre,"ingredientes.nombre":ing.nombre},
                            {$inc:{"ingredientes.$.stock":-1}},
                            {session}
                        )

            }
            

            const total = pizza.precio;

            const repartidorAsignado = await coleccionRepartidores.findOne({ estado: "disponible" }, { session });
            if (!repartidorAsignado) {
                throw new Error("No hay repartidores disponibles")
            };
            await coleccionPedidos.insertOne({
                pizzas: [pizzasId],
                cliente: clienteId,
                total: total,
                repartidorAsignado:repartidorAsignado._id
            }, { session }
            );

            await coleccionRepartidores.updateOne(
                { _id: repartidorAsignado._id },
                { $set: { estado: "ocupado" } },
                { session }
            );
        });
    } catch (error) {
        console.log("Error ", error)
    }
    finally {
        await session.endSession();
        await cliente.close();
    }
}

realizarPedido("Santiago","Pizza Margarita")