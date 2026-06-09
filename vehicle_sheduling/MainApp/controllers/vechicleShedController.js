const axios=require('axios')

const TEST_url=process.env.TEST_API
const TOKEN=process.env.TOKEN

const getShed=async(req,res)=>{
    const {depotId}=parseInt(req.params.depotId);

    const allDepots=await axios.get(`${TEST_url}/depots`,{headers:{
        Authorization:`Bearer ${TOKEN}`
    }})

    const depots=allDepots.data.depots;
    
    
}