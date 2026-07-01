import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DeliveryDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() address!: string;
  @IsString() @IsNotEmpty() phone!: string;
}

export class OrderItemDto {
  @IsNumber() dishId!: number;
  @IsString() @IsNotEmpty() name!: string;
  @IsNumber() @IsPositive() price!: number;
  @IsNumber() @IsPositive() quantity!: number;
  @IsString() @IsNotEmpty() imageUrl!: string;
  @IsOptional() @IsString() selectedSide?: string;
  @IsArray() @IsString({ each: true }) selectedChanges!: string[];
}

export class CreateOrderDto {
  @IsNumber() restaurantId!: number;
  @IsString() @IsNotEmpty() restaurantName!: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];
  @IsOptional() @IsString() comment?: string;
  @IsNumber() @IsPositive() total!: number;
  @ValidateNested()
  @Type(() => DeliveryDto)
  delivery!: DeliveryDto;
}
