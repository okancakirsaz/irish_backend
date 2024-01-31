export class OrderResponseDto{
    orderId:number
    orderList:string[]
    totalPrice:number
    timestamp:string
    isOrderReady:boolean

    toJson():Record<string,any>{
        return {
            "orderId":this.orderId,
            "orderList":this.orderList,
            "totalPrice":this.totalPrice,
            "timestamp":this.timestamp,
            "isOrderReady":this.isOrderReady
        }
    }
}