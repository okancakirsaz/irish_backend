import { UserDto } from "./user.dto";
import { UserService } from "./user.service";
export declare class UserController {
    private readonly service;
    constructor(service: UserService);
    getDeneme(): {
        denemeNumarasi: number;
    };
    setNewUser(props: UserDto): UserDto;
}
