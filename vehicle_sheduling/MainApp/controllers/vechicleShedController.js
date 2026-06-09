const logger = require('../../../logging_middleware/logger.js')
const axios = require('axios')
const {getOptmShed} =require("../services/vsServices.js")
const TEST_url = process.env.TEST_API
const TOKEN = process.env.TOKEN

// console.log(TOKEN);
// console.log(TEST_url)

const getShed = async (req, res) => {
    try {
        const depotId  = parseInt(req.params.depotId);

        const allDepots = await axios.get(`${TEST_url}/depots`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })

        const depots = allDepots.data.depots;
        console.log('First depot:', depots[0]) 

        const depot = depots.find((d) => d.ID === depotId)

        if (!depot) {
            logger.warn(`Depot ${depotId} not found`) 
            return res.status(400).json({ error: "depot not found" })
        }
        const mecHours = depot.MechanicHours;

        const vehicles =await axios.get(`${TEST_url}/vehicles`, {
            headers: {
                Authorization: `Bearer ${TOKEN}`
            }
        })

        const tasks = vehicles.data.vehicles

        const result = getOptmShed(mecHours,tasks)

        logger.info(`Depot ${depotId} — ${result.choosen.length} tasks scheduled, impact: ${result.totalImp}`)
        return res.status(200).json({
            mechHrsAvl:mecHours,
            totalImp:result.totalImp,
            totalTimeUsed: result.totalDuration,            
            hrsRem: mecHours - result.totalDuration,        
            taskChosen: result.choosen.length,             
            choosenTask: result.choosen,  
        })
    } catch (error) {
        logger.error(`getShed failed: ${error.message}`)
        res.status(500).json({error:"Internal server error",details: error.message})
    }
}

module.exports={getShed}