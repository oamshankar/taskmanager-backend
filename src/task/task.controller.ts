import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){}

    @Get()
    @UseGuards(AuthGuard())
    async getAllTasks(): Promise<Task[]>{
        return this.taskService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard())
    async createTask(@Body() task:CreateTaskDto, @Req() req) : Promise<Task>{
        return this.taskService.create(task,req.user)
    }

    @Get(':id')
    async getById(@Param('id') id : string): Promise<Task>{
        return this.taskService.findById(id)
    }

    @Delete(':id')
    async deleteTask(@Param('id') id : string){
        return this.taskService.deleteById(id)
    }
}
