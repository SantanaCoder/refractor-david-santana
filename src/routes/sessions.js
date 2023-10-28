
import { Router } from 'express';
const routerS = Router()
//const user = require("../models/users.js");
import User from '../models/users.js'

routerS.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body

        const user = new User({ first_name, last_name, email, age, password })
        await user.save()

        res.redirect("/login")

    } catch (error) {
        res.status(500).send("Error de registro")
    }
})

export default routerS
