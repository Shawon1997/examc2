const express = require("express");
const mongoose = require("mongoose")


const app = express()

app.use(express.json());
const connect = () => {
    return mongoose.connect("mongodb+srv://Shawon1997:jaya1997@cluster0.4qkrr.mongodb.net/test")

}
const userShema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    addres: { type: String, required: true },
    gender: { type: String, required: false },
    type: { type: String, required: false },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    versionKey: false,
    timeseries: true
});
const User = mongoose.model("user", userShema)


const branchShema = new mongoose.Schema({
    name: { type: String, required: true },
    addres: { type: String, required: true },
    IFSC: { type: String, required: false },
    MICR: { type: Number, required: false },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    versionKey: false,
    timeseries: true
});
const Branch = mongoose.model("branch", branchShema)


const masterShema = new mongoose.Schema({
    blance: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "branch", required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    versionKey: false,
    timeseries: true
});
const Master = mongoose.model("master", masterShema)
const userMasterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    masterId: { type: mongoose.Schema.Types.ObjectId, ref: "master", required: true },
})

const userMaster = mongoose.model("usermaster", userMasterSchema)



const savingsShema = new mongoose.Schema({
    blance: { type: String, required: true },
    acount_number: { type: String, required: true, unique: true },
    interestRate: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    versionKey: false,
    timeseries: true
});
const Savings = mongoose.model("saving", savingsShema)

const fixedShema = new mongoose.Schema({
    account_number: { type: String, required: true, unique: true },
    blance: { type: String, required: true },
    interestRate: { type: String, required: true },
    startDate: { type: String, required: true },
    maturitytDate: { type: String, required: true },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
}, {
    versionKey: false,
    timeseries: true
});
const Fixed = mongoose.model("fixed", fixedShema)

app.get("/user", async(req, res) => {
    try {
        const master = User.find().lean().exec()
        return res.status(200).send(master)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})
app.post("/user", async(req, res) => {
    try {
        const master = User.create(req.body)
        return res.status(201).send(master)
    } catch (err) {
        return res.status(500).send(err.message)
    }
})

app.listen(3999, async() => {
    try {
        await connect()
    } catch (err) {
        console.log(err)
    }
    console.log("i am in port no 3999")
})