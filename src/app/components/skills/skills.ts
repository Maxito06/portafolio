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
      items: ['Angular 17', 'TypeScript', 'JavaScript', 'RxJS', 'Ionic', 'Capacitor', 'HTML', 'CSS'],
    },
    {
      nombre: 'Backend & Datos',
      items: ['Python', 'FastAPI', 'Java', 'SQL', 'PostgreSQL'],
    },
    {
      nombre: 'Testing & Calidad',
      items: ['Playwright', 'JUnit 5', 'Mockito', 'TestContainers', 'MockMvc', 'ArchUnit'],
    },
    {
      nombre: 'Herramientas',
      items: ['Git', 'GitHub', 'Swagger/OpenAPI', 'Postman', 'VS Code', 'Cursor', 'Antigravity'],
    },
    {
      nombre: 'IA',
      items: ['Claude', 'GPT', 'Gemini', 'MCP'],
    },
  ];
}
