import { Router } from 'express';
import { login, register } from '../controllers/controllers.js';
import {body} from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';

const router = Router()

router.post(
    '/register',
 [
    body('email', "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("password", "Minimo 7 Caracteres")
    .trim()
    .isLength({min: 7}),
    body("password", " formato de password incorrecta")
    
    .custom((value, {req}) => {
        if(value !== req.body.repassword){
            throw new Error('No coinciden las passwords')
        }
        return value;
    }),
 ],
 validationResultExpress,
 register 

);


router.post('/login',[body('email', "Formato de email incorrecto")
.trim()
.isEmail()
.normalizeEmail(),
body("password", "Minimo 7 Caracteres")
.trim()
.isLength({min: 7}),],

 validationResultExpress,
 login );



export default router;