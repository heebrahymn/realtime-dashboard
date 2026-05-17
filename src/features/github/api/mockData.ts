export interface MockGithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface MockGithubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

export const mockGithubUsers: Record<string, MockGithubUser> = {
  heebrahymn: {
    login: 'heebrahymn',
    name: 'Ibrahim Heebrahymn',
    avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
    html_url: 'https://github.com/heebrahymn',
    bio: 'Fullstack developer specializing in scalable web systems, react engineering, and automated developer tools.',
    public_repos: 34,
    followers: 128,
    following: 96
  },
  gaearon: {
    login: 'gaearon',
    name: 'Dan Abramov',
    avatar_url: 'https://avatars.githubusercontent.com/u/810438?v=4',
    html_url: 'https://github.com/gaearon',
    bio: 'Co-authored Redux, Create React App, and React Hooks. Developer advocate for pure component patterns.',
    public_repos: 245,
    followers: 86400,
    following: 12
  },
  yyx990803: {
    login: 'yyx990803',
    name: 'Evan You',
    avatar_url: 'https://avatars.githubusercontent.com/u/499550?v=4',
    html_url: 'https://github.com/yyx990803',
    bio: 'Creator of Vue.js, Vite, and Rolldown. Independent open-source architect and framework pioneer.',
    public_repos: 188,
    followers: 98700,
    following: 0
  }
};

export const mockGithubRepos: Record<string, MockGithubRepo[]> = {
  heebrahymn: [
    {
      id: 101,
      name: 'RealtimeDashboard',
      html_url: 'https://github.com/heebrahymn/RealtimeDashboard',
      description: 'A premium realtime telemetry dashboard monitoring weather, crypto listings, and github profiles.',
      stargazers_count: 42,
      forks_count: 5,
      language: 'TypeScript'
    },
    {
      id: 102,
      name: 'agentic-builder',
      html_url: 'https://github.com/heebrahymn/agentic-builder',
      description: 'An autonomous agent framework translating standard specifications into high-quality codebase setups.',
      stargazers_count: 128,
      forks_count: 12,
      language: 'Python'
    },
    {
      id: 103,
      name: 'fsd-react-template',
      html_url: 'https://github.com/heebrahymn/fsd-react-template',
      description: 'A structural boilerplate layout applying Feature-Sliced Design to React+Tailwind SPA builds.',
      stargazers_count: 18,
      forks_count: 2,
      language: 'TypeScript'
    }
  ],
  gaearon: [
    {
      id: 201,
      name: 'redux',
      html_url: 'https://github.com/reduxjs/redux',
      description: 'Predictable state container for JavaScript apps.',
      stargazers_count: 60500,
      forks_count: 15400,
      language: 'TypeScript'
    },
    {
      id: 202,
      name: 'create-react-app',
      html_url: 'https://github.com/facebook/create-react-app',
      description: 'Set up a modern web app by running one command.',
      stargazers_count: 102000,
      forks_count: 26000,
      language: 'JavaScript'
    }
  ],
  yyx990803: [
    {
      id: 301,
      name: 'vite',
      html_url: 'https://github.com/vitejs/vite',
      description: 'Next generation frontend tooling. It\'s fast!',
      stargazers_count: 68000,
      forks_count: 5800,
      language: 'TypeScript'
    },
    {
      id: 302,
      name: 'vue',
      html_url: 'https://github.com/vuejs/core',
      description: 'The progressive JavaScript framework.',
      stargazers_count: 206000,
      forks_count: 34000,
      language: 'TypeScript'
    }
  ]
};

export const getMockUser = (username: string): MockGithubUser => {
  const sanitized = username.toLowerCase().trim();
  return mockGithubUsers[sanitized] || {
    login: username,
    name: username.charAt(0).toUpperCase() + username.slice(1),
    avatar_url: 'https://avatars.githubusercontent.com/u/9919?v=4',
    html_url: `https://github.com/${username}`,
    bio: 'Independent developer shipping high-quality applications to open source repositories.',
    public_repos: 12,
    followers: 14,
    following: 8
  };
};

export const getMockRepos = (username: string): MockGithubRepo[] => {
  const sanitized = username.toLowerCase().trim();
  return mockGithubRepos[sanitized] || [
    {
      id: 901,
      name: 'my-awesome-project',
      html_url: `https://github.com/${username}/my-awesome-project`,
      description: 'A modular, high-performance library solving complex systems tasks elegantly.',
      stargazers_count: 15,
      forks_count: 2,
      language: 'TypeScript'
    },
    {
      id: 902,
      name: 'dotfiles',
      html_url: `https://github.com/${username}/dotfiles`,
      description: 'My custom configuration files for zsh, neovim, and tmux.',
      stargazers_count: 3,
      forks_count: 0,
      language: 'Lua'
    }
  ];
};
