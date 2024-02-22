"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResponseDto = void 0;
class OrderResponseDto {
    toJson() {
        return {
            "orderId": this.orderId,
            "orderList": this.orderList,
            "totalPrice": this.totalPrice,
            "userId": this.userId,
            "timestamp": this.timestamp,
            "isOrderReady": this.isOrderReady,
            "duelWinner": this.duelWinner,
        };
    }
}
exports.OrderResponseDto = OrderResponseDto;
//# sourceMappingURL=order_response.dto.js.map