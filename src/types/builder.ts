export type ComponentType = 'text' | 'button' | 'image' | 'spacer';

export interface ComponentConfig {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  style?: Record<string, any>;
}

export interface PageConfig {
  id: string;
  name: string;
  components: ComponentConfig[];
  backgroundColor: string;
}

export interface AppTheme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonRadius: string;
}

export interface AppConfig {
  id: string;
  name: string;
  theme: AppTheme;
  pages: PageConfig[];
  activePageId: string;
}

export const DEFAULT_THEME: AppTheme = {
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#000000',
  buttonRadius: '8px',
};

export const INITIAL_APP_CONFIG: AppConfig = {
  id: 'new-app',
  name: 'My Mini App',
  theme: DEFAULT_THEME,
  pages: [
    {
      id: 'home',
      name: 'Home',
      backgroundColor: '#ffffff',
      components: [],
    },
  ],
  activePageId: 'home',
};
