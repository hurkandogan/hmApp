import { useState, useContext, createContext } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [pageTitle, setPageTitle] = useState('');
  const [objects, setObjects] = useState([]);
  const [sidebarObjects, setSidebarObjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedObject, setSelectedObject] = useState('');

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        selectedYear,
        setSelectedYear,
        pageTitle,
        setPageTitle,
        objects,
        setObjects,
        sidebarObjects,
        setSidebarObjects,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
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
