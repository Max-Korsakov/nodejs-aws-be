import { Injectable, Req,  Res } from '@nestjs/common';

@Injectable()
export class AppService {

  private readonly CACHE_EXPIRING_TIME_IN_MS = 120000

  private cachedProducts = {
    productList: null,
    timeStamp: 0
}

checkIfCacheNotExpired(){
  return Date.now() - this.cachedProducts.timeStamp < this.CACHE_EXPIRING_TIME_IN_MS
}

 chacheResponse(){

 }

 get products(){
   return this.cachedProducts.productList
 }

 set products(productList){
  this.cachedProducts.productList = productList
  this.cachedProducts.timeStamp = Date.now()
 }
}
