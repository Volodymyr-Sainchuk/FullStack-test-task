import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  // GET /api/categories
  async getCategories() {
    return this.prisma.category.findMany();
  }

  // GET /api/todos
  async getTodos(category?: string) {
    console.log('🚀 ~ TodosService ~ getTodos ~ category:', category);
    return this.prisma.todo.findMany({
      where: {
        completed: false,
        ...(category && category !== 'All' ? { category } : {}),
      },
    });
  }

  // POST /api/todos
  async createTodo(text: string, category: string) {
    console.log('🚀 ~ TodosService ~ createTodo ~ category:', category);
    console.log('🚀 ~ TodosService ~ createTodo ~ text:', text);
    const activeTasksCount = await this.prisma.todo.count({
      where: {
        category,
        completed: false,
      },
    });
    console.log(
      '🚀 ~ TodosService ~ createTodo ~ activeTasksCount:',
      activeTasksCount,
    );

    if (activeTasksCount >= 5) {
      throw new BadRequestException(
        `Cannot add more than 5 active tasks to the "${category}" category.`,
      );
    }

    return this.prisma.todo.create({
      data: {
        text,
        category,
      },
    });
  }

  // PATCH /api/todos/:id
  async updateStatus(id: string, completed: boolean) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed },
    });
  }

  // DELETE /api/todos/:id
  async deleteTodo(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
