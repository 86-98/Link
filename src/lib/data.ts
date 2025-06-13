import type { Expert } from '@/types';
import { Brain, Bot, Eye, MessageCircle, Shield, Layers, Sparkles, Users, TrendingUp, Repeat } from 'lucide-react';

export const expertiseIcons: { [key: string]: React.ElementType } = {
  'Machine Learning': Brain,
  'Robotics': Bot,
  'Computer Vision': Eye,
  'Natural Language Processing': MessageCircle,
  'AI Ethics': Shield,
  'Deep Learning': Layers,
  'AGI Research': Sparkles,
  'Reinforcement Learning': Repeat,
  'AI Strategy': Users,
  'AI Investment': TrendingUp,
  'Default': Sparkles,
};

export const experts: Expert[] = [
  {
    id: '1',
    name: 'Dr. Aris Thorne',
    title: 'Chief AI Ethicist, FutureForward AI',
    bio: 'Dr. Aris Thorne is a leading voice in AI ethics and responsible AI development. With over 15 years of experience, Aris focuses on creating frameworks for transparent and equitable AI systems.',
    avatarUrl: 'https://placehold.co/400x400.png',
    expertise: ['AI Ethics', 'Responsible AI', 'AI Governance'],
    predictions: [
      { id: 'p1-1', text: 'By 2028, AI ethics boards will be mandatory for all major tech companies.', dateMade: '2023-05-10', topic: 'AI Governance' },
      { id: 'p1-2', text: 'Explainable AI (XAI) will see significant breakthroughs, making complex models more understandable.', dateMade: '2023-08-22', topic: 'Explainable AI' },
    ],
    company: 'FutureForward AI',
    linkedin: 'https://linkedin.com/in/aristhorne',
    twitter: 'https://twitter.com/aristhorne',
  },
  {
    id: '2',
    name: 'Lena Hanson',
    title: 'Lead NLP Researcher, LinguaTech',
    bio: 'Lena Hanson specializes in Natural Language Processing and computational linguistics. Her work on large language models has pushed the boundaries of machine understanding and generation.',
    avatarUrl: 'https://placehold.co/400x400.png',
    expertise: ['Natural Language Processing', 'Large Language Models', 'Computational Linguistics'],
    predictions: [
      { id: 'p2-1', text: 'Cross-lingual understanding in LLMs will reach near human-level parity by 2027.', dateMade: '2023-01-15', topic: 'NLP' },
      { id: 'p2-2', text: 'AI-powered tools for creative writing and coding assistance will become ubiquitous in the next 3 years.', dateMade: '2023-11-02', topic: 'Generative AI' },
    ],
    company: 'LinguaTech',
    linkedin: 'https://linkedin.com/in/lenahanson',
    twitter: 'https://twitter.com/lenahanson',
  },
  {
    id: '3',
    name: 'Marcus Chen',
    title: 'Principal Investigator, Visionary Machines Lab',
    bio: 'Marcus Chen is at the forefront of Computer Vision research. His lab develops innovative algorithms for image recognition, object detection, and real-time video analysis.',
    avatarUrl: 'https://placehold.co/400x400.png',
    expertise: ['Computer Vision', 'Deep Learning', 'Image Recognition'],
    predictions: [
      { id: 'p3-1', text: 'Autonomous vehicles will rely heavily on federated learning for vision systems by 2029.', dateMade: '2023-03-30', topic: 'Computer Vision' },
      { id: 'p3-2', text: 'Generative adversarial networks (GANs) for image synthesis will produce photorealistic results indistinguishable from real photos by 2026.', dateMade: '2023-09-12', topic: 'Generative AI' },
    ],
    company: 'Visionary Machines Lab',
    linkedin: 'https://linkedin.com/in/marcuschen',
    twitter: 'https://twitter.com/marcuschen',
  },
  {
    id: '4',
    name: 'Dr. Evelyn Reed',
    title: 'Director of AGI Research, Nova Dynamics',
    bio: 'Dr. Evelyn Reed leads a team dedicated to achieving Artificial General Intelligence. Her research explores novel architectures and learning paradigms for more versatile and adaptive AI.',
    avatarUrl: 'https://placehold.co/400x400.png',
    expertise: ['AGI Research', 'Cognitive Architectures', 'Reinforcement Learning'],
    predictions: [
      { id: 'p4-1', text: 'A significant step towards AGI, demonstrating robust transfer learning across vastly different domains, will occur before 2035.', dateMade: '2022-12-01', topic: 'AGI' },
      { id: 'p4-2', text: 'Neuro-symbolic AI approaches will be critical in bridging the gap between current AI and AGI.', dateMade: '2023-07-20', topic: 'AI Architectures' },
    ],
    company: 'Nova Dynamics',
    linkedin: 'https://linkedin.com/in/evelynreed',
    twitter: 'https://twitter.com/evelynreed',
  },
  {
    id: '5',
    name: 'Kenji Tanaka',
    title: 'Robotics Innovator & CEO, Cyber шаг (Cyber Step)',
    bio: 'Kenji Tanaka is a pioneer in humanoid robotics and human-robot interaction. His company, Cyber шаг, develops advanced robotic systems for various industries, from manufacturing to healthcare.',
    avatarUrl: 'https://placehold.co/400x400.png',
    expertise: ['Robotics', 'Human-Robot Interaction', 'Mechatronics'],
    predictions: [
      { id: 'p5-1', text: 'Collaborative robots (cobots) will become standard in small and medium-sized enterprises by 2030.', dateMade: '2023-02-18', topic: 'Robotics' },
      { id: 'p5-2', text: 'AI-driven robotic surgery will allow for new levels of precision and minimally invasive procedures within the next decade.', dateMade: '2023-10-05', topic: 'Healthcare AI' },
    ],
    company: 'Cyber шаг',
    linkedin: 'https://linkedin.com/in/kenjitanaka',
    twitter: 'https://twitter.com/kenjitanaka',
  },
   {
    id: '6',
    name: 'Sofia Petrova',
    title: 'AI Investment Strategist, Quantum Leap Capital',
    bio: 'Sofia Petrova identifies and invests in groundbreaking AI startups. With a keen eye for disruptive technologies, she helps shape the future of AI through strategic funding and mentorship.',
    avatarUrl: 'https://placehold.co/400x400.png',
    expertise: ['AI Investment', 'Venture Capital', 'AI Startups'],
    predictions: [
      { id: 'p6-1', text: 'Investment in AI for drug discovery will triple by 2027.', dateMade: '2023-06-25', topic: 'AI Investment' },
      { id: 'p6-2', text: 'Edge AI will attract significant venture capital funding as demand for on-device processing grows.', dateMade: '2023-11-15', topic: 'Edge AI' },
    ],
    company: 'Quantum Leap Capital',
    linkedin: 'https://linkedin.com/in/sofiapetrova',
    twitter: 'https://twitter.com/sofiapetrova',
  }
];

export const getAllExpertise = (): string[] => {
  const allExpertise = new Set<string>();
  experts.forEach(expert => {
    expert.expertise.forEach(e => allExpertise.add(e));
  });
  return Array.from(allExpertise).sort();
};
