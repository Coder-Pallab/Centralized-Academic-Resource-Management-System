import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../store/slices/themeSlice';
import { useEffect } from 'react';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  useEffect(() => { document.documentElement.classList.toggle('dark', mode === 'dark'); }, [mode]);
  return { mode, isDark: mode === 'dark', toggle: () => dispatch(toggleTheme()), setMode: (m) => dispatch(setTheme(m)) };
};

