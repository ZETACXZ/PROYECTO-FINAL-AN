import { validationResult, body, param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

     if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
}
    next();
};

export const paramLinkValidator = [
    param("id", "Formato no Valido (expressValidator)")
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress
]

export const bodyLinkValidator = [
    body("longLink", "Formato de Link Incorrecto👀").trim().notEmpty()
    .custom(async value => {
        try {
            if (!value.startsWith('https://')){
                value = 'https://' + value;
            }
            


            await axios.get(value)
            return value
        } catch (error) {
            console.log(error)
            throw new Error('⛔no funciona longLink 404⛔')
        }

    })
    
    ,validationResultExpress,
];

export const bodyRegisterValidator =  [
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
    validationResultExpress
 ];

 export const bodyLoginValidator = [body('email', "Formato de email incorrecto")
 .trim()
 .isEmail()
 .normalizeEmail(),
 body("password", "Minimo 7 Caracteres")
 .trim()
 .isLength({min: 7}),

  validationResultExpress 
];