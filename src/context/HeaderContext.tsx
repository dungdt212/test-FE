'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type HeaderState = {
  title?: string;
  description?: string;
  button?: ReactNode;
};

const HeaderContext = createContext<{
  state: HeaderState;
  setHeader: (state: HeaderState) => void;
}>({ state: {}, setHeader: () => {} });

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<HeaderState>({});
  return (
    <HeaderContext.Provider value={{ state, setHeader: setState }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);