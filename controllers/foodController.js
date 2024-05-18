import fs from "fs"
import foodModel from "../models/foodModel.js";
import nodemailer from 'nodemailer'



const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;


    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })

    try {
        await food.save()
        res.json({ success: true, message: "Food Added" })

        // {
        

        //     const transporter = nodemailer.createTransport({
        //         service:"email",
        //         port: 465,
        //         secure: true,
        //         logger: true,
        //         debug: true,
        //         secureConnection: false,
        //         auth: {
        //             user: 'sudhiryadavcse@gmail.com',
        //             pass: 'mceacjetxeytodkx'
        //         },
        //         tls: {
        //              rejectUnAuthorized:true
        //         }
        //     });

        //     let mailOptions = {
        //         from: 'sudhiryadavcse@gmail.com',
        //         to: 'sk14395257e@gmail.com',
        //         subject: 'Sending Email using Node.js',
        //         text: 'That was easy!'
        //     };

        //     transporter.sendMail(mailOptions, function (error, info) {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log('Email sent: ' + info.response);
        //         }
        //     });
        // }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}
const listfood = async (req, res) => {

    try {

        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.log(error); I
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, listfood, removeFood }