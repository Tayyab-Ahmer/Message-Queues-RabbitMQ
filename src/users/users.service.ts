import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { ProducerService } from "src/queues/queue-producer-file";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private producerService: ProducerService) { }

  async create(createUserDto: CreateUserDto) {

    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);

    const emailData = {
      email: user.email,
      subject: 'Welcome to Our Community',
      html: `<p>Hello ${user.username},</p>
        <p>Welcome to our community! Your account is now active.</p>
        <p>Enjoy your time with us!</p>`,
    };

    await this.producerService.addToEmailQueue(emailData);
    return {
      // user: user,
      email: emailData
    };
  }
}
/* import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailService } from "src/email/email.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
    private emailService: EmailService) { }

  async create(createUserDto: CreateUserDto) {

    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);

    const emailData = {
      email: user.email,
      subject: 'Welcome to Our Community',
      html: `<p>Hello ${user.username},</p>
        <p>Welcome to our community! Your account is now active.</p>
        <p>Enjoy your time with us!</p>`,
    };
    await this.emailService.sendEmail(emailData)

    return await {
      // user: user,
      email: emailData
    }
  }
} */