import { Router, Request, Response, NextFunction } from 'express';
import Post from '../models/Post';
import { default_type } from 'mime';

class PostRouter{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }



public GetPosts(req: Request, res: Response): void{

        Post.find({})
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

public GetPost(req: Request, res: Response): void{
    const slug: string = req.params.slug;

    Post.findOne({ slug })
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

public CreatePost(req: Request, res: Response): void{
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const content: string = req.body.content;
    const featuredImage: string = req.body.featuredImage;

    const post = new Post({
        title, 
        slug, 
        content,
        featuredImage
    });

    //@ts-ignore
    post.save()
    .then((data) => {
        res.status(201)
        res.json({
            status,
            data
        });
    })
    .catch((err) => {
        console.log('entra en el error')
        const status = req.statusCode;
        res.json({
            status, 
            err
        });
    })
}

public UpdatePost(req: Request, res: Response): void{

    const slug: string = req.params.slug;

    Post.findOneAndUpdate({ slug }, req.body)
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

public DeletePost(req: Request, res: Response): void{

    const slug: string = req.params.slug;

    Post.findOneAndDelete({ slug })
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


    routes(){
        this.router.get('/', this.GetPosts);
        this.router.get('/:slug', this.GetPost);
        this.router.post('/:', this.CreatePost);
        this.router.put('/:slug', this.UpdatePost);
        this.router.delete('/:slug', this.DeletePost);
    }

}

//export
const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;


