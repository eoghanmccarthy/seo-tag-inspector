import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Existing users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Create new analysis table to store SEO analysis results
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  description: text("description"),
  score: integer("score"),
  metaTags: jsonb("meta_tags"),
  openGraphTags: jsonb("open_graph_tags"),
  twitterCardTags: jsonb("twitter_card_tags"),
  recommendations: jsonb("recommendations"),
  createdAt: text("created_at").notNull(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({
  id: true,
});

export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
export type Analysis = typeof analyses.$inferSelect;

// SEO tag types for frontend use
export type MetaTag = {
  name: string;
  content: string;
  status: 'present' | 'missing' | 'warning';
};

export type SeoCategoryScore = {
  good: number;
  improvements: number;
  issues: number;
};

export type SeoRecommendation = {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'critical' | 'improvement' | 'good';
  solution?: string;
  code?: string;
};

export type SeoAnalysisResult = {
  url: string;
  title: string;
  description: string;
  domain: string;
  score: number;
  scoreCategory: SeoCategoryScore;
  metaTags: MetaTag[];
  openGraphTags: MetaTag[];
  twitterCardTags: MetaTag[];
  recommendations: SeoRecommendation[];
  imageUrl?: string;
};
