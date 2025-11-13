import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { UsersRepository } from 'src/core/domain/repositories/user.repository';
import { USERS_REPOSITORY } from 'src/core/domain/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from '../dto/login.input';
import { LoginOutput } from '../dto/login.output';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly repository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.repository.findByUsername(input.username);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, user: user.username };
    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
