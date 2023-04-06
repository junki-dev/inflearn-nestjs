import { multerOptions } from './../../common/utils/multer.options';
import { CurrentUser } from './../../common/decorators/user.decorator';
import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import { AuthService } from './../../auth/auth.service';
import { ReadOnlyCatDto } from './../dto/cat.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatsService } from './../services/cats.service';
import { CatRequestDto } from './../dto/cat.request.dto';
import { LoginRequestDto } from '../../auth/dto/login.request.dto';
import { Cat } from './../cats.schema';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: Cat) {
    //* @Req() req: Request 대신 커스텀 데로레이션 사용
    return cat.readOnlyData;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '성공', type: ReadOnlyCatDto })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogin(body);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'logout';
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({ summary: '모든 고양이 가져오기' })
  @Get('all')
  getAllCats() {
    return this.catsService.getAllCat();
  }
}
