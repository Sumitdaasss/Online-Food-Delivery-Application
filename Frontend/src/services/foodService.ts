import api from '../config/api';
import { FoodItem } from '../types';

export const foodService = {
  async getAllFoods(): Promise<FoodItem[]> {
    try {
      const response = await api.get('/food');
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getFoodById(id: string): Promise<FoodItem> {
    try {
      const response = await api.get(`/food/${id}`);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async createFood(foodData: FormData): Promise<FoodItem> {
    try {
      const response = await api.post('/food', foodData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async deleteFood(id: string): Promise<void> {
    try {
      await api.delete(`/food/${id}`);
    } catch (error: any) {
      throw error;
    }
  }
};