import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
@Injectable()
export class FirebaseService {

  constructor() {
    console.log('FirebaseService is being initialized');
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
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
