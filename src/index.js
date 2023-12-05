import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import session from 'express-session';

const app = express();

// Configuración de Handlebars
const hbs = exphbs.create({ extname: 'hbs' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de sesión
app.use(session({
    secret: 'tu_secreto_aqui',
    resave: true,
    saveUninitialized: true
}));

// Configuración de rutas
import sessionsRoutes from './routes/api/sessionsRoutes.js';
import viewsRoutes from './routes/views/viewsRoutes.js';
app.use('/api/sessions', sessionsRoutes);
app.use('/', viewsRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});



