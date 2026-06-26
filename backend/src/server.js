import express from 'express';
import dotenv from 'dotenv';    
dotenv.config();
import { connectDb } from './lib/db.js';
import { ENV } from './lib/env.js';
import cors from 'cors';
import  http  from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken'


import authRoutes from './routes/auth.routes.js'
import verifyToken from './middleware/verifyToken.js';
import jobRoutes from './routes/job.routes.js'
import applyRoutes from './routes/application.route.js'
import noticeRoutes from './routes/notice.route.js'

const app = express();

const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", ENV.FRONTEND_URL],
            methods: ["POST", "GET"]
        }
    })
app.set('socketio', io);

io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
        return next(new Error("Authentication error: Token missing"));
    }

    try {
        // Verify token using your existing JWT Secret Key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded; // Attach the user payload directly to the socket instance
        next();
    } catch (err) {
        return next(new Error("Authentication error: Invalid token"));
    }
});

io.on('connection', (socket) => {
    console.log(`⚡ A user connected to WebSockets: ${socket.id}`);
    socket.on('disconnect',()=>{
        console.log('❌ User disconnected from WebSockets');
    })
})


app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173",ENV.FRONTEND_URL], // or your real deployed website URL
    credentials: true
}));
// Authoriztion
app.use('/api/auth', authRoutes);
// post job
app.use('/api/jobs', jobRoutes);
// apply for jobs
app.use('/api/applications', applyRoutes);
app.get('/api/test', verifyToken, (req, res) => {

    res.status(200).send({ message: "successfull" });

})

// post Notice
app.use('/api/notice', noticeRoutes);


// Test
app.get("/", (req, res) => {
    res.status(200).send("server is live");
})


const startServer = async () => {
    try {
        await connectDb();
        server.listen(ENV.PORT, () => {
            console.log(`server running on ${ENV.PORT}`)
        })
    }
    catch (error) {
        console.log("Server error", error);
    }
}
startServer();