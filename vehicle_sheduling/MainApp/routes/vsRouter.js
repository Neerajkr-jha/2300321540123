const express=require("express")
const router=express.Router();

const {getShed}=require("../controllers/vechicleShedController.js")

router.get("/schedule/:depotId",getShed);

module.exports=router