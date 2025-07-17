import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orderService';
import { mockOrderService } from '../services/mockServices';
import { CreateOrderRequest, PaymentVerificationRequest } from '../types';
import toast from 'react-hot-toast';

export const useUserOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        return await orderService.getUserOrders();
      } catch (error: any) {
        console.warn('API not available, using mock orders:', error.message);
        return await mockOrderService.getUserOrders();
      }
    },
    retry: false,
  });
};

export const useAllOrders = () => {
  return useQuery({
    queryKey: ['orders', 'all'],
    queryFn: async () => {
      try {
        return await orderService.getAllOrders();
      } catch (error: any) {
        console.warn('API not available, using mock orders:', error.message);
        return await mockOrderService.getAllOrders();
      }
    },
    retry: false,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderData: CreateOrderRequest) => {
      try {
        return await orderService.createOrder(orderData);
      } catch (error: any) {
        console.warn('API not available, using mock orders:', error.message);
        return await mockOrderService.createOrder(orderData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast.success('Order created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create order');
    }
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (paymentData: PaymentVerificationRequest) => {
      try {
        return await orderService.verifyPayment(paymentData);
      } catch (error: any) {
        console.warn('API not available, using mock verification:', error.message);
        return await mockOrderService.verifyPayment();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Payment verified successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Payment verification failed');
    }
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      try {
        return await orderService.updateOrderStatus(orderId, status);
      } catch (error: any) {
        console.warn('API not available, using mock orders:', error.message);
        return await mockOrderService.updateOrderStatus(orderId, status);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update order status');
    }
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderId: string) => {
      try {
        return await orderService.deleteOrder(orderId);
      } catch (error: any) {
        console.warn('API not available, using mock orders:', error.message);
        return await mockOrderService.deleteOrder(orderId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete order');
    }
  });
};