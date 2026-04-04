"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, User, Phone, AlertCircle, Loader2, ChevronDown } from "lucide-react";

const countryCodes = [
  { code: "+20", flag: "🇪🇬", name: "مصر" },
  { code: "+966", flag: "🇸🇦", name: "السعودية" },
  { code: "+971", flag: "🇦🇪", name: "الإمارات" },
  { code: "+965", flag: "🇰🇼", name: "الكويت" },
  { code: "+974", flag: "🇶🇦", name: "قطر" },
  { code: "+973", flag: "🇧🇭", name: "البحرين" },
  { code: "+968", flag: "🇴🇲", name: "عُمان" },
  { code: "+962", flag: "🇯🇴", name: "الأردن" },
  { code: "+961", flag: "🇱🇧", name: "لبنان" },
  { code: "+249", flag: "🇸🇩", name: "السودان" },
  { code: "+218", flag: "🇱🇾", name: "ليبيا" },
  { code: "+213", flag: "🇩🇿", name: "الجزائر" },
  { code: "+216", flag: "🇹🇳", name: "تونس" },
  { code: "+212", flag: "🇲🇦", name: "المغرب" },
  { code: "+44", flag: "🇬🇧", name: "المملكة المتحدة" },
  { code: "+1", flag: "🇺🇸", name: "الولايات المتحدة" },
  { code: "+49", flag: "🇩🇪", name: "ألمانيا" },
  { code: "+33", flag: "🇫🇷", name: "فرنسا" },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+20");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fullPhone = `${countryCode}${phoneNumber.replace(/^0/, "")}`;

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });
      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          name: formData.name,
          phone: fullPhone,
          role: "user",
        });
        if (profileError) throw profileError;
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-sky-50 via-white to-blue-50 pt-24">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-extrabold text-slate-900 mb-2">إنشاء حساب جديد</h1>
            <p className="text-slate-500 text-sm">انضم إلى عيادة د. خالد شرف واحجز مواعيدك بسهولة</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" /> <p>{error}</p>
            </div>
          )}

          {success ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">تم إنشاء الحساب بنجاح!</h3>
              <p className="text-slate-500 mb-6 text-sm">يمكنك الآن حجز موعدك</p>
              <Link href="/book" className="block w-full py-3.5 bg-primary text-white font-bold rounded-xl text-center shadow-lg shadow-primary/20 hover:bg-primary-hover transition-all">
                احجز موعدك الآن
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="محمد أحمد"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Phone with country code */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الهاتف</label>
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 pl-2 pr-8 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm cursor-pointer"
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative flex-1">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      required type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="1008080358"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">كلمة المرور</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required type="password" minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-12 text-slate-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="6 أحرف على الأقل"
                  />
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2 shadow-lg shadow-primary/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "إنشاء الحساب"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-500 border-t border-slate-100 pt-6">
            لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" className="text-primary hover:text-primary-hover font-bold transition-colors">
              سجّل الدخول
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
