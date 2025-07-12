// File: src/components/Navbar.jsx
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Button from './Button';

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">React Project</h1>
      <Button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </nav>
  );
}
export default Navbar;
