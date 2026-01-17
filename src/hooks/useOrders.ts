import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  status: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    const result = await apiClient.getOrders();
    
    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setOrders(result.data);
    }
    
    setLoading(false);
  }, []);

  const getOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);
    
    const result = await apiClient.getOrder(orderId);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
      return null;
    }
    
    return result.data;
  }, []);

  const createOrder = useCallback(async (items: OrderItem[]) => {
    setLoading(true);
    setError(null);
    
    const result = await apiClient.createOrder(items);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
      return null;
    }
    
    // Refresh orders list
    await fetchOrders();
    
    return result.data;
  }, [fetchOrders]);

  const updateStatus = useCallback(async (orderId: string, status: string) => {
    setLoading(true);
    setError(null);
    
    const result = await apiClient.updateOrderStatus(orderId, status);
    
    setLoading(false);
    
    if (result.error) {
      setError(result.error);
      return false;
    }
    
    // Update local state
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    );
    
    return true;
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrder,
    createOrder,
    updateStatus,
  };
}
