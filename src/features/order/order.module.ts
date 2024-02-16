import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { SocketGateway } from "src/core/web_socket_gateway";

@Module(
    {
        providers:[OrderService,SocketGateway],
        controllers:[OrderController]
    }
)
export class OrderModule{}