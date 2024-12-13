'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore, useCompanyStore } from '@/store/store.js'; // Correct import syntax

import apiClient from '@/utils/apiClient.js'; // Import apiClient
import { useNavigate } from 'react-router-dom';
export default function CreateCompany() {
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const { user } = useAuthStore(); // Get user info from auth store
  const { setCompany } = useCompanyStore(); // Get function to set company in store
    const navigate=useNavigate();
  const handleCreateCompany = async (e) => {
    e.preventDefault();

    if (!companyName || !companyId || !user) {
      return alert('Please fill all fields and ensure you are logged in.');
    }

    // Prepare request data
    const companyData = {
      company_name: companyName,
      company_id: companyId,
      email: user.email,
      
    };
    console.log(companyData)

    try {
      const company = await apiClient.post('/companies/create', companyData);
      setCompany(company); // Set company in Zustand store
      alert('Company created successfully!');
      navigate('/')
    } catch (error) {
      console.log(error)
      alert('Error creating company!',error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2596be]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Company</CardTitle>
          <p className="text-center text-sm">Enter company details below:</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCompany} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyId">Company ID</Label>
              <Input
                id="companyId"
                name="companyId"
                type="text"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                placeholder="Enter company ID"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-black">
              Create Company
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm w-full">
            <a href="/companies" className="hover:underline">
              View Companies
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
