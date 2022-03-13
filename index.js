//Instanciando modulos
const express = require("express")
const app = express()
const fs = require("fs")
const exphbrs = require("express-handlebars")

//Disponibilizando los assets y archivos css y js de Bootstrap
app.use(express.static(__dirname + "/assets"))
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/css"))
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/js"))

//configurando las vistas de handlebars-express
app.set("view engine", "handlebars")
app.engine("handlebars", exphbrs.engine({
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/componentes",
})
)

//disponibilizando la ruta raíz y enviando un archivo json con los productos al layout de inicio
app.get("/", (req, res) => {
    const productos = JSON.parse(fs.readFileSync(__dirname + "/assets/productos.json", "utf-8")).productos
    res.render("inicio", {layout: "Inicio", productos: productos})
})

//escuchando el puerto 3000
app.listen(3000, () => console.log("Servidor levantado en puerto 3000"))