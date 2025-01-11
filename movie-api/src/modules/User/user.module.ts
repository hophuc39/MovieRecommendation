import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema }
        ]),
        FirebaseModule
    ],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule { }
