import { IsNotEmpty } from "class-validator";

export class CreateTokenDTO {
    
    @IsNotEmpty()
    roomID: string;

    @IsNotEmpty()
    userID: string;
}
