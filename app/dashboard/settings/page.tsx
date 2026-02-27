'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { Bell, Lock, User, Shield, Zap, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSignOut = () => {
    signOut();
    window.location.href = '/sign-in';
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account, privacy, and preferences"
      />

      <div className="p-6 space-y-6 max-w-2xl">
        {/* Profile Settings */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-border pt-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <Input
                type="text"
                defaultValue={user?.name}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <Input
                type="email"
                defaultValue={user?.email}
                className="bg-input border-border text-foreground"
                disabled
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Notifications</h3>
          </div>

          <div className="space-y-4">
            {[
              { id: 'health_alerts', label: 'Health Alerts', description: 'Get notified for critical health changes' },
              { id: 'daily_digest', label: 'Daily Digest', description: 'Receive a summary of your daily metrics' },
              { id: 'recommendations', label: 'Recommendations', description: 'New personalized recommendations' },
              { id: 'appointments', label: 'Appointments', description: 'Reminders for upcoming appointments' },
              { id: 'milestones', label: 'Milestones', description: 'Celebrate health goals achieved' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <button
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    notificationsEnabled ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      notificationsEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy & Data */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-bold text-foreground">Privacy & Data</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">Shariah Compliant Data Sovereignty</p>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-600 font-medium">
                  Enabled
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your data is processed in compliance with Islamic privacy principles
              </p>
            </div>

            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-foreground">Data Sharing Preferences</p>
                <button
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    dataSharing ? 'bg-primary' : 'bg-muted'
                  }`}
                  onClick={() => setDataSharing(!dataSharing)}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      dataSharing ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Allow researchers to use your anonymized data for health studies
              </p>
            </div>

            <Button variant="outline" className="w-full border-border text-foreground hover:bg-card">
              <Share2 className="w-4 h-4 mr-2" />
              Manage Data Sharing
            </Button>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-destructive" />
            <h3 className="text-lg font-bold text-foreground">Security</h3>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-card">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-card">
              <Shield className="w-4 h-4 mr-2" />
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full justify-start border-border text-foreground hover:bg-card">
              <Zap className="w-4 h-4 mr-2" />
              Active Sessions
            </Button>
          </div>
        </Card>

        {/* Integrations */}
        <Card className="p-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-bold text-foreground">Connected Devices & Apps</h3>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Apple Health', connected: true },
              { name: 'Fitbit', connected: true },
              { name: 'Oura Ring', connected: false },
              { name: 'Google Fit', connected: false },
            ].map((integration) => (
              <div key={integration.name} className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
                <p className="font-medium text-foreground">{integration.name}</p>
                <Button
                  size="sm"
                  variant={integration.connected ? 'outline' : 'default'}
                  className={
                    integration.connected
                      ? 'border-border text-foreground hover:bg-card'
                      : 'bg-primary hover:bg-primary/90'
                  }
                >
                  {integration.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="p-6 border border-destructive/30 bg-destructive/5">
          <h3 className="text-lg font-bold text-foreground mb-4">Account Management</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-card">
              Download My Data
            </Button>
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-card">
              Delete Account & Data
            </Button>
            <Button
              onClick={handleSignOut}
              className="w-full gap-2 bg-destructive hover:bg-destructive/90"
            >
              Sign Out
            </Button>
          </div>
        </Card>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground">
          <p>PULSAR v1.0.0</p>
          <p className="text-xs mt-1">Last updated: February 27, 2026</p>
        </div>
      </div>
    </div>
  );
}
