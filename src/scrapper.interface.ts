export interface Scrapper {
  searchByKey(key: string): Promise<Jobs>;
}

export interface Job {
  jobId: number;
  title: string;
  type: string;
  location: string;
  companyLink: string;
  companyName: string;
  description: string;
  category: string;
  link: string;
  applies: number;
  views: number;
  id: number;
  publishedAt: Date;
}

export interface Jobs {
  total: number;
  jobs: Job[];
}