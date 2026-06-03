import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes';
import { ThemeProvider } from './context/ThemeContext';
import ThemeSwitcher from './components/ui/ThemeSwitcher';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppRouter />
        <ThemeSwitcher />
      </ThemeProvider>
    </HelmetProvider>
  );
}
