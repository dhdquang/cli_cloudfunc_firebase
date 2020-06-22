import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from '../interfaces/IControllerBase.interface'
import { HomeModel, Home } from '../models/home.model'

class HomeController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/home', this.index)
        this.router.post('/home', this.create)
    }

    index = async (req: Request, res: Response) => {
        let homeModel = new HomeModel()
        let data = await homeModel.homeRepository.execute([], 100)
        res.send({ data })
    }

    create = async (req: Request, res: Response) => {
        let homeModel = new HomeModel()
        let home = new Home()
        home.name = 'home_' + (new Date).getTime()
        let data = await homeModel.homeRepository.create(home)
        res.send({ data })
    }
}

export default HomeController