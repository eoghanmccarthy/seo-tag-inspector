import { analyses, type Analysis, type InsertAnalysis } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  
  // New methods for SEO analyses
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getRecentAnalyses(limit: number): Promise<Analysis[]>;
  getAnalysisByUrl(url: string): Promise<Analysis | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private seoAnalyses: Map<number, Analysis>;
  userCurrentId: number;
  analysisCurrentId: number;

  constructor() {
    this.users = new Map();
    this.seoAnalyses = new Map();
    this.userCurrentId = 1;
    this.analysisCurrentId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const id = this.analysisCurrentId++;
    const analysis: Analysis = { ...insertAnalysis, id };
    this.seoAnalyses.set(id, analysis);
    return analysis;
  }

  async getRecentAnalyses(limit: number): Promise<Analysis[]> {
    return Array.from(this.seoAnalyses.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getAnalysisByUrl(url: string): Promise<Analysis | undefined> {
    return Array.from(this.seoAnalyses.values()).find(
      (analysis) => analysis.url === url
    );
  }
}

export const storage = new MemStorage();
