import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
@Injectable()
export class FirebaseService {

  constructor() {
    console.log('FirebaseService is being initialized');


    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert("./src/config/firebase-service-account.json"),
      });
    }

  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
