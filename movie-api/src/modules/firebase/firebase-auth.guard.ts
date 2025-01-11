import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";

import { FirebaseService } from "./firebase.service";

export class FirebaseAuthGuard implements CanActivate {

  constructor(private firebaseService: FirebaseService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers["Authorization"];

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException("Missing or invalid authorization header");
    }

    const token = authorization.split(' ')[1];

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}