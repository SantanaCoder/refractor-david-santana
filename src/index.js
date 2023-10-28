import express from "express";
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars';
import session from "express-session";
import FileStore  from "session-file-store";
import routerS from "./routes/sessions.js"
import routerC from "./routes/views.js"
import MongoStore from "connect-mongo";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = 8080

const fileStorage = FileStore(session)
const app = express();

/*app.use(cookieParser())
app.use(session({
    store: new fileStorage({path:'./sessions', ttl: 100, retries:0}),
    secret:"Clavesecreta",
    resave: false,
    saveUnitializated: false
}))*/
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://davisanta4040:TeTwEiTApsENE2nM@cluster0.wsqlgqw.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions:{ useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 15
    }),
    secret:"Clavesecreta",
    resave: false,
    saveUnitializated: false
}))

/*app.get("/", (req, res) => {
    res.send("Desde ela home papu")
})*/


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', 'handlebars')


app.use("/api/sessions", routerS)
app.use("/", routerC)

app.listen(PORT,() =>{
    console.log(`servidor corriendo en el puerto ${PORT}`);
})