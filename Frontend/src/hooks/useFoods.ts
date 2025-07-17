import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foodService } from '../services/foodService';
import { mockFoodService } from '../services/mockServices';
import { FoodItem } from '../types';
import toast from 'react-hot-toast';

export const useFoods = () => {
  return useQuery({
    queryKey: ['foods'],
    queryFn: async (): Promise<FoodItem[]> => {
      try {
        // Try to fetch from real API first
        return await foodService.getAllFoods();
      } catch (error: any) {
        console.warn('API not available, using mock data:', error.message);
        // Fall back to mock data if API fails
        return await mockFoodService.getAllFoods();
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // Don't retry failed requests
  });
};

export const useFood = (id: string) => {
  return useQuery({
    queryKey: ['food', id],
    queryFn: async (): Promise<FoodItem> => {
      try {
        return await foodService.getFoodById(id);
      } catch (error: any) {
        console.warn('API not available, using mock data:', error.message);
        return await mockFoodService.getFoodById(id);
      }
    },
    enabled: !!id,
    retry: false,
  });
};

export const useCreateFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (foodData: FormData): Promise<FoodItem> => {
      try {
        return await foodService.createFood(foodData);
      } catch (error: any) {
        console.warn('API not available, using mock service:', error.message);
        return await mockFoodService.createFood(foodData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      toast.success('Food item created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create food item');
    }
  });
};

export const useDeleteFood = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      try {
        return await foodService.deleteFood(id);
      } catch (error: any) {
        console.warn('API not available, using mock service:', error.message);
        return await mockFoodService.deleteFood(id);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foods'] });
      toast.success('Food item deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete food item');
    }
  });
};