import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';
import PostgresErrorCode from 'src/database/postgresErrorCodes.enum';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_SUBSCRIBED, EVENT_SUBSCRIPTION_CANCELED } from './constants';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(Subscribe)
    private readonly subscribeRepository: Repository<Subscribe>,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(request: Request, createSubscribeDto: CreateSubscribeDto) {
    const { sub } = request[REQUEST_USER_KEY];
    const user = await this.userService.findOneEmail(createSubscribeDto.email);
    const currentUser = await this.userService.findOne(sub);
    let subscribe: Subscribe = undefined;
    let isSuccessful = true;

    if (user?.email === currentUser?.email)
      throw new ConflictException(`User can not subscribe to himself`);

    try {
      subscribe = await this.subscribeRepository.create({
        plan: createSubscribeDto.plan,
        subscribedTo: user,
        subscriber: currentUser,
      });

      return await this.subscribeRepository.save(subscribe);
    } catch (error) {
      isSuccessful = false;
      if (error.code === PostgresErrorCode.UniqueViolation)
        throw new ConflictException(
          `Already subscribed to user with email=${user.email}`,
        );

      throw error;
    } finally {
      // Emit event only on valid subscription
      if (isSuccessful) {
        this.eventEmitter.emit(EVENT_SUBSCRIBED, subscribe);
      }
    }
  }

  async findAll({ offset, limit }: PaginationQueryDto) {
    return await this.subscribeRepository.find({
      skip: offset,
      take: limit,
      relations: { subscribedTo: true },
    });
  }

  async findOne(id: number) {
    const subscribe = await this.subscribeRepository.findOne({
      where: { id },
      relations: { subscribedTo: true },
    });

    if (!subscribe)
      throw new NotFoundException(`Cannot find subscription with id=${id}`);
    return subscribe;
  }

  async update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    const updated = await this.subscribeRepository.preload({
      id,
      ...updateSubscribeDto,
    });
    if (!updated)
      throw new NotFoundException(`Cannot find subscription with id=${id}`);
    return updated;
  }

  async remove(id: number) {
    const toDelete = await this.findOne(id);
    this.eventEmitter.emit(EVENT_SUBSCRIPTION_CANCELED, toDelete);
    return this.subscribeRepository.remove(toDelete);
  }
}
