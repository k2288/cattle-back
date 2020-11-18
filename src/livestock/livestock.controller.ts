import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { LivestockService } from './livestock.service';
import { CreateLivestockDto } from './dto/create-livestock.dto';
import { UpdateLivestockDto } from './dto/update-livestock.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ListAllEntitiesDto } from './dto/list-all-entities.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListAllLivestockResponseDto } from './dto/list-all-livestock-response.dto';
import { CreateLivestockStateDto } from './dto/create-livestock-state.dto';
import { ListAllLivestockDto } from './dto/list-all-livestock.dto';
import { ListAllLivestockStateDto } from './dto/list-all-livestock-state.dto';
import { AddLivestockMilkDto } from './dto/add-livestock-milk.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Livestock')
@Controller('/v1/livestock')
export class LivestockController {
  constructor(private readonly livestockService: LivestockService) {}

  @Post()
  create(@Body() createLivestockDto: CreateLivestockDto) {
    return this.livestockService.create(createLivestockDto);
  }

  @Get()
  @ApiOkResponse({
    type: ListAllLivestockResponseDto,
  })
  async findAll(
    @Query(new ValidationPipe({ transform: true })) query: ListAllLivestockDto,
  ) {
    return await this.livestockService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.livestockService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLivestockDto: UpdateLivestockDto,
  ) {
    return this.livestockService.update(id, updateLivestockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.livestockService.remove(id);
  }

  @Post(':id/state')
  createState(
    @Param('id') id: string,
    createLivestockStateDto: CreateLivestockStateDto,
  ) {
    return this.livestockService.createState(id, createLivestockStateDto);
  }

  @Put(':id/state/:stateId')
  updateState(
    @Param('id') id: string,
    @Param('stateId') stateId: string,
    createLivestockStateDto: CreateLivestockStateDto,
  ) {
    return this.livestockService.updateState(
      id,
      stateId,
      createLivestockStateDto,
    );
  }

  @Get(':id/state')
  findAllState(
    @Param('id') id: string,
    @Query(new ValidationPipe({ transform: true }))
    query: ListAllLivestockStateDto,
  ) {
    return this.livestockService.findAllState(id, query);
  }

  @Put(':id/milk')
  addLivestockMilk(
    @Param('id') id: string,
    @Body() milkData: AddLivestockMilkDto,
  ) {
    return this.livestockService.addLivestockMilk(id, milkData);
  }
}
