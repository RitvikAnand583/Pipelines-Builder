import { useState, useEffect } from 'react';
import { PipelineToolbar } from './components/Toolbar';
import { PipelineUI } from './components/PipelineUI';
import { SubmitButton } from './components/SubmitButton';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden ${isDark ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <PipelineToolbar isDark={isDark} toggleTheme={toggleTheme} />
      <PipelineUI isDark={isDark} />
      <SubmitButton isDark={isDark} />
    </div>
  );
}

export default App;
