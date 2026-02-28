'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { Bell, Lock, User, Shield, Zap, Share2, LogOut, Download, Trash2, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const handleSignOut = () => {
    signOut();
    window.location.href = '/sign-in';
  };

  const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={cn(
        "relative flex items-center shrink-0 w-12 h-6 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        active ? "bg-primary" : "bg-muted"
      )}
    >
      <motion.div
        className="absolute w-4 h-4 rounded-full bg-white shadow-sm"
        animate={{
          left: active ? "calc(100% - 1.25rem)" : "0.25rem",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-background pb-12">
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account, privacy, and preferences."
      />

      <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Left Column: Personal & Notifications */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">

            {/* Profile Settings */}
            <Card className="p-6 md:p-8 border-border/50 bg-card/40 backdrop-blur-md shadow-sm rounded-3xl relative overflow-hidden">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">{user?.name || "Guest User"}</h2>
                  <p className="text-muted-foreground mt-1">{user?.email || "guest@pulsar.app"}</p>
                </div>
              </div>

              <div className="space-y-5 border-t border-border/40 pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Full Name</label>
                    <Input
                      type="text"
                      defaultValue={user?.name || "Guest"}
                      className="bg-background/50 border-border/50 text-foreground h-12 rounded-xl focus-visible:ring-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted-foreground ml-1">Email Address</label>
                    <Input
                      type="email"
                      defaultValue={user?.email || "guest@pulsar.app"}
                      className="bg-secondary/30 border-transparent text-muted-foreground h-12 rounded-xl opacity-70 cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-11 px-6 shadow-sm shadow-primary/20">
                    Save Changes
                  </Button>
                </div>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="p-6 md:p-8 border-border/50 bg-card/40 backdrop-blur-md shadow-sm rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Bell className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Notifications</h3>
              </div>

              <div className="space-y-3">
                {[
                  { id: 'health_alerts', label: 'Health Alerts', description: 'Immediate alerts for critical metrics.' },
                  { id: 'daily_digest', label: 'Daily Digest', description: 'Morning summary of your statistics.' },
                  { id: 'recommendations', label: 'Recommendations', description: 'New personalized health advice.' },
                ].map((item, index) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-background/40 rounded-2xl border border-border/30 hover:bg-background/60 transition-colors">
                    <div className="pr-4">
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
                    </div>
                    <div className="self-start sm:self-center">
                      {/* In a real app, each would have its own state. Using global for demo. */}
                      <Toggle active={notificationsEnabled} onToggle={() => setNotificationsEnabled(!notificationsEnabled)} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Integrations */}
            <Card className="p-6 md:p-8 border-border/50 bg-card/40 backdrop-blur-md shadow-sm rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Smartphone className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Connected Devices</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Apple Health', connected: true },
                  { name: 'Google Fit', connected: true },
                  { name: 'Oura Ring', connected: false },
                  { name: 'Garmin Connect', connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between p-4 bg-background/40 rounded-2xl border border-border/30">
                    <p className="font-semibold text-foreground text-sm">{integration.name}</p>
                    <Button
                      size="sm"
                      variant={integration.connected ? 'secondary' : 'default'}
                      className={cn(
                        "h-8 rounded-lg font-medium text-xs px-3 shadow-none",
                        integration.connected ? "hover:bg-destructive/10 hover:text-destructive" : ""
                      )}
                    >
                      {integration.connected ? 'Revoke' : 'Connect'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Security, Privacy, Danger Area */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8">

            {/* Privacy & Data */}
            <Card className="p-6 md:p-8 border-border/50 bg-card/40 backdrop-blur-md shadow-sm rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <Shield className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Privacy</h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-background/40 rounded-2xl border border-border/30">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-semibold text-foreground leading-tight">Shariah Compliant Data</p>
                    <span className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold uppercase tracking-wider">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Data is processed strictly in accordance with ethical privacy principles.
                  </p>
                </div>

                <div className="p-5 bg-background/40 rounded-2xl border border-border/30">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <p className="font-semibold text-foreground">Clinical Research</p>
                    <Toggle active={dataSharing} onToggle={() => setDataSharing(!dataSharing)} />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Allow anonymized data to be used in secure medical studies.
                  </p>
                </div>

                <Button variant="outline" className="w-full bg-background/50 border-border/40 hover:bg-background/80 hover:text-foreground text-muted-foreground font-semibold rounded-xl h-11">
                  <Share2 className="w-4 h-4 mr-2" />
                  Detailed Preferences
                </Button>
              </div>
            </Card>

            {/* Security */}
            <Card className="p-6 md:p-8 border-border/50 bg-card/40 backdrop-blur-md shadow-sm rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-500/10 rounded-xl">
                  <Lock className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground tracking-tight">Security</h3>
              </div>

              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-background/40 border-border/30 hover:bg-background/60 text-foreground font-medium rounded-xl h-12 px-5 group">
                  <Lock className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  Update Password
                </Button>
                <Button variant="outline" className="w-full justify-start bg-background/40 border-border/30 hover:bg-background/60 text-foreground font-medium rounded-xl h-12 px-5 group">
                  <Zap className="w-4 h-4 mr-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                  Two-Factor Auth
                </Button>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="p-6 md:p-8 border-destructive/20 bg-destructive/5 backdrop-blur-md shadow-sm rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-lg font-bold text-destructive tracking-tight">Danger Zone</h3>
              </div>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start hover:bg-destructive/10 text-muted-foreground hover:text-destructive font-medium rounded-xl h-11 px-4 transition-colors">
                  <Download className="w-4 h-4 mr-3" />
                  Export Account Data
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-destructive/10 text-muted-foreground hover:text-destructive font-medium rounded-xl h-11 px-4 transition-colors">
                  <Trash2 className="w-4 h-4 mr-3" />
                  Delete Account
                </Button>
                <div className="pt-4 mt-2 border-t border-destructive/10">
                  <Button
                    onClick={handleSignOut}
                    className="w-full gap-2 bg-destructive/10 hover:bg-destructive text-destructive hover:text-destructive-foreground font-bold rounded-xl h-12 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out Securely
                  </Button>
                </div>
              </div>
            </Card>

            {/* Version Info */}
            <div className="text-center pt-4 opacity-50 select-none">
              <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground">Pulsar System</span>
              <p className="text-[10px] text-muted-foreground mt-1">v1.2.0-stable</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
