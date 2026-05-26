import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('api')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('categories')
  getCategories() {
    return this.todosService.getCategories();
  }

  @Get('todos')
  getTodos(@Query('category') category?: string) {
    return this.todosService.getTodos(category);
  }

  @Post('todos')
  createTodo(@Body() body: { text: string; category: string }) {
    return this.todosService.createTodo(body.text, body.category);
  }

  @Patch('todos/:id')
  updateStatus(@Param('id') id: string, @Body() body: { completed: boolean }) {
    return this.todosService.updateStatus(id, body.completed);
  }

  @Delete('todos/:id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}
