import { Controller, Delete, Get, Post, Put, Req,  Res} from '@nestjs/common';
import { AppService } from './app.service';
import {RequestService} from './request/request.service'

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService, private requestService: RequestService) {}

  @Get()
  @Post()
  @Put()
  @Delete()
  async redirectRequest(@Req()req: any, @Res() res: any): Promise<any> {

    const recepient = req.originalUrl.split('/')[1]
    const recepientURL = process.env[recepient];
    const method = req.method.toLowerCase()
    let body = req.body
    let url = `${recepientURL}${req.originalUrl}`

    if(recepientURL){
      if(this.appService.checkIfCacheNotExpired() && recepient === 'product'){
        res.json(this.appService.products)
    } else {
      await this.requestService.sendRequest(method,url, body = null)
      .then(responce=>{
        this.appService.products = responce.data
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
    }
    } else {
      res.status(502).json({error: 'Cannot process request'})
      }    
  }
}
