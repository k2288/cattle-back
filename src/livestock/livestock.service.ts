import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateLivestockDto } from './dto/create-livestock.dto';
import { UpdateLivestockDto } from './dto/update-livestock.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Livestock } from './schemas/livestock.schema';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ListAllLivestockResponseDto } from './dto/list-all-livestock-response.dto';
import { AuthPayload } from '../auth/models/auth-payload';
import { LivestockStateService } from '../livestock-state/livestock-state.service';
import { CreateLivestockStateDto } from './dto/create-livestock-state.dto';
import { UpdateLivestockStateDto } from './dto/update-livestock-state.dto';
import { ListAllLivestockDto } from './dto/list-all-livestock.dto';
import { Model } from 'mongoose';
import { ListAllLivestockStateDto } from './dto/list-all-livestock-state.dto';
import { AddLivestockMilkDto } from './dto/add-livestock-milk.dto';
import { dashboardConst } from '../dashboard/dashboard.const';
import { ObjectID } from 'mongodb';

@Injectable({ scope: Scope.REQUEST })
export class LivestockService {
  constructor(
    @InjectModel(Livestock.name) private livestockModel: Model<Livestock>,
    @Inject(REQUEST) private readonly request: Request,
    private livestockStateService: LivestockStateService,
  ) {}

  async create(createLivestockDto: CreateLivestockDto) {
    createLivestockDto.user_id = (this.request.user as AuthPayload).user_id;

    const livestock = new this.livestockModel(createLivestockDto);
    return await livestock.save();
  }

  async findAll(query: ListAllLivestockDto) {
    const filter = {
      user_id: (this.request.user as AuthPayload).user_id,
    };

    if (query.searchTerm) filter['tagNo'] = new RegExp(query.searchTerm, 'i');
    if (query.gender) filter['gender'] = { $in: query.gender };
    if (query.state) filter['state'] = { $in: query.state };

    return new ListAllLivestockResponseDto(
      query.pageSize,
      query.offset,
      await this.livestockModel.count(filter),
      await this.livestockModel
        .find(filter)
        .limit(query.pageSize)
        .skip(query.offset),
    );
  }

  async findOne(id: string) {
    return this.livestockModel.findOne({
      _id: new ObjectID(id),
      user_id: (this.request.user as AuthPayload).user_id,
    });
  }

  async update(id: string, updateLivestockDto: UpdateLivestockDto) {
    const livestock = this.livestockModel.findOneAndUpdate(
      { _id: id, user_id: (this.request.user as AuthPayload).user_id },
      updateLivestockDto,
    );
    if (!livestock) throw new NotFoundException();
    return {};
  }

  async remove(id: string) {
    const livestock = await this.livestockModel.findOneAndRemove({
      _id: new ObjectID(id),
      user_id: (this.request.user as AuthPayload).user_id,
    });

    if (!livestock) throw new NotFoundException();

    await this.livestockStateService.removeByLivestock(id);

    return livestock;
  }

  async createState(
    id: string,
    createLivestockStateDto: CreateLivestockStateDto,
  ) {
    const livestock = await this.findOne(id);

    if (!livestock) throw new NotFoundException();

    createLivestockStateDto.livestock_id = id;

    const state = await this.livestockStateService.create(
      createLivestockStateDto,
    );

    this.updateLivestockLastState(id, livestock);

    return state;
  }

  async updateState(
    id: string,
    stateId: string,
    updateLivestockStateDto: UpdateLivestockStateDto,
  ) {
    const livestock = await this.findOne(id);

    if (!livestock) throw new NotFoundException();

    this.livestockStateService.findLivestockStateAndUpdate(
      id,
      stateId,
      updateLivestockStateDto,
    );

    this.updateLivestockLastState(id, livestock);

    return {};
  }

  private async updateLivestockLastState(id: string, livestock: Livestock) {
    const lastState = await this.livestockStateService.findLastStateOfLivstock(
      id,
    );

    livestock.state = lastState.state;
    livestock.lastStateDate = lastState.date;
    await livestock.save();
  }

  async findAllState(id: string, query: ListAllLivestockStateDto) {
    const livestock = await this.findOne(id);
    if (!livestock) throw new NotFoundException();

    return this.livestockStateService.findAllLivestockState(id, query);
  }

  addLivestockMilk(id: string, milkData: AddLivestockMilkDto) {
    const livestock = this.livestockModel.findOneAndUpdate(
      { _id: id, user_id: (this.request.user as AuthPayload).user_id },
      { $push: { milks: milkData } },
    );

    if (!livestock) throw new NotFoundException();

    return {};
  }

  getStateCount(state: any) {
    if (dashboardConst.TOTAL === state) {
      return this.livestockModel.count({
        user_id: (this.request.user as AuthPayload).user_id,
      });
    } else {
      return this.livestockModel.count({
        user_id: (this.request.user as AuthPayload).user_id,
        state: state,
      });
    }
  }

  async getGenderCount(gender: any) {
    return this.livestockModel.count({
      user_id: (this.request.user as AuthPayload).user_id,
      gender: gender,
    });
  }

  async deleteState(id: string, stateId: string) {
    const livestock = await this.findOne(id);

    if (!livestock) throw new NotFoundException();

    const state = this.livestockStateService.findLivestockStateAndRemove(
      id,
      stateId,
    );

    this.updateLivestockLastState(id, livestock);

    return state;
  }
}
