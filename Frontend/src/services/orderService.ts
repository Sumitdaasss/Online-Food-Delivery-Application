import api from '../config/api';
import { Order, CreateOrderRequest, PaymentVerificationRequest } from '../types';

export const orderService = {
  async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await api.post('/order', orderData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async verifyPayment(paymentData: PaymentVerificationRequest): Promise<any> {
    try {
      const response = await api.post('/order/verify-payment', paymentData);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getUserOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/order/user');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/order/all');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      const response = await api.put(`/order/${orderId}/status`, { status });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteOrder(orderId: string): Promise<void> {
    try {
      await api.delete(`/order/${orderId}`);
    } catch (error: any) {
      throw error;
    }
  }
};