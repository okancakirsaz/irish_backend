export class OrderResponseDto{
    orderId:number
    orderList:string[]
    totalPrice:number
    userId:string
    timestamp:string
    isOrderReady:boolean
    duelWinner?:string

    toJson():Record<string,any>{
        return {
            "orderId":this.orderId,
            "orderList":this.orderList,
            "totalPrice":this.totalPrice,
            "userId":this.userId,
            "timestamp":this.timestamp,
            "isOrderReady":this.isOrderReady,
            "duelWinner":this.duelWinner,
        }
    }
}