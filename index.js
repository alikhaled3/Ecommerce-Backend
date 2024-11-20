import  express  from 'express'
import {dbconection}  from './dbconnection/dbconnection.js'

import { bootstrap } from './src/utils/bootstrap.js';
import morgan from 'morgan';
import cors from "cors"
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())

app.use(express.static('uploads'))

    dbconection()
    app.use(morgan('dev'))
    bootstrap(app)

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))