import { useState, useContext, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pageTitle, setPageTitle] = useState('');
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState('');

  return (
    <AppContext.Provider
      value={{
        selectedYear,
        setSelectedYear,
        pageTitle,
        setPageTitle,
        objects,
        setObjects,
        selectedObject,
        setSelectedObject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export { AppProvider };
