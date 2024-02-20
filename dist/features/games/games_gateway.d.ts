import { Server } from 'socket.io';
import { DuelInviteDto } from "src/features/games/dto/duel_invite.dto";
export declare class GamesGateway {
    server: Server;
    handleDuelInvite(body: DuelInviteDto): void;
    handleDuelAccepted(body: DuelInviteDto): void;
    handleGameStarted(body: DuelInviteDto): void;
    handleGameRoomDone(body: string): void;
}
