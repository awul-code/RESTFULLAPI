import express, { Application, NextFunction, Request, Response } from 'express'

const app: Application = express()
const port: number = 4000

app.use('/health', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: '200', data: 'hello world' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
