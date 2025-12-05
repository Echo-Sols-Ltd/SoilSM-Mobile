import React from 'react';

export const useAuth = jest.fn(() => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: jest.fn(() => Promise.resolve({success: true})),
  signUp: jest.fn(() => Promise.resolve({success: true})),
  logout: jest.fn(() => Promise.resolve()),
  checkAuth: jest.fn(() => Promise.resolve()),
}));

export const AuthProvider = ({children}: {children: React.ReactNode}) => children;

