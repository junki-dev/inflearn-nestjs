import { CatsRepository } from './../cats.repository';
import { Injectable, ConflictException } from '@nestjs/common';
import { Cat } from './../cats.schema';
import { CatRequestDto } from './../dto/cat.request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCats() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat: Cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist) {
      throw new ConflictException('already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const cat: Cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    const fileName = `cats/${files[0].filename}`;
    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );

    return newCat;
  }
}
