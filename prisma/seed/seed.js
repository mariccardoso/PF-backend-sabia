import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco Sabiá...');

  // Limpa dados anteriores
  await prisma.progress.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.user.deleteMany();

  // Cria usuários base
  const aluno = await prisma.user.create({
    data: {
      name: 'Joãozinho',
      email: 'joaozinho@sabia.com',
      password: '123456',
      role: 'Aluno',
      bio: 'Estudante com TEA nível 1. Gosta de jogos e atividades visuais.',
    },
  });

  const pai = await prisma.user.create({
    data: {
      name: 'Marcelo Cardoso',
      email: 'marcelo@sabia.com',
      password: '123456',
      role: 'Pai',
      bio: 'Pai do Joãozinho. Gosta de acompanhar o progresso do filho.',
    },
  });

  const professora = await prisma.user.create({
    data: {
      name: 'Prof. Ana',
      email: 'ana@sabia.com',
      password: '123456',
      role: 'Professor',
      bio: 'Professora de apoio pedagógico. Focada em inclusão e aprendizagem visual.',
    },
  });

  // Cria atividades
  const activitiesData = [
    // --- QUIZ ---
    {
      title: 'Cores e Emoções',
      description:
        'Identifique a cor correspondente à emoção mostrada. Exemplo: “Feliz” → Amarelo.',
      type: 'Quiz',
      difficulty: 'Easy',
    },
    {
      title: 'Animais Falantes',
      description:
        'Ouça o som e escolha o animal correto. Desenvolve atenção auditiva e associação.',
      type: 'Quiz',
      difficulty: 'Medium',
    },

    // --- MEMORY GAME ---
    {
      title: 'Memória das Frutas',
      description:
        'Combine pares de frutas iguais. Estimula concentração e reconhecimento visual.',
      type: 'MemoryGame',
      difficulty: 'Easy',
    },
    {
      title: 'Memória das Palavras',
      description:
        'Combine imagens com as palavras correspondentes. Ideal para alunos com dislexia.',
      type: 'MemoryGame',
      difficulty: 'Hard',
    },

    // --- DRAG AND DROP ---
    {
      title: 'Organizando o Dia',
      description:
        'Arraste as atividades diárias para a ordem correta (acordar, escovar os dentes, ir à escola).',
      type: 'Drag_and_Drop',
      difficulty: 'Medium',
    },
    {
      title: 'Montando a História',
      description:
        'Arraste as imagens para formar a sequência lógica da história contada em áudio.',
      type: 'Drag_and_Drop',
      difficulty: 'Hard',
    },
  ];

  const activities = await prisma.activity.createMany({
    data: activitiesData,
  });

  console.log(`✅ ${activitiesData.length} atividades criadas com sucesso!`);

  // Cria progresso inicial do aluno
  const allActivities = await prisma.activity.findMany();
  for (const act of allActivities) {
    await prisma.progress.create({
      data: {
        userId: aluno.id,
        activityId: act.id,
        status: 'Not_Started',
        score: 0,
      },
    });
  }

  console.log('📊 Progresso inicial do aluno registrado!');
  console.log('🌿 Seed finalizada com sucesso!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
