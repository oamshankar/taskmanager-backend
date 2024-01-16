import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import * as mongoose from 'mongoose';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>
    ) {}

    async findAll(): Promise<Task[]> {
        const tasks = await this.taskModel.find();
        return tasks;
    }

    async create(task: Task, user: User): Promise<Task>{
        const data = Object.assign(task,{user: user._id})
        const res = await this.taskModel.create(data)
        return res
    }
    async findById(id: string): Promise<Task>{
        try{
            const task = await this.taskModel.findById(id);
        return task;
        }
        catch(error){
            throw new NotFoundException('Task not found');
        }
    }

    async deleteById(id: string){
        return await this.taskModel.findByIdAndDelete(id);
    }
}
