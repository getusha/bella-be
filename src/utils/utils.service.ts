import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
    generateOTP() {
        let otp = '';
        const numbers = '0123456789';

        for(let i = 0; i < 4; i++) {
            const random_number = Math.floor(Math.random() * numbers.length);
            otp += numbers[random_number];
        }

        return otp;
    }
}
