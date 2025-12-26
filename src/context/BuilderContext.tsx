import { createContext, useContext, useState, type ReactNode } from 'react';
import { INITIAL_APP_CONFIG, type AppConfig, type ComponentConfig } from '../types/builder';

interface BuilderContextType {
  appConfig: AppConfig;
  setAppConfig: (config: AppConfig) => void;
  selectedComponentId: string | null;
  selectComponent: (id: string | null) => void;
  addComponent: (component: ComponentConfig) => void;
  updateComponent: (id: string, updates: Partial<ComponentConfig>) => void;
  removeComponent: (id: string) => void;
  saveProject: () => void;
  saveProject: () => void;
  loadProject: (id: string, autoCreate?: boolean) => void;
  importProject: (config: AppConfig) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider = ({ children }: { children: ReactNode }) => {
  const [appConfig, setAppConfig] = useState<AppConfig>(INITIAL_APP_CONFIG);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const saveProject = () => {
    const savedApps = JSON.parse(localStorage.getItem('telegram_mini_apps') || '[]');
    const existingIndex = savedApps.findIndex((app: AppConfig) => app.id === appConfig.id);
    
    if (existingIndex >= 0) {
      savedApps[existingIndex] = { ...appConfig, updatedAt: new Date().toISOString() };
    } else {
      savedApps.push({ ...appConfig, updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem('telegram_mini_apps', JSON.stringify(savedApps));
    alert('Project saved successfully!');
  };

  const loadProject = (id: string, autoCreate = true) => {
    const savedApps = JSON.parse(localStorage.getItem('telegram_mini_apps') || '[]');
    const project = savedApps.find((app: AppConfig) => app.id === id);
    if (project) {
      setAppConfig(project);
    } else {
      if (!autoCreate) {
        throw new Error(`Project ${id} not found`);
      }
      // Initialize new project if not found
      const newProject = { ...INITIAL_APP_CONFIG, id };
      setAppConfig(newProject);
      
      // Auto-save the new project immediately so it exists in localStorage
      savedApps.push({ ...newProject, updatedAt: new Date().toISOString() });
      localStorage.setItem('telegram_mini_apps', JSON.stringify(savedApps));
    }
  };

  const importProject = (config: AppConfig) => {
    const savedApps = JSON.parse(localStorage.getItem('telegram_mini_apps') || '[]');
    const existingIndex = savedApps.findIndex((app: AppConfig) => app.id === config.id);
    
    if (existingIndex >= 0) {
      savedApps[existingIndex] = { ...config, updatedAt: new Date().toISOString() };
    } else {
      savedApps.push({ ...config, updatedAt: new Date().toISOString() });
    }
    
    localStorage.setItem('telegram_mini_apps', JSON.stringify(savedApps));
    setAppConfig(config);
    alert('Project imported successfully!');
  };

  const selectComponent = (id: string | null) => {
    setSelectedComponentId(id);
  };

  const addComponent = (component: ComponentConfig) => {
    setAppConfig(prev => {
      const activePage = prev.pages.find(p => p.id === prev.activePageId);
      if (!activePage) return prev;

      const updatedPages = prev.pages.map(page => {
        if (page.id === prev.activePageId) {
          return { ...page, components: [...page.components, component] };
        }
        return page;
      });

      return { ...prev, pages: updatedPages };
    });
    // Auto-select the new component
    setSelectedComponentId(component.id);
  };

  const updateComponent = (id: string, updates: Partial<ComponentConfig>) => {
    setAppConfig(prev => {
      const updatedPages = prev.pages.map(page => {
        const hasComponent = page.components.some(c => c.id === id);
        if (hasComponent) {
          return {
            ...page,
            components: page.components.map(c => c.id === id ? { ...c, ...updates } : c)
          };
        }
        return page;
      });
      return { ...prev, pages: updatedPages };
    });
  };

  const removeComponent = (id: string) => {
    setAppConfig(prev => {
      const updatedPages = prev.pages.map(page => ({
        ...page,
        components: page.components.filter(c => c.id !== id)
      }));
      return { ...prev, pages: updatedPages };
    });
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  return (
    <BuilderContext.Provider value={{ 
      appConfig, 
      setAppConfig, 
      selectedComponentId, 
      selectComponent, 
      addComponent, 
      updateComponent, 
      removeComponent,
      saveProject,
      saveProject,
      loadProject,
      importProject
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
