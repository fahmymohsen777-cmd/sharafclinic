"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { UserCircle, Camera, Lock, CheckCircle2, AlertCircle, Loader2, Phone, User } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passSaving, setPassSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/auth/login";
        return;
      }
      setUser(user);

      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) {
        setProfile(data);
        setName(data.name || "");
        setPhone(data.phone || "");
        setAvatarUrl(data.avatar_url || "");
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      // Upsert: Update if exists, insert if it doesn't (fixes orphaned accounts from RLS errors)
      const { error } = await supabase
        .from("profiles")
        .upsert({ 
          id: user?.id, 
          name, 
          phone, 
          avatar_url: avatarUrl,
          role: profile?.role || 'user'
        });

      if (error) throw error;
      setProfile({ ...profile, name, phone, avatar_url: avatarUrl });
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setMessage({ text: "", type: "" });
      
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to 'avatars' bucket
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      setMessage({ text: "Image uploaded! Click 'Save Changes' to update profile.", type: "success" });
    } catch (err: any) {
      setMessage({ text: err.message || "Error uploading image. Did you create the 'avatars' bucket?", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setMessage({ text: "Password must be at least 6 characters.", type: "error" });
      return;
    }

    setPassSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      setMessage({ text: "Password updated successfully!", type: "success" });
      setPassword("");
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
    } finally {
      setPassSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-dark flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-dark pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <div className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-slate-400">Manage your account details and security.</p>
        </div>

        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {message.text}
          </motion.div>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Avatar Section */}
          <div className="glass p-8 rounded-3xl md:col-span-1 h-fit text-center border border-white/5">
            <div className="relative w-32 h-32 mx-auto mb-6 group cursor-pointer">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-primary/20" />
              ) : (
                <div className="w-full h-full rounded-full bg-dark border-4 border-primary/20 flex items-center justify-center">
                  <UserCircle className="w-16 h-16 text-slate-500" />
                </div>
              )}
              {/* Overlay on hover for File Upload */}
              <label className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                {uploading ? (
                  <Loader2 className="w-8 h-8 text-white mb-1 animate-spin" />
                ) : (
                  <>
                    <Camera className="w-8 h-8 text-white mb-1" />
                    <span className="text-xs text-white font-medium">Upload Image</span>
                  </>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">{profile?.name}</h3>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4 capitalize">
              {profile?.role}
            </span>
            <p className="text-slate-400 text-sm break-all">{user?.email}</p>
          </div>

          {/* Settings Forms */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Personal Info Form */}
            <form onSubmit={handleUpdateProfile} className="glass p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/5 pb-4">Personal Information</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" value={name} onChange={(e) => setName(e.target.value)} required
                      className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-primary transition-colors focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                      className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-primary transition-colors focus:outline-none"
                    />
                  </div>
                </div>

                {/* We removed the URL input since we have the file uploader on the image itself */}

                <div className="flex justify-end pt-4">
                  <button type="submit" disabled={saving || uploading} className="px-6 py-2.5 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-semibold rounded-full transition-all w-full sm:w-auto flex justify-center">
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>

            {/* Password Form */}
            <form onSubmit={handleUpdatePassword} className="glass p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/5 pb-4">Security</h3>
              
              <div>
                <label className="block text-sm text-slate-400 mb-2">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                    placeholder="Enter new password (min 6 characters)"
                    className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-primary transition-colors focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button type="submit" disabled={passSaving || !password} className="px-6 py-2.5 glass hover:bg-white/10 border-white/10 disabled:opacity-50 text-white font-semibold rounded-full transition-all w-full sm:w-auto flex justify-center">
                  {passSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
