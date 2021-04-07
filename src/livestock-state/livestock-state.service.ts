import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LivestockState } from './schemas/livestock-state.schema';
import { Model } from 'mongoose';
import { CreateLivestockStateDto } from '../livestock/dto/create-livestock-state.dto';
import { UpdateLivestockStateDto } from '../livestock/dto/update-livestock-state.dto';
import { ListAllLivestockStateDto } from '../livestock/dto/list-all-livestock-state.dto';
import { ListAllLivestockResponseDto } from '../livestock/dto/list-all-livestock-response.dto';

@Injectable()
export class LivestockStateService {
  constructor(
    @InjectModel(LivestockState.name)
    private livestockStateModel: Model<LivestockState>,
  ) {}

  async create(createLivestockStateDto: CreateLivestockStateDto) {
    const state = new this.livestockStateModel(createLivestockStateDto);
    return await state.save();
  }

  async removeByLivestock(id: string) {
    await this.livestockStateModel.deleteMany({ livestock_id: id });
  }

  async findLastStateOfLivstock(id: string) {
    return this.livestockStateModel
      .findOne({ livestock_id: id })
      .sort({ date: -1, createdAt: -1 });
  }

  async findLivestockStateAndUpdate(
    livestock_id: string,
    stateId: string,
    updateLivestockStateDto: UpdateLivestockStateDto,
  ) {
    const state = await this.livestockStateModel.findOneAndUpdate(
      { livestock_id: livestock_id, _id: stateId },
      updateLivestockStateDto,
    );
    if (!state) throw new NotFoundException();
  }

  async findAllLivestockState(
    livestock_id: string,
    query: ListAllLivestockStateDto,
  ) {
    const filter = {
      livestock_id: livestock_id,
    };

    if (query.field) filter['field'] = query.field;

    return new ListAllLivestockResponseDto(
      query.pageSize,
      query.offset,
      await this.livestockStateModel.count(filter),
      await this.livestockStateModel
        .find(filter)
        .limit(query.pageSize)
        .skip(query.offset),
    );
  }

  findLivestockStateAndRemove(livestock_id: string, stateId: string) {
    const state = this.livestockStateModel.findOneAndRemove({
      livestock_id: livestock_id,
      _id: stateId,
    });
    if (!state) throw new NotFoundException();
    return state;
  }
}
