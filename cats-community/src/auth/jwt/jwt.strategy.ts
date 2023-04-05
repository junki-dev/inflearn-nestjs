import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // header에서 토큰을 추츨한다.
      secretOrKey: 'secret',
      ignoreExpiration: false, // 만료기간, 테스트로 만료기간 지정하지 않음
    });
  }

  //* 인증 영역
  //   async validate(payload) {}
}
