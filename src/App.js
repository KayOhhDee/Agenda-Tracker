import { useState } from 'react';
import { Content } from './components/layout/Content'
import { Header } from './components/layout/Header'
import { ProjectsProvider, SelectedProjectProvider } from './context'

export const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault)

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main
          className={`${darkMode ? 'dark-mode' : ''}`}
          data-testid="application"
        >
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

