import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotesApi, createNoteApi, deleteNoteApi } from '../api/noteApi';

export const useNotes = (filters = {}) => {
  return useQuery({
    queryKey: ['notes', filters],
    queryFn: () => getNotesApi(filters),
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNoteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
};