import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios';
import { useLocation } from 'react-router-dom';


interface IProps {
  children: ReactNode;
}

const NameContext = createContext<INameContext | undefined>(undefined);
export const useNameContext = () => {
    const context = useContext(NameContext);
    if (!context) throw new Error('useNameContext must be used within a NameProvider');
    return context;
};

export default function NameProvider({ children }: IProps) {

    const [search, setSearch] = useState('');
    const [searchNameResults, setSearchNameResults] = useState<IName[]>([]);
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const queryClient = useQueryClient();
    const location = useLocation()

  // GET: get all names
  const { data: names, isLoading: isFetching, error: fetchError } = useQuery({
    queryKey: ['names'],
    queryFn: async () => {
      const { data } = await api.get('/name');
      return data.data;
    },
  });

  // POST: Add a new name
  const addNameMutation = useMutation({
    mutationFn: async (nameDetail: IName) => {
      const { data } = await api.post('/name', nameDetail);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['names']});
      setIsLoading(false)
    },
    onError: (error: Error) => {
        setError(error.message)
        setIsLoading(false)
    }
  });

  // PUT: Update an existing name
  const updateNameMutation = useMutation({
    mutationFn: async (nameDetail: IName) => {
      const { data } = await api.put(`/name/${nameDetail.name}`, nameDetail);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['names']});
      setIsLoading(false)
    },
    onError: (error: Error) => {
        setError(error.message)
        setIsLoading(false)
    }
  });

  // DELETE: Remove a name
  const deleteNameMutation = useMutation({
    mutationFn: async (name: string) => {
      await api.delete(`/name/${name}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['names']});
      setIsLoading(false)
    },
    onError: (error: Error) => {
        setError(error.message)
        setIsLoading(false)
    }
  });

  const addName = (nameDetail: IName) => addNameMutation.mutate(nameDetail)
  const updateName = (nameDetail: IName) => updateNameMutation.mutate(nameDetail)
  const deleteName = (name: string) => deleteNameMutation.mutate(name)

  useEffect(() => {
    if (names) {
      const filteredNames = names.filter(
        (name: IName) =>
          name.name.toLowerCase().includes(search.toLowerCase()) ||
          name.nameInEnglish.toLowerCase().includes(search.toLowerCase())
      );
      setSearchNameResults(filteredNames);
    }
  }, [names, search]);

  useEffect(() => {
    setError('')
    setSearch('')
  }, [location])

  return (
    <NameContext.Provider
      value={{
        names: names || [],
        search, setSearch,
        searchNameResults,
        isLoading: isFetching || isLoading,
        error: fetchError?.message || error,

        addName, updateName, deleteName,
      }}
    >
      {children}
    </NameContext.Provider>
  );
};