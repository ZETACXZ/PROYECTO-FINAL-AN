import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import { generateRefresh, generateToken } from "../token/tokenManager.js";


export const register = async(req, res) => {
    const {email, password} = req.body;
    try {
       
        const user = new User({email, password});


        await user.save();
        //token
        const {token, expiresIn} = generateToken(user.id);
         generateRefresh(user.id, res);

        return res.status(201).json({token, expiresIn});

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
    const {token, expiresIn} = generateToken(user.id);
    generateRefresh(user.id, res);


    
   return res.json({ token, expiresIn});
}
catch (error) {
    console.log(error)

    return res.status(500).json({ error: "Error de Servidor" })
}
};

export const infoUser = async(req, res) => {
    try {
        const user = await User.findById(req.uid).lean();
        return res.json({ email: user.email, uid: user.id });
    } catch (error) {
        return res.status(500).json({ error: "error de servidor"});
        
    }
};
 
export const refreshToken = (req, res) => {
    try {
    const {token, expiresIn} = generateToken(req.uid);
    return res.json({ token, expiresIn});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "error de servidor"});
       }
    
};

export const logout = (req, res) => {
     res.clearCookie("refreshToken")
     res.json({ok: true})
};

