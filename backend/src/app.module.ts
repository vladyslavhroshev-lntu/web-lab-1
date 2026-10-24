import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/item.entity';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Item],
      synchronize: true, // Автоматично створює таблицю items у SQLite
    }),
    ItemsModule,
  ],
})
export class AppModule {}
