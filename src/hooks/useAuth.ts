import { useState, useEffect } from 'react';
import { User } from '../types';
import { supabase, TABLES } from '../lib/supabase';

const CURRENT_USER_KEY = 'spmb_current_user';

// Default admin user
const defaultAdmin: User = {
  id: 'admin-001',
  name: 'Administrator',
  username: 'admin',
  password: 'admin123',
  role: 'ADMIN',
  createdAt: new Date().toISOString()
};

export const useAuth = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: load users from Supabase and restore session
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Restore current user from localStorage
      const storedCurrentUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedCurrentUser) {
        const user = JSON.parse(storedCurrentUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      }

      // Load users from Supabase
      await loadUsers();
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.USERS)
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        // Check if it's a "table not found" error
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          console.warn('⚠️ Supabase tables belum dibuat. Silakan jalankan SQL schema di Supabase SQL Editor.');
          console.warn('📄 Buka file: supabase-schema.sql dan jalankan di Supabase Dashboard.');
          setUsers([defaultAdmin]);
        } else {
          // Other error, try to create default admin
          await createDefaultAdmin();
        }
      } else if (data && data.length > 0) {
        setUsers(data);
      } else {
        // No users exist, create default admin
        await createDefaultAdmin();
      }
    } catch (error) {
      console.error('Error loading users:', error);
      // Fallback to default admin in state
      setUsers([defaultAdmin]);
    }
  };

  const createDefaultAdmin = async () => {
    try {
      const { error } = await supabase
        .from(TABLES.USERS)
        .insert([defaultAdmin]);

      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          console.warn('⚠️ Table "users" belum ada. Menggunakan localStorage sementara.');
        } else {
          console.error('Error creating default admin:', error);
        }
        // Use local state as fallback
        setUsers([defaultAdmin]);
      } else {
        setUsers([defaultAdmin]);
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
      setUsers([defaultAdmin]);
    }
  };

  const login = (username: string, password: string): { success: boolean; message: string; user?: User } => {
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, message: 'Login berhasil!', user };
    }
    
    return { success: false, message: 'Username atau password salah!' };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  const createUser = async (userData: Omit<User, 'id' | 'createdAt'>): Promise<{ success: boolean; message: string }> => {
    try {
      // Check if username already exists
      const existingUser = users.find(u => u.username === userData.username);
      if (existingUser) {
        return { success: false, message: 'Username sudah digunakan!' };
      }

      const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      // Try to insert into Supabase
      const { error } = await supabase
        .from(TABLES.USERS)
        .insert([newUser]);

      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
          console.warn('⚠️ Supabase belum siap. Data disimpan di localStorage saja.');
          // Still update local state for development
          setUsers([...users, newUser]);
          return { success: true, message: 'User berhasil dibuat (localStorage)!' };
        }
        console.error('Supabase error:', error);
        return { success: false, message: 'Gagal membuat user di database!' };
      }

      // Update local state
      setUsers([...users, newUser]);
      return { success: true, message: 'User berhasil dibuat!' };
    } catch (error) {
      console.error('Error creating user:', error);
      return { success: false, message: 'Terjadi kesalahan saat membuat user!' };
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>): Promise<{ success: boolean; message: string }> => {
    try {
      const userIndex = users.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        return { success: false, message: 'User tidak ditemukan!' };
      }

      // Check if username is being changed and if it's already taken
      if (updates.username && updates.username !== users[userIndex].username) {
        const existingUser = users.find(u => u.username === updates.username);
        if (existingUser) {
          return { success: false, message: 'Username sudah digunakan!' };
        }
      }

      const updatedUser = { ...users[userIndex], ...updates };

      // Update in Supabase
      const { error } = await supabase
        .from(TABLES.USERS)
        .update(updates)
        .eq('id', userId);

      if (error) {
        console.error('Supabase error:', error);
        return { success: false, message: 'Gagal mengupdate user di database!' };
      }

      // Update local state
      const updatedUsers = [...users];
      updatedUsers[userIndex] = updatedUser;
      setUsers(updatedUsers);

      // Update current user if it's the same user being updated
      if (currentUser?.id === userId) {
        setCurrentUser(updatedUser);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      }

      return { success: true, message: 'User berhasil diupdate!' };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, message: 'Terjadi kesalahan saat mengupdate user!' };
    }
  };

  const deleteUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Prevent deleting the current user
      if (currentUser?.id === userId) {
        return { success: false, message: 'Tidak dapat menghapus user yang sedang login!' };
      }

      // Prevent deleting the default admin
      if (userId === defaultAdmin.id) {
        return { success: false, message: 'Tidak dapat menghapus admin default!' };
      }

      // Delete from Supabase
      const { error } = await supabase
        .from(TABLES.USERS)
        .delete()
        .eq('id', userId);

      if (error) {
        console.error('Supabase error:', error);
        return { success: false, message: 'Gagal menghapus user di database!' };
      }

      // Update local state
      const filteredUsers = users.filter(u => u.id !== userId);
      setUsers(filteredUsers);
      return { success: true, message: 'User berhasil dihapus!' };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { success: false, message: 'Terjadi kesalahan saat menghapus user!' };
    }
  };

  const resetPassword = async (userId: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
    return updateUser(userId, { password: newPassword });
  };

  return {
    users,
    currentUser,
    isAuthenticated,
    isLoading,
    login,
    logout,
    createUser,
    updateUser,
    deleteUser,
    resetPassword
  };
};
