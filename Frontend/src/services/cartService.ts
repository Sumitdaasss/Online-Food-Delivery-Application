import api from '../config/api';
import { Cart } from '../types';

export const cartService = {
  async getCart(): Promise<Cart> {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async addToCart(foodId: string): Promise<Cart> {
    try {
      const response = await api.post('/cart', { foodId });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async removeFromCart(foodId: string): Promise<Cart> {
    try {
      const response = await api.post('/cart/remove', { foodId });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async clearCart(): Promise<void> {
    try {
      await api.delete('/cart');
    } catch (error: any) {
      throw error;
    }
  }
};