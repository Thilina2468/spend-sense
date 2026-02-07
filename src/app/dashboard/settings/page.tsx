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
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="bg-dark-card/40 backdrop-blur-md border border-dark-border/30 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 pb-4 border-b border-dark-border/30">Profile Information</h2>

          <div className="space-y-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-neon-green to-neon-cyan flex items-center justify-center text-2xl font-bold text-white">
              {mockUser.username.charAt(0).toUpperCase()}
            </div>

            <div>
              <Label className="text-gray-300">Username</Label>
              <Input value={mockUser.username} disabled className="mt-2 bg-dark-bg/50 border-dark-border/30 text-gray-300 cursor-not-allowed" />
            </div>

            <div>
              <Label className="text-gray-300">Email</Label>
              <Input value={mockUser.email} disabled className="mt-2 bg-dark-bg/50 border-dark-border/30 text-gray-300 cursor-not-allowed" />
            </div>

            <div>
              <Label className="text-gray-300">Member Since</Label>
              <Input
                value={new Date(mockUser.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                disabled
                className="mt-2 bg-dark-bg/50 border-dark-border/30 text-gray-300 cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-card/40 backdrop-blur-md border border-dark-border/30 rounded-xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4 pb-4 border-b border-dark-border/30">Preferences</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="currency" className="text-gray-300">
                Currency
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="mt-2 bg-dark-bg/50 border-dark-border/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-card/40 backdrop-blur-md border-dark-border/30">
                  <SelectItem value="USD" className="text-white hover:bg-dark-bg">
                    USD ($)
                  </SelectItem>
                  <SelectItem value="EUR" className="text-white hover:bg-dark-bg">
                    EUR (€)
                  </SelectItem>
                  <SelectItem value="GBP" className="text-white hover:bg-dark-bg">
                    GBP (£)
                  </SelectItem>
                  <SelectItem value="INR" className="text-white hover:bg-dark-bg">
                    INR (₹)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dateFormat" className="text-gray-300">
                Date Format
              </Label>
              <Select value={dateFormat} onValueChange={setDateFormat}>
                <SelectTrigger className="mt-2 bg-dark-bg/50 border-dark-border/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dark-card/40 backdrop-blur-md border-dark-border/30">
                  <SelectItem value="MM/DD/YYYY" className="text-white hover:bg-dark-bg">
                    MM/DD/YYYY
                  </SelectItem>
                  <SelectItem value="DD/MM/YYYY" className="text-white hover:bg-dark-bg">
                    DD/MM/YYYY
                  </SelectItem>
                  <SelectItem value="YYYY-MM-DD" className="text-white hover:bg-dark-bg">
                    YYYY-MM-DD
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                onClick={handleSaveSettings}
                className={`w-full flex items-center justify-center gap-2 transition-all-smooth ${
                  saved ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white font-semibold`}
              >
                {saved && <BiCheck size={20} />}
                {saved ? 'Settings Saved!' : 'Save Preferences'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white pb-4 border-b border-dark-border">Account Actions</h2>

        <div className="space-y-3">
          <div className="p-4 bg-dark-bg border border-dark-border rounded-lg">
            <p className="text-white font-medium mb-2">Change Password</p>
            <p className="text-gray-400 text-sm mb-4">Update your password to keep your account secure</p>
            <Button variant="outline" className="border-dark-border hover:bg-dark-bg text-gray-300 w-full md:w-auto">
              Change Password
            </Button>
          </div>

          <div className="p-4 bg-dark-bg border border-dark-border rounded-lg">
            <p className="text-white font-medium mb-2">Delete Account</p>
            <p className="text-gray-400 text-sm mb-4">Permanently delete your account and all associated data</p>
            <Button variant="outline" className="border-red-500/50 hover:bg-red-500/10 text-red-400 w-full md:w-auto">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2"
        >
          <BiLogOut size={20} />
          Logout
        </Button>
      </div>
    </div>
  );
}
