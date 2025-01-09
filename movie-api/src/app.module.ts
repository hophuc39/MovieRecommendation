import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieModule } from './modules/movie/movie.module';
import { PeopleModule } from './modules/people/people.module';
import { ConfigModule } from '@nestjs/config';
import { PineconeModule } from './modules/pinecone/pinecone.module';
import { UserModule } from './modules/User/user.module';
import { LlmsearchModule } from './modules/llmsearch/llmsearch.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // MongooseModule.forRoot('mongodb+srv://movie-recommendation-admin:Movie-Recommendation@movie-recommendation.n1y3e.mongodb.net/?retryWrites=true&w=majority&appName=movie-recommendation'),
    // MongooseModule.forRoot('mongodb://hophuc:123123@localhost:27017/movie_recommendation?directConnection=true'),
    // MongooseModule.forRoot('mongodb+srv://movie-recommendation-admin:Movie-Recommendation@movie-recommendation.n1y3e.mongodb.net/movie_recommendation'),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FirebaseModule,
    MovieModule,
    PeopleModule,
    UserModule,
    PineconeModule,
    LlmsearchModule
  ],
})
export class AppModule { }
