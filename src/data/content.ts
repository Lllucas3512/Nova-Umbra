export interface ProjectItem {
  id: string;
  indexLabel: string;
  caseType: "CASO REAL" | "CONCEITUAL";
  name: string;
  category: string;
  field: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  url: string;
}

export const WHATSAPP_URL = "https://wa.me/5515988311292";

export const NAV_LINKS: [string, string][] = [
  ["Projetos", "projetos"],
  ["O estúdio", "estudio"],
  ["Processo", "processo"],
  ["FAQ", "faq"],
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "topclean",
    indexLabel: "01",
    caseType: "CASO REAL",
    name: "TopClean",
    category: "Site institucional",
    field: "Estética automotiva",
    description:
      "Uma presença digital que traduz cuidado em cada detalhe. Serviços claros e um caminho direto para o agendamento.",
    image: "/projects/topclean.png",
    imageAlt: "TopClean — Estética automotiva",
    imageWidth: 1536,
    imageHeight: 1024,
    url: "https://topclean-estetica-automotiva.umbra-digital-studio.workers.dev/",
  },
  {
    id: "barbearia-tatui",
    indexLabel: "02",
    caseType: "CONCEITUAL",
    name: "Barbearia Tatuí",
    category: "Projeto conceitual",
    field: "Barbearia contemporânea",
    description:
      "Personalidade, presença local e uma experiência pensada para aproximar a barbearia dos seus próximos clientes.",
    image: "/projects/barbearia.png",
    imageAlt: "Barbearia Tatuí — Barbearia contemporânea",
    imageWidth: 1672,
    imageHeight: 941,
    url: "https://barbearia-tatui.umbra-digital-studio.workers.dev/",
  },
  {
    id: "valenca-montoro",
    indexLabel: "03",
    caseType: "CONCEITUAL",
    name: "Valença & Montoro",
    category: "Projeto conceitual",
    field: "Advocacia boutique",
    description:
      "Uma linguagem sóbria e editorial para uma advocacia boutique. Clareza e discrição em uma experiência digital própria.",
    image: "/projects/advocacia.png",
    imageAlt: "Valença & Montoro — Advocacia boutique",
    imageWidth: 1672,
    imageHeight: 941,
    url: "https://advocacia.umbra-digital-studio.workers.dev/",
  },
  {
    id: "noir",
    indexLabel: "04",
    caseType: "CONCEITUAL",
    name: "Noir",
    category: "Projeto conceitual",
    field: "Estúdio de tatuagem",
    description:
      "Atmosfera autoral e presença marcante no ambiente digital. Portfólio em destaque e contato direto para agendamentos.",
    image: "/projects/noir.png",
    imageAlt: "Noir — Estúdio de tatuagem",
    imageWidth: 1672,
    imageHeight: 941,
    url: "https://noir.umbra-digital-studio.workers.dev/",
  },
];

export const SERVICES = [
  {
    number: "01 /",
    title: "Sites institucionais",
    description: "Sua empresa, apresentada com clareza e personalidade.",
  },
  {
    number: "02 /",
    title: "Landing pages",
    description: "Uma mensagem precisa. Um caminho direto para o contato.",
  },
  {
    number: "03 /",
    title: "Manutenção & evolução",
    description: "Seu site acompanhando as próximas fases do negócio.",
  },
];

export const PROCESS_STEPS: [string, string][] = [
  [
    "Briefing",
    "Entendemos seu negócio, seus objetivos e o que precisa mudar.",
  ],
  [
    "Estratégia & design",
    "Transformamos direção em uma experiência com identidade própria.",
  ],
  [
    "Desenvolvimento",
    "Construímos, adaptamos e testamos cada detalhe da experiência.",
  ],
  [
    "Publicação",
    "Ajustes finais, configuração e acompanhamento da entrada no ar.",
  ],
];

export const FAQ_ITEMS: [string, string][] = [
  [
    "Quanto custa criar um site?",
    "Cada projeto tem um escopo próprio. O investimento depende das páginas, funcionalidades e conteúdo necessários. Conte sua ideia e preparamos uma proposta sob medida, antes de iniciar.",
  ],
  [
    "Quanto tempo leva para ficar pronto?",
    "O prazo é definido na proposta, de acordo com a complexidade e a disponibilidade dos conteúdos. Você acompanha as etapas e aprova os principais marcos do projeto.",
  ],
  [
    "O site funciona no celular?",
    "Sim. A experiência é adaptada para celulares, tablets e computadores, com atenção à leitura, à navegação e aos botões em cada tamanho de tela.",
  ],
  [
    "Vocês cuidam do domínio e da hospedagem?",
    "Podemos orientar a escolha e configurar o domínio e a hospedagem. Serviços, custos recorrentes e responsabilidades são alinhados na proposta.",
  ],
  [
    "Meu site aparecerá no Google?",
    "O site pode ser preparado com estrutura técnica para indexação. A presença e a posição nos resultados dependem também do conteúdo, da concorrência e do trabalho contínuo de SEO. Não prometemos posições.",
  ],
  [
    "Posso atualizar o site depois?",
    "Sim. Podemos planejar uma área de edição ou combinar atualizações com o estúdio. A melhor opção depende do conteúdo que você precisa atualizar e fica definida no escopo.",
  ],
];

export const QUOTE_SERVICES = [
  "Site Institucional",
  "Landing Page",
  "Manutenção",
  "Ainda não sei",
];

export const QUOTE_OBJECTIVES = [
  "Apresentar empresa",
  "Divulgar produto",
  "Modernizar site",
  "Gerar contatos",
];

export function buildWhatsAppQuoteMessage(
  service: string,
  objective: string,
  details: string
): string {
  const trimmed = details.trim();
  return `Olá, Umbra! Gostaria de um orçamento.\n\nServiço: ${service}\nObjetivo: ${objective}${
    trimmed ? `\nSobre o projeto: ${trimmed}` : ""
  }`;
}

