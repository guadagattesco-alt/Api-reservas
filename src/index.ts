import reservasRouter from "./routes/reservas.routes";
import mesasRouter from "./routes/mesas.routes";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import { AppDataSource } from "./data-source";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/reservas", reservasRouter);
app.use("/mesas", mesasRouter);
app.use("/app", express.static(path.join(__dirname, "..", "frontend")));


app.get("/", (_req, res) => {
    res.json({ mensaje: "API de reservas funcionando" });
});

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = Number(process.env.PORT) || 4000;

AppDataSource.initialize()
.then(() => {
    console.log("Base de datos conectada");
    app.listen(PORT, () => {
        console.log(`Servidor en http://localhost:${PORT}`);
        console.log(`Frontend en http://localhost:${PORT}/app`);
    });
})
.catch((error) => console.error("Error de conexión:", error));
