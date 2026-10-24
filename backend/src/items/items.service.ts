import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemsService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedInitialData();
  }

  async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  async findOne(id: number): Promise<Item | null> {
    return this.itemsRepository.findOneBy({ id });
  }

  async create(data: Partial<Item>): Promise<Item> {
    const item = this.itemsRepository.create(data);
    return this.itemsRepository.save(item);
  }

  private async seedInitialData(): Promise<void> {
    const count = await this.itemsRepository.count();
    if (count === 0) {
      this.logger.log('Таблиця items порожня. Додаємо тестові дані...');

      const initialItems: Partial<Item>[] = [
        {
          name: 'Ноутбук Lenovo ThinkPad',
          description: 'Потужний ноутбук для програмування та навчання',
          price: 32000,
        },
        {
          name: 'Бездротові навушники Sony WH-1000XM5',
          description: 'Навушники з активним шумозаглушенням',
          price: 13500,
        },
        {
          name: 'Механічна клавіатура Keychron K2',
          description: 'Компактна бездротова механічна клавіатура',
          price: 4200,
        },
        {
          name: 'Миша Logitech MX Master 3S',
          description: 'Ергономічна миша з високоточним сенсором',
          price: 3800,
        },
        {
          name: 'Монітор Dell UltraSharp 27"',
          description: '4K IPS монітор із високою точністю передачі кольору',
          price: 18900,
        },
      ];

      await this.itemsRepository.save(initialItems);
      this.logger.log(`Успішно додано ${initialItems.length} тестових елементів.`);
    }
  }
}
