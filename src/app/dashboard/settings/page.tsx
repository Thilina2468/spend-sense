'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUser } from '@/lib/mock-data';
import { BiLogOut, BiCheck } from 'react-icons/bi';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [saved, setSaved] = useState(false);

  const handleSaveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    router.push('/auth');
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">Profile Information</h2>

          <div className="space-y-4">
            <div className="w-16 h-16 rounded-lg bg-brand-green flex items-center justify-center text-2xl font-bold text-white">
              {mockUser.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <Label className="text-gray-700">Username</Label>
              <Input value={mockUser.username} disabled className="mt-2 bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed" />
            </div>

            <div>
              <Label className="text-gray-700">Email</Label>
              <Input value={mockUser.email} disabled className="mt-2 bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed" />
            </div>

            <div>
              <Label className="text-gray-700">Member Since</Label>
              <Input
                value={new Date(mockUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                disabled
                className="mt-2 bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-4 border-b border-gray-200">Preferences</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="currency" className="text-gray-700">
                Currency
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="mt-2 bg-gray-50 border-gray-300 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg">
                  <SelectItem value="USD" className="text-gray-900 hover:bg-gray-100">
                    USD ($)
                  </SelectItem>
                  <SelectItem value="EUR" className="text-gray-900 hover:bg-gray-100">
                    EUR (€)
                  </SelectItem>
                  <SelectItem value="GBP" className="text-gray-900 hover:bg-gray-100">
                    GBP (£)
                  </SelectItem>
                  <SelectItem value="INR" className="text-gray-900 hover:bg-gray-100">
                    INR (₹)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFormat" className="text-gray-700">
                Date Format
              </Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="mt-2 bg-gray-50 border-gray-300 text-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg">
                  <SelectItem value="MM/DD/YYYY" className="text-gray-900 hover:bg-gray-100">
                    MM/DD/YYYY
                  </SelectItem>
                  <SelectItem value="DD/MM/YYYY" className="text-gray-900 hover:bg-gray-100">
                    DD/MM/YYYY
                  </SelectItem>
                  <SelectItem value="YYYY-MM-DD" className="text-gray-900 hover:bg-gray-100">
                    YYYY-MM-DD
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSaveSettings}
                className={`w-full flex items-center justify-center gap-2 transition-all-smooth ${
                  saved ? 'bg-brand-green hover:bg-brand-green-hover' : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold`}
              >
                {saved && <BiCheck size={20} />}
                {saved ? 'Settings Saved!' : 'Save Preferences'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b border-gray-200">Account Actions</h2>

        <div className="space-y-3">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">Change Password</p>
            <p className="text-gray-600 text-sm mb-4">Update your password to keep your account secure</p>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-100 text-gray-700 w-full md:w-auto">
              Change Password
            </Button>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">Delete Account</p>
            <p className="text-gray-600 text-sm mb-4">Permanently delete your account and all associated data</p>
            <Button variant="outline" className="border-red-300 hover:bg-red-50 text-red-600 w-full md:w-auto">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-md rounded-xl p-6">
        <Button
          onClick={handleLogout}
          className="w-full bg-black hover:bg-gray-900 text-white font-semibold flex items-center justify-center gap-2"
        >
          <BiLogOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
}
