'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiClient from '@/utils/apiClient'; // Import the API client
import { useAuthStore } from '../store/store.js'; // Import the Zustand store
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    company_id: '', // Match the API's expected field name
  });
  const navigate = useNavigate();
  const [showCompanyId, setShowCompanyId] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuthStore();
  const setUser = useAuthStore((state) => state.setUser); // Zustand's `setUser` method

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
    setShowCompanyId(value === 'TEAM LEAD' || value === 'EMP');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const data = await apiClient.post('/users/signup', formData);
      setUser(data.user); // Update the auth store with user info
      console.log(user); // Log the user info to confirm

      if (data.user.role === 'HR') {
        navigate('/company-reg');
      } else {
        navigate('/');
      }
      setSuccess(true); // Show success message or redirect
    } catch (err) {
      setError(err.message || 'Something went wrong during sign up.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2596be]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign up to Transparent</CardTitle>
          <p className="text-center text-sm">Welcome to Transparent! Please sign up</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">Sign up successful!</p>}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={handleRoleChange}
                value={formData.role}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="TEAM LEAD">Team Lead</SelectItem>
                  <SelectItem value="EMP">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {showCompanyId && (
              <div className="space-y-2">
                <Label htmlFor="company_id">Company ID</Label>
                <Input
                  id="company_id"
                  name="company_id"
                  placeholder="Enter your company ID"
                  value={formData.company_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-black">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm w-full">
            Already have an account?{' '}
            <a href="/sign-in" className="hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
