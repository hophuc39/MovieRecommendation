import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { FirebaseService } from "./firebase.service";

@Injectable()
export class FirebaseAuthGuard implements CanActivate {

  constructor(private readonly firebaseService: FirebaseService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException("Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}