import React, { useState } from 'react';
import { ChromeIcon as Google } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {useAuthStore} from '@/store/store.js'; // Assuming your Zustand store is in this path
import apiClient from '@/utils/apiClient';
import { useNavigate } from 'react-router-dom';
export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, setUser } = useAuthStore();
const navigate=useNavigate();
  const handleSignIn = async () => {

    if(user){
      alert('already signed in ')
      return null
    }
    setError(''); // Reset error
    try {
      const data = await apiClient.post('/users/signin',  {email, password} );
      setUser(data.user); // Update Zustand store with the user info
      navigate('/')
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2596be]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign in to Transparent</CardTitle>
          <p className="text-sm">Welcome back! Please sign in to continue</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-gray-100"
              id="email"
              type="email"
              placeholder="sharath@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="bg-gray-100"
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-red-500 hover:bg-red-700 text-black"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Don't have an account?{' '}
            <a href="/sign-up" className="hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
