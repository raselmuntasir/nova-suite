# 🚀 Nova Suite — Project Roadmap & Final Goal

> **সংক্ষেপে লক্ষ্য:** Nova Suite হবে বাংলাদেশি মার্চেন্টদের জন্য একটি **Multi-Tenant SaaS প্ল্যাটফর্ম** যেখানে প্রতিটি মার্চেন্ট তাদের নিজস্ব ড্যাশবোর্ড থেকে অর্ডার ম্যানেজ করবে, কুরিয়ার বুক করবে, এবং ব্যবসার সব কার্যক্রম পরিচালনা করবে — আর Super Admin পুরো প্ল্যাটফর্ম নিয়ন্ত্রণ করবে।

---

## 🏁 Final Vision (চূড়ান্ত লক্ষ্য)

```
Nova Suite
├── 🌐 Landing Page         ← মার্চেন্টরা সাইনআপ করে
├── 🔐 Auth (Login/Signup)  ← Supabase Auth
├── 🏢 Tenant Dashboard     ← প্রতিটি মার্চেন্টের নিজস্ব প্যানেল
│   ├── 📦 Orders (OMS)     ← অর্ডার তৈরি, ট্র্যাক, স্ট্যাটাস আপডেট
│   ├── 🚚 Couriers         ← Pathao / Steadfast / RedX ইন্টিগ্রেশন
│   ├── 👥 Customers        ← কাস্টমার ডেটাবেজ
│   ├── 📊 Analytics        ← বিক্রয় রিপোর্ট ও গ্রাফ
│   └── ⚙️ Settings         ← প্রোফাইল, সাবস্ক্রিপশন, কুরিয়ার API keys
└── 👑 Super Admin Panel    ← প্ল্যাটফর্ম ব্যবস্থাপনা
    ├── 👥 Tenant Management ← Suspend / Reactivate / Delete
    ├── 💳 Subscriptions     ← প্ল্যান ও পেমেন্ট ট্র্যাকিং
    ├── 📊 Platform Analytics ← মোট রেভিনিউ, মার্চেন্ট সংখ্যা
    └── 💰 Payments          ← SSLCommerz / Shurjopay ইন্টিগ্রেশন
```

---

## 📋 Phase-by-Phase Implementation Plan

---

### ✅ PHASE 1 — Foundation (সম্পন্ন)
> **লক্ষ্য:** প্রজেক্টের ভিত্তি তৈরি ও Supabase সংযোগ

| কাজ | স্ট্যাটাস |
|-----|-----------|
| Vite + React + TypeScript প্রজেক্ট সেটআপ | ✅ Done |
| Tailwind CSS v3 কনফিগার | ✅ Done |
| Supabase সংযোগ (`supabase.ts`) | ✅ Done |
| Database Schema তৈরি (`supabase_schema.sql`) | ✅ Done |
| TypeScript Types জেনারেট (`database.types.ts`) | ✅ Done |
| RLS Policies সেটআপ | ✅ Done |
| UI Components তৈরি (Button, Card, Input) | ✅ Done |
| Landing Page | ✅ Done |
| Routing সেটআপ (`App.tsx`) | ✅ Done |
| Demo Data Seed (tenant + orders + couriers) | ✅ Done |
| API Helper Layer (`lib/api.ts`) | ✅ Done |

---

### ✅ PHASE 2 — Core Dashboard (সম্পন্ন)
> **লক্ষ্য:** Tenant ও Admin ড্যাশবোর্ড কার্যকর করা

| কাজ | স্ট্যাটাস |
|-----|-----------|
| Tenant Layout (Sidebar + Header) | ✅ Done |
| Orders Page — Supabase থেকে live data | ✅ Done |
| Orders Page — Loading / Error state | ✅ Done |
| Admin Dashboard Page — Tenant list | ✅ Done |
| Admin — Suspend / Reactivate tenant | ✅ Done |
| Tenant slug → UUID resolve logic | ✅ Done |
| Couriers Page (UI শেল) | ✅ Done |

---

### 🔄 PHASE 3 — Authentication & Multi-Tenancy (পরবর্তী ধাপ)
> **লক্ষ্য:** প্রতিটি মার্চেন্ট নিজের অ্যাকাউন্ট দিয়ে লগইন করবে

#### 3.1 — Auth Pages
- [ ] **Signup Page** — নাম, ইমেইল, পাসওয়ার্ড, শপের নাম (path_name)
- [ ] **Login Page** — ইমেইল + পাসওয়ার্ড
- [ ] **Supabase Auth** ইন্টিগ্রেশন (`signUp`, `signIn`, `signOut`)
- [ ] **Auth Context** (`useAuth` hook) — পুরো অ্যাপে ইউজার স্টেট শেয়ার করা
- [ ] **Protected Routes** — লগইন না করলে `/login`-এ রিডাইরেক্ট
- [ ] Signup-এ auto `tenants` table-এ row তৈরি

#### 3.2 — RLS শক্ত করা
- [ ] Dev-এর খোলা RLS policy সরানো
- [ ] `auth.uid() = user_id` দিয়ে নিরাপদ RLS চালু করা
- [ ] Super Admin email দিয়ে admin route সুরক্ষিত করা

---

### 🔄 PHASE 4 — Feature Completion (ফিচার সম্পূর্ণ করা)
> **লক্ষ্য:** সব UI অপশন কার্যকর করা

#### 4.1 — Orders (OMS) সম্পূর্ণ করা
- [ ] **New Order** Modal/Form — কাস্টমার তথ্য, পণ্য, ঠিকানা, কুরিয়ার
- [ ] **Order Status Update** — Pending → Confirmed → Shipped → Delivered
- [ ] **CSV Import** — Excel/CSV থেকে bulk order import
- [ ] **Search & Filter** — অর্ডার নাম্বার, স্ট্যাটাস, তারিখ দিয়ে ফিল্টার
- [ ] **Order Detail View** — প্রতিটি অর্ডারের বিস্তারিত মডাল
- [ ] **Pagination** — বড় অর্ডার লিস্টের জন্য

#### 4.2 — Courier Integration (কুরিয়ার)
- [ ] **CouriersPage** সম্পূর্ণ করা — API key সেভ/এডিট ফর্ম
- [ ] **Pathao API** ইন্টিগ্রেশন — parcel book, tracking
- [ ] **Steadfast API** ইন্টিগ্রেশন — consignment create, tracking
- [ ] **RedX API** ইন্টিগ্রেশন — parcel create, tracking
- [ ] **Auto-book** — অর্ডার confirm হলে কুরিয়ারে auto consignment তৈরি
- [ ] **Tracking ID** দেখানো orders page-এ

#### 4.3 — Customers Page (নতুন)
- [ ] Customers তালিকা (DB থেকে)
- [ ] কাস্টমার যোগ করা / এডিট করা
- [ ] কাস্টমারের অর্ডার হিস্ট্রি

#### 4.4 — Settings Page (নতুন)
- [ ] মার্চেন্ট প্রোফাইল এডিট
- [ ] কুরিয়ার API Key সেটিংস
- [ ] সাবস্ক্রিপশন প্ল্যান দেখানো

#### 4.5 — Analytics Page (নতুন)
- [ ] মোট অর্ডার, রেভিনিউ, ডেলিভারি রেট
- [ ] Chart (Line / Bar) — Recharts বা Chart.js দিয়ে
- [ ] তারিখ অনুযায়ী ফিল্টার

---

### 🔄 PHASE 5 — Admin Panel সম্পূর্ণ করা
> **লক্ষ্য:** Super Admin-কে সম্পূর্ণ ক্ষমতা দেওয়া

- [ ] **Admin Login** — আলাদা সুরক্ষিত লগইন
- [ ] **Tenant Detail View** — একটি টেন্যান্টের সব তথ্য
- [ ] **Subscription Management** — Pro/Free প্ল্যান assign করা
- [ ] **Platform Revenue Dashboard** — মোট আয়ের চার্ট
- [ ] **Payment Gateway Integration** — SSLCommerz বা Shurjopay
  - মার্চেন্ট সাবস্ক্রিপশন পেমেন্ট করবে
  - Admin পেমেন্ট কনফার্ম করবে

---

### 🔄 PHASE 6 — Production & Deployment
> **লক্ষ্য:** সবার ব্যবহারের জন্য পাবলিশ করা

- [ ] **Environment Variables** যাচাই (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- [ ] **Vercel Deploy** — `main` branch থেকে auto deploy
- [ ] **Custom Domain** (যদি থাকে)
- [ ] **RLS Audit** — সব টেবিলের নিরাপত্তা যাচাই
- [ ] **Error Monitoring** — Sentry বা LogRocket
- [ ] **README.md** আপডেট

---

## 🗺️ কাজের অগ্রাধিকার (Priority Order)

```
এখন করব (Next Up):
1. 🔐 Auth — Login + Signup Page
2. 🛡️ Protected Routes + useAuth hook
3. 📦 New Order Form (Modal)
4. 🔍 Order Search & Filter
5. 🚚 Courier API keys সেভ করার ফর্ম

পরে করব:
6. Pathao / Steadfast / RedX API call
7. Customers Page
8. Settings Page
9. Analytics Page
10. Admin Payment Integration
11. Production Deploy
```

---

## 🧩 Tech Stack Summary

| বিষয় | প্রযুক্তি |
|------|----------|
| Frontend Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Routing | React Router v6 |
| Backend/DB | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Animation | Framer Motion |
| Deployment | Vercel (Frontend) + Supabase (Backend) |
| Payment (planned) | SSLCommerz / Shurjopay |
| Courier (planned) | Pathao, Steadfast, RedX |

---

## 📁 File Structure (বর্তমান)

```
src/
├── lib/
│   ├── supabase.ts          ← Supabase client
│   ├── database.types.ts    ← Auto-generated DB types
│   └── api.ts               ← API helper functions
├── components/
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── Input.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── admin/
│   │   └── AdminDashboardPage.tsx
│   └── tenant/
│       ├── OrdersPage.tsx
│       └── CouriersPage.tsx
├── App.tsx                  ← Routes
└── main.tsx
```

---

## 💡 এই ফাইল ব্যবহার করার নিয়ম

1. কাজ শুরু করার আগে এই ফাইল পড়
2. যে Phase-এ আছি সেটার incomplete কাজ দিয়ে শুরু কর
3. কোনো কাজ শেষ হলে `[ ]` → `[x]` করে মার্ক কর
4. নতুন আইডিয়া এলে সঠিক Phase-এ যোগ কর

---

> **Last Updated:** 2026-06-10  
> **Current Phase:** Phase 3 — Authentication শুরু হবে পরবর্তী ধাপে
