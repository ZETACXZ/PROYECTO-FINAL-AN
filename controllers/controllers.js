import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'


export const register = async(req, res) => {
    const {email, password} = req.body;
    try {
       
        const user = new User({email, password});


        await user.save();
        return res.status(201).json({ok: true});


    } catch (error) {
        console.log(error.code);
        if(error.code === 11000){
            return res.status(400).json({ error: "Ya existe este Usuario" });
        }

        return res.status(500).json({ error: "Error de Servidor" })

    }
    
};


export const login =  async (req, res) => {
try{
    const {email, password} = req.body;

    let user = await User.findOne({email});

    if(!user)  return res.status(403).json({ error: "No Existe este Usuario"});


    const respuestaPassword = await user.comparePassword(password)
    if (!respuestaPassword)
    return res.status(403).json({ error: "Contraseña Incorrecta"})

    //Token de JWT
    const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET);


   return res.json({ token});
}
catch (error) {
    console.log(error)

    return res.status(500).json({ error: "Error de Servidor" })
}
};

