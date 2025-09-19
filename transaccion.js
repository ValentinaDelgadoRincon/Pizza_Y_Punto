import { MoncgoClient} from "mongodb";
const uri = "mongodb://localhost:27017";
const dbName="pizzas";

const cliente = new MoncgoClient(uri);

async function realizarPedido(clienteId, pizzasId) {
    await cliente.connect();
    const db = cliente.db(dbName);
    const session = cliente.startSession();

    try {
        await session.withTransaction(async()=>{
            const coleccion = db.collection("pizzas");

            if(ingredientes.stock <= 0){
                throw new Error("Cantidad no disponible");
            }

            const cliente = await coleccion.findOne({nombre:clienteId},{session});
            const pizza = await coleccion.findOne({nombre:pizzasId},{session});

            if(!cliente || !pizza ){
                throw new error("Cliente o pizza no existe");
            }
            await coleccion.updateOne(
                {nombre:pizza},
                {$inc:{stock:}}
            )
        })
    } catch (error) {
        
    }
}