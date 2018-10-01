import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { default_type } from 'mime';
import bodyParser = require('body-parser');


class UserRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }


//ver todos los usuarios
public GetUsers(req: Request, res: Response): void{

        User.find({})
        .then((data) => {
            const status = req.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((err) => {
            const status = req.statusCode;
            res.json({
                status, 
                err
            });
        })

}

//ver un usuario
public GetUser(req: Request, res: Response): void{
    const username: string = req.params.username;

    User.findOne({ username }).populate('posts', '')
    .then((data) => {
        const status = req.statusCode;
        res.json({
            status,
            data
        });
    })
    .catch((err) => {
        const status = req.statusCode;
        res.json({
            status, 
            err
        });
    })


}

//crear usuario
public CreateUser(req: Request, res: Response): void{
    const name: string = req.body.name;
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    const user = new User({
        name, 
        username, 
        email,
        password
    });

    user.save()
    .then((data) => {
        const status = req.statusCode;
        res.json({
            status,
            data
        });
    })
    .catch((err) => {
        const status = req.statusCode;
        res.json({
            status, 
            err
        });
    })
}

//modificar usuario
public UpdateUser(req: Request, res: Response): void{

    const username: string = req.params.username;

    User.findOneAndUpdate({ username }, req.body)
    .then((data) => {
        const status = req.statusCode;
        res.json({
            status,
            data
        });
    })
    .catch((err) => {
        const status = req.statusCode;
        res.json({
            status, 
            err
        });
    })
        
}

//borrar usuario
public DeleteUser(req: Request, res: Response): void{

    const username: string = req.params.username;

    User.findOneAndRemove({ username })
    .then((data) => {
        const status = req.statusCode;
        res.json({
            status,
            data
        });
    })
    .catch((err) => {
        const status = req.statusCode;
        res.json({
            status, 
            err
        });
    })
        
}

    //@ts-ignore
    routes(){
        //@ts-ignore
        this.router.get('/', this.GetUsers);
        this.router.get('/:username', this.GetUser);
        this.router.post('/', this.CreateUser);
        this.router.put('/:username', this.UpdateUser);
        this.router.delete('/:username', this.DeleteUser);
    }

}

//export
//@ts-ignore
const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;


