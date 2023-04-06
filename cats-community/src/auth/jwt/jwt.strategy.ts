import { CatsRepository } from 'src/cats/cats.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에서 토큰을 추츨한다.
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false, // 만료기간, 테스트로 만료기간 지정하지 않음
    });
  }

  //* 인증 영역
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (!cat) {
      throw new UnauthorizedException();
    }

    return cat;
  }
}
