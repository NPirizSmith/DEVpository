import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.tag.createMany({
    data: [
      
      { name: 'SVG', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' },
      { name: 'Iconos', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' },
      { name: 'Biblioteca', category: 'Tools', color: 'rgba(251, 177, 60, 0.5)' },
      { name: 'Plantillas', category: 'Tools', color: 'rgba(251, 177, 60, 0.5)' },
      { name: 'Background', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' },
      { name: 'Animación', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' },
      { name: 'UX/UI', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' },
      { name: 'Colores', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' }, 
      { name: 'Fuentes', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' }, 
      { name: 'Diseño responsive', category: 'Design', color: 'rgba(87, 184, 255, 0.5)' },
      { name: 'Tutorial', category: 'Learning Resources', color: 'rgba(10, 34, 57, 0.5)' },
      { name: 'Guía', category: 'Learning Resources', color: 'rgba(10, 34, 57, 0.5)' },
      { name: 'JavaScript', category: 'Programming Language', color: 'rgba(131, 157, 154, 0.5)' },
      { name: 'TypeScript', category: 'Programming Language', color: 'rgba(131, 157, 154, 0.5)' },
      { name: 'Nuxt.js', category: 'Vue.js Framework', color: 'rgba(209, 56, 191, 0.5)' },
      { name: 'Gatsby', category: 'Static Site Generator', color: 'rgba(107, 170, 117, 0.5)' },
      { name: 'Gridsome', category: 'Static Site Generator', color: 'rgba(107, 170, 117, 0.5)' },
      { name: 'Astro', category: 'Static Site Generator', color: 'rgba(107, 170, 117, 05)' },
      { name: 'Remix', category: 'Framework', color: 'rgba(39, 154, 241, 0.5)' },
      { name: 'Sass', category: 'CSS Preprocessor', color: 'rgba(38, 169, 108, 0.5)' },
      { name: 'Less', category: 'CSS Preprocessor', color: 'rgba(38, 169, 108, 0.5)' },
      { name: 'Stylus', category: 'CSS Preprocessor', color: 'rgba(38, 169, 108, 0.5)' },
      { name: 'SEO', category: 'Marketing', color: 'rgba(241, 156, 121, 0.5)' },
      { name: 'Herramientas', category: 'Development', color: 'rgba(216, 87, 42, 0.5)' },
      { name: 'Componentes', category: 'Development', color: 'rgba(216, 87, 42, 0.5)' },
      { name: 'Buenas prácticas', category: 'Development', color: 'rgba(150, 122, 161, 0.5)' },
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
