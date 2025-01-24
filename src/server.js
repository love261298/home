import fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { signIn, signUp } from './controllers/auth.js';
import { update } from './controllers/user.js';
dotenv.config();


const app = fastify();

// Kết nối đến MongoDB
mongoose.connect(process.env.URI_DB);
app.post('/signup', signUp);
app.post('/signin', signIn);
app.put('/', update);

app.listen({port: process.env.PORT}, () => {console.log(`server is running ${process.env.PORT}`)})

// Khởi động server
