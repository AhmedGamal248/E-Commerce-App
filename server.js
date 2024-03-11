import express from 'express'
import { DBconnection } from './databases/DBconnection.js';
import { bootstrap } from './databases/models/index.routes.js';
import { authRouter } from './src/moduels/auth/auth.router.js';
import cors from 'cors'
import 'dotenv/config'
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))
app.use(authRouter)
bootstrap(app)

DBconnection()
app.listen(port,(req,res)=> {
    console.log(`server is running on port ${port}...`)
})