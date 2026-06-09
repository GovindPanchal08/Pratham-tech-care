import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ThemeSwitcher from './components/ui/ThemeSwitcher';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppRouter />
          <ThemeSwitcher />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
