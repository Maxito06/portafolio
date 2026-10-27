import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  categorias = [
    {
      nombre: 'Frontend',
      items: ['Angular', 'Signals', 'RxJS', 'SSR', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Ionic', 'Capacitor'],
    },
    {
      nombre: 'Backend y datos',
      items: ['NestJS', 'Prisma', 'PostgreSQL', 'REST APIs', 'Python', 'FastAPI', 'Java'],
    },
    {
      nombre: 'Testing y calidad',
      items: ['Playwright', 'Vitest', 'JUnit 5', 'Mockito', 'TestContainers', 'ArchUnit'],
    },
    {
      nombre: 'Herramientas y despliegue',
      items: ['Git', 'GitHub', 'GitHub Actions', 'Swagger/OpenAPI', 'Postman', 'Docker', 'Cloudinary', 'Netlify', 'Render'],
    },
    {
      nombre: 'IA y entornos de trabajo',
      items: ['Claude', 'GPT', 'Gemini', 'MCP', 'Cursor', 'Antigravity', 'VS Code'],
    },
  ];
}
