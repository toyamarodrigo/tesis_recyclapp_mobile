import * as z from "zod";

const ResultSchema = z.object({
  article_id: z.string(),
  title: z.string(),
  link: z.string(),
  keywords: z.union([z.array(z.string()), z.null()]),
  creator: z.array(z.string()),
  video_url: z.null(),
  description: z.union([z.null(), z.string()]),
  content: z.string(),
  pubDate: z.coerce.date(),
  pubDateTZ: z.string(),
  image_url: z.union([z.null(), z.string()]),
  source_id: z.string(),
  source_priority: z.number(),
  source_name: z.string(),
  source_url: z.string(),
  source_icon: z.string(),
  language: z.string(),
  country: z.array(z.string()),
  category: z.array(z.string()),
  ai_tag: z.string(),
  sentiment: z.string(),
  sentiment_stats: z.string(),
  ai_region: z.string(),
  ai_org: z.string(),
  duplicate: z.boolean(),
});

const NewsSchema = z.object({
  status: z.string(),
  totalResults: z.number(),
  results: z.array(ResultSchema),
  nextPage: z.null(),
});

export type Result = z.infer<typeof ResultSchema>;
export type News = z.infer<typeof NewsSchema>;
