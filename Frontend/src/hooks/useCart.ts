import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '../services/cartService';
import { mockCartService } from '../services/mockServices';
import toast from 'react-hot-toast';

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      try {
        return await cartService.getCart();
      } catch (error: any) {
        console.warn('API not available, using mock cart:', error.message);
        return await mockCartService.getCart();
      }
    },
    retry: false,
    staleTime: 30000, // 30 seconds
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (foodId: string) => {
      try {
        return await cartService.addToCart(foodId);
      } catch (error: any) {
        console.warn('API not available, using mock cart:', error.message);
        return await mockCartService.addToCart(foodId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item added to cart!');
    },
    onError: (error: any) => {
      const message = error.message || 'Failed to add item to cart. Please try again.';
      toast.error(message);
    }
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (foodId: string) => {
      try {
        return await cartService.removeFromCart(foodId);
      } catch (error: any) {
        console.warn('API not available, using mock cart:', error.message);
        return await mockCartService.removeFromCart(foodId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Item removed from cart!');
    },
    onError: (error: any) => {
      const message = error.message || 'Failed to remove item from cart. Please try again.';
      toast.error(message);
    }
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      try {
        return await cartService.clearCart();
      } catch (error: any) {
        console.warn('API not available, using mock cart:', error.message);
        return await mockCartService.clearCart();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Cart cleared!');
    },
    onError: (error: any) => {
      const message = error.message || 'Failed to clear cart. Please try again.';
      toast.error(message);
    }
  });
};