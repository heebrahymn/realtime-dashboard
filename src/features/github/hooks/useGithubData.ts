import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser, fetchGithubRepos } from '../api/github';

export const useGithubUserQuery = (username: string) => {
  return useQuery({
    queryKey: ['github-user', username.toLowerCase().trim()],
    queryFn: () => fetchGithubUser(username),
    staleTime: 1000 * 60 * 15, // Profile data changes slowly, 15 min cache
    enabled: username.trim().length > 0,
  });
};

export const useGithubReposQuery = (username: string) => {
  return useQuery({
    queryKey: ['github-repos', username.toLowerCase().trim()],
    queryFn: () => fetchGithubRepos(username),
    staleTime: 1000 * 60 * 15,
    enabled: username.trim().length > 0,
  });
};
