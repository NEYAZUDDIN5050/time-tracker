import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasksApi, createTaskApi, updateTaskApi, deleteTaskApi } from '../api/taskApi';

export const useTasks = (filters = {}) => {
  return useQuery({
    queryKey: ['tasks', filters],
    queryFn: () => getTasksApi(filters),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};


// React Query automatically handle karta hai: loading state, error state, caching (agar same data dobara chahiye thodi der me, cache se de dega bina naya request kiye), background refetching.
//Ye bahut important pattern hai — "cache invalidation". Jab naya task successfully create ho jaye, humein task list ko refresh karna hai (taaki naya task turant dikhe bina manual page-reload ke). invalidateQueries({ queryKey: ['tasks'] }) React Query ko batata hai: "jo bhi data 'tasks' key se related hai, use stale/outdated mark kar do" — isse React Query automatically us data ko refetch kar dega, aur UI apne aap update ho jayega.

// Poora flow samjho: User "Create Task" button dabata hai → useCreateTask() ka mutation chalta hai 
// → API call successful hoti hai → onSuccess chalta hai → invalidateQueries task-list ko refresh trigger karta hai →
//  jo bhi component useTasks() use kar raha hai, wo automatically naye data ke saath re-render ho jata hai
//  — bina humein manually kuch refresh/reload karne ke!
//
//