import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MyProgram, Template } from '../types';

interface ProgramsContextType {
  myPrograms: MyProgram[];
  addProgram: (template: Template) => void;
  updateProgram: (program: MyProgram) => void;
  deleteProgram: (programId: number) => void;
}

const ProgramsContext = createContext<ProgramsContextType | undefined>(undefined);

export const usePrograms = () => {
  const context = useContext(ProgramsContext);
  if (!context) {
    throw new Error('usePrograms must be used within a ProgramsProvider');
  }
  return context;
};

interface ProgramsProviderProps {
  children: ReactNode;
}

export const ProgramsProvider: React.FC<ProgramsProviderProps> = ({ children }) => {
  const [myPrograms, setMyPrograms] = useState<MyProgram[]>([]);

  const addProgram = (template: Template) => {
    const newProgram: MyProgram = {
      ...template,
      id: Date.now(), // Generate unique ID
      dateAdded: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      status: 'New',
      progress: 0,
      isActive: false,
      personalRecords: {},
      workoutHistory: [],
    };
    
    setMyPrograms(prev => [...prev, newProgram]);
  };

  const updateProgram = (program: MyProgram) => {
    setMyPrograms(prev => prev.map(p => 
      p.id === program.id ? { ...program, lastModified: new Date().toISOString() } : p
    ));
  };

  const deleteProgram = (programId: number) => {
    setMyPrograms(prev => prev.filter(p => p.id !== programId));
  };

  return (
    <ProgramsContext.Provider value={{
      myPrograms,
      addProgram,
      updateProgram,
      deleteProgram,
    }}>
      {children}
    </ProgramsContext.Provider>
  );
}; 