const express=require("express")
const router=express.Router();

const {getShed}=require("../controllers/vechicleShedController")

router.get("/shedule/:depotId",getShed);

module.exports=router