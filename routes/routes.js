import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout } from '../controllers/controllers.js';
import {body} from 'express-validator'
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from '../middlewares/requireToken.js';

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

 router.get("/protected", requireToken, infoUser);
 router.get("/refresh", refreshToken);
 router.get("/logout", logout);




export default router;