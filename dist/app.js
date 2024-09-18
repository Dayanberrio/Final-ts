"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var promise_1 = __importDefault(require("mysql2/promise"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var registerRoutes_1 = __importDefault(require("./routes/registerRoutes"));
var mueblesRoutes_1 = __importDefault(require("./routes/mueblesRoutes"));
var auth_1 = require("./middleware/auth");
dotenv_1.default.config();
var app = (0, express_1.default)();
// Configuración de CORS
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4321',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Configuración de la base de datos
var pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || '3306'),
});
// Configuración de sesiones
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'defaultsecret', // Asegúrate de que esta clave sea segura
    resave: false,
    saveUninitialized: false,
    store: new express_session_1.default.MemoryStore(), // Usamos el almacenamiento en memoria por defecto
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Asegúrate de que sea `true` en producción
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
    },
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api', registerRoutes_1.default);
app.use('/api', auth_1.isAuthenticated, mueblesRoutes_1.default);
exports.default = app;
