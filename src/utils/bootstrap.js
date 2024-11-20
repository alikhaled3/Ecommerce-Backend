import cateyoryRouter from "../modules/category/category.routes.js"
import { AppError } from "./AppError.js"
import subCateyoryRouter from './../modules/subCategory/subcategory.routes.js';
import brandRouter from "../modules/brand/brand.routes.js";
import productRouter from './../modules/product/product.routes.js';
import userRouter from "../modules/user/user.routes.js";
import authRouter  from "../modules/auth/auth.routes.js";
import reviewRouter from "../modules/review/review.routes.js";
import wishlistRouter from "../modules/whishList/whishList.routes.js";
import addressesRouter from "../modules/adresses/address.routes.js";
import couponRouter from "../modules/coupon/coupon.routes.js";
import cartRouter from "../modules/cart/cart.routes.js";
import orderRouter from "../modules/order/order.routes.js";

export function bootstrap(app){
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/api/v1/category',cateyoryRouter)
    app.use('/api/v1/subcategory',subCateyoryRouter)
    app.use('/api/v1/brand',brandRouter)
    app.use('/api/v1/product',productRouter)
    app.use('/api/v1/user',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/review',reviewRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/adresses',addressesRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',cartRouter)
    app.use('/api/v1/order',orderRouter)

    app.all('*',(req,res,next)=>{
     next(new AppError('not found endpoint',404) )
    })
    app.use((err,req,res,next)=>{
        let stack =err.stack
        let error = err.message
        let code = err.statusCode || 500
        res.status(code).json({error ,"stack" :stack})
    })
}