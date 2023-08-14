const User = require("../modules/userModel");
const jwt = require("jsonwebtoken");
const mySecret = process.env.MYSECRET;
const bcrypt = require("bcrypt");
// const transporter = require('../mailConfig')

const UserController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    try {
      const user = await User.findOne({ email });
      console.log("soy user pass", user.password);
      console.log("soy  pass", password);
      if (!user) {
        return res.status(401).json({ error: "El usuario no existe" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Contraseña inválida" });
      }

      const token = jwt.sign({ user: user.email, id: user._id }, mySecret, {
        expiresIn: "1h",
      });
      return res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      res.status(500).json({ error: "Error al logearse" });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al traer los usuarios" });
    }
  },

  getUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findOne({ _id: userId });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al buscar el usuario" });
    }
  },

  getUserProfile: async (req, res) => {
    try {
      console.log("soy el req.info en UserController", req.userInfo.id);
      const { email, _id, userName, role, accounts } =
        await User.findById(req.userInfo.id);
      res.json({ email, _id, userName, role, accounts });
    } catch (error) {
      console.log("este es el error ", error);
      res.status(500).json({ error: "Error al buscar el usuario en /me" });
    }
  },

  addUser: async (req, res) => {
    console.log("soy add user");
    const { email, password, userName } = req.body;
    try {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        console.log(email);
        return res.status(401).json({ error: "El email ya está registrado" });
      }
      const existingUserName = await User.findOne({ userName });
      if (existingUserName) {
        return res
          .status(401)
          .json({ error: "El nombre de usuario ya está registrado" });
      }
      const newUser = new User({
        email,
        password,
        userName,
       
      });
      await newUser.save();

      const token = jwt.sign(
        { user: newUser.email, id: newUser._id },
        mySecret,
        { expiresIn: "1h" }
      );

      // const mailOptions = {
      //   to: newUser.email,
      //   subject: "Finantial Challenge : Registro finalizado. ",
      //   text: "Bienvenido a nuestro juego",
      // }

      // try {
      //   await transporter.sendMail(mailOptions);
      // } catch (error) {
      //   console.log(error);
      // }

      // console.log('despues de enviar mail');
      res.json({ message: "Registro exitoso", token });
      console.log("del adduser", token.data);
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  deleteUser: async (req, res) => {
   
      const { userId } = req.params;
      await User.deleteOne({ _id: userId });
      res.json(`El usuario con id ${userId} ha sido eliminado`);
    
  },

  putUser: async (req, res) => {
    const { userId } = req.params;
    await User.findOneAndReplace({ _id: userId }, { ...req.body });
    const user = await User.findOne({ _id: userId });
    res.json(user);
  },

  updateUser: async (req, res) => {
    const { userName, account, email, password } =
      await User.findById(req.userInfo.id);
    
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            userName,
            email,
            password,
            account,
          },
        }
      );
   
  },
  updateUserConfig: async (req, res) => {
    const userId = req.userInfo.id;
    const { userName, password, email } = req.body;

    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(
          userId,
          { $set: { password: hashedPassword } },
          { new: true }
        );
      }

      if (userName) {
        const existingUserName = await User.findOne({ userName });
        console.log("estoy dentor de exisiting", existingUserName);
        if (existingUserName) {
          return res
            .status(401)
            .json({ error: "El nombre de usuario ya está registrado" });
        }
      }

      if (email) {
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
          console.log("soy existingEmail", existingEmail);
          return res.status(401).json({ error: "El email ya está registrado" });
        }
      }
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { userName, email } },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      console.error("Error al actualizar el nombre de usuario:", error);
      res
        .status(500)
        .json({ error: "Error al actualizar el nombre de usuario" });
    }
  },
//   getBalance: async (req, res) => {
//     const { balance, account } = req.body;
//     try {
//       const accountData = await User.findOne({ account });
//       if (account === accountData) {
//         await User.updateOne(
//           {
//             account: account,
//           },
//           {
//             $set: {
//               balance,
//             },
//           }
//         );
//       } else {
//         res.json("esta cuenta no esxiste");
//       }
//     } catch (error) {
//       console.log("error al buscar la cuenta", error);
//     }
//   },
 };

module.exports = UserController;
