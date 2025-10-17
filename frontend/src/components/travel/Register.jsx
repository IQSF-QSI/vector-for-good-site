import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Plane } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await register(
      formData.email,
      formData.password,
      formData.fullName,
      formData.company
    );

    if (result.success) {
      navigate('/corporate-travel/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-12 h-12 text-white mr-3" />
            <h1 className="text-4xl font-bold text-white">Vector Travel</h1>
          </div>
          <p className="text-purple-200">Corporate Travel Intelligence Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Register for corporate travel access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  Company (Optional)
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Already have an account? </span>
                <Link to="/corporate-travel/login" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-purple-200 hover:text-white text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;