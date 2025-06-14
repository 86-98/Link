
export type Prediction = {
  id: string;
  text: string;
  dateMade: string; // ISO date string
  topic: string; // e.g., "AGI", "NLP", "Computer Vision"
  source?: string; // Optional source/link for the prediction
};

export type Expert = {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string; // placeholder
  expertise: string[]; // e.g., ["Machine Learning", "Natural Language Processing"]
  impactArea?: string; // New field for impact category
  predictions: Prediction[];
  company?: string;
  linkedin?: string;
  twitter?: string;
};
