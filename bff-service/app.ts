import express from 'express';

import axios from 'axios'

const application = () => {
const app: express.Application = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.all('/*', (req, res)=>{

const recepient = req.originalUrl.split('/')[1]
const recepientURL = process.env[recepient];
if(recepientURL){
    const axiosConfig = {
        method: req.method as any,
        url :`${recepientURL}${req.originalUrl}`,
        ...(Object.keys(req.body ||{}).length>0 && {data: req.body})
    }
axios.defaults
axios(axiosConfig).then((responce)=>{
    res.json(responce.data)
}).catch(error=>{
    console.log('error', JSON.stringify(error))
    if(error.responce){
        const {status, data} = error.responce
        res.status(status).json(data)
    } else {
        res.status(500).json({error: error.message})
    }
})
} else {
    res.status(502).json({error: 'Cannot process request'})
}

});

return app
}

export default application