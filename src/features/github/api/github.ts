import { z } from 'zod';
import { getMockUser, getMockRepos } from './mockData';

export const GithubUserSchema = z.object({
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string(),
  html_url: z.string(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
});

export const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  html_url: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
});

export const GithubReposResponseSchema = z.array(GithubRepoSchema);

export type GithubUser = z.infer<typeof GithubUserSchema>;
export type GithubRepo = z.infer<typeof GithubRepoSchema>;

const GITHUB_BASE_URL = 'https://api.github.com';

// Optional Authorization header if token exists
const getHeaders = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN || '';
  return token ? { Authorization: `token ${token}` } : undefined;
};

export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  try {
    const res = await fetch(`${GITHUB_BASE_URL}/users/${encodeURIComponent(username)}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return GithubUserSchema.parse(data);
  } catch (error) {
    console.warn(`GitHub user fetch failed for ${username}, returning mock data:`, error);
    return getMockUser(username);
  }
};

export const fetchGithubRepos = async (username: string): Promise<GithubRepo[]> => {
  try {
    const res = await fetch(
      `${GITHUB_BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`,
      { headers: getHeaders() }
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return GithubReposResponseSchema.parse(data);
  } catch (error) {
    console.warn(`GitHub repos fetch failed for ${username}, returning mock data:`, error);
    return getMockRepos(username);
  }
};
