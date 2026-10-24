import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getItems(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Post()
  async createItem(@Body() body: Partial<Item>): Promise<Item> {
    return this.itemsService.create(body);
  }
}
