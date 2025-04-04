import { SeoAnalysisResult } from "@shared/schema";

export async function analyzeSeoTags(url: string): Promise<SeoAnalysisResult> {
  try {
    const response = await fetch(`/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Error analyzing URL: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to analyze SEO tags: ${error.message}`);
    }
    throw new Error('Failed to analyze SEO tags');
  }
}
