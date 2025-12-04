// Data model types for PSO Regnskap admin dashboard

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
  price: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  office: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface QuizAnswer {
  text: string;
  score: {
    total: number;
    basic: number;
    workshop: number;
    pluss: number;
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  answers: QuizAnswer[];
}

export interface QuizData {
  questions: QuizQuestion[];
}

export interface ContactSubmission {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  status: "read" | "unread";
}

export interface Office {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  hours: string;
  mapEmbed: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface HomepageStat {
  id: string;
  icon: string;
  value: string;
  label: string;
  order: number;
}

export interface Settings {
  company: {
    name: string;
    tagline: string;
    description: string;
    logoUrl: string;
    faviconUrl?: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  offices: {
    spydeberg: {
      name: string;
      address: string;
      postalCode: string;
      city: string;
    };
    oslo: {
      name: string;
      address: string;
      postalCode: string;
      city: string;
    };
  };
  social: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  homepage?: {
    hero: {
      title: string;
      subtitle: string;
      backgroundImage?: string;
      primaryCta: {
        text: string;
        link: string;
      };
      secondaryCta: {
        text: string;
        link: string;
      };
    };
    stats: HomepageStat[];
  };
}
