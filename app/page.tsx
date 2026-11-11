"use client";

import React, { useState } from "react";
import {
  Heart,
  Search,
  Phone,
  MapPin,
  Activity,
  Clock,
  CheckCircle2,
  ArrowRight,
  Globe,
  Menu,
  X,
  Hospital,
  AlertTriangle,
  Droplet,
} from "lucide-react";

// --- TRANSLATION DICTIONARY ---
const translations = {
  en: {
    nav: {
      findDonor: "Find Donor",
      liveRequests: "Live Requests",
      compatibility: "Compatibility",
      hospitals: "Blood Banks",
      about: "About Us",
      becomeDonor: "Become a Donor",
      emergencyCall: "Emergency: 10615",
    },
    hero: {
      badge: "Bangladesh's #1 Emergency Blood Network",
      titleMain: "Every Drop Counts.",
      titleSub: "Save a Life Today in Bangladesh.",
      description:
        "Connecting critical patients with verified voluntary blood donors across all 64 districts in real-time.",
      searchGroup: "Select Blood Group",
      searchLocation: "Division / District",
      btnSearch: "Search Donors",
      btnUrgent: "Request Blood Urgently",
      btnRegister: "Register as Donor",
      statDonors: "Registered Donors",
      statSaved: "Lives Saved",
      statDistricts: "Districts Covered",
      statActive: "Active Requests",
    },
    urgentFeed: {
      title: "Live Emergency Requests",
      subtitle:
        "Patients currently in desperate need of blood. Respond if you match!",
      filterAll: "All Requests",
      filterCritical: "Critical Only",
      filterDhaka: "Dhaka",
      filterRajshahi: "Rajshahi",
      filterChittagong: "Chittagong",
      neededBy: "Needed By:",
      units: "Units Needed:",
      contactBtn: "Respond / Contact",
      verified: "Hospital Verified",
    },
    compatibility: {
      title: "Blood Group Compatibility Checker",
      subtitle:
        "Select your blood group to see who you can donate to and receive from.",
      selectLabel: "Select Your Blood Type:",
      canDonateTo: "You Can Give Blood To:",
      canReceiveFrom: "You Can Receive Blood From:",
      universalDonor: "O- Negative is the Universal Donor.",
      universalRecipient: "AB+ Positive is the Universal Recipient.",
    },
    howItWorks: {
      title: "How RoktoLife Works",
      subtitle: "A seamless 3-step process to save lives fast",
      step1Title: "1. Register Profile",
      step1Desc:
        "Sign up with your blood group, contact number, and location. Your data is kept secure.",
      step2Title: "2. Get Instant Alerts",
      step2Desc:
        "Receive automated SMS and app notifications when an emergency match arises nearby.",
      step3Title: "3. Donate & Save Life",
      step3Desc:
        "Connect directly with the patient's attendant, donate safely, and track your total impact.",
    },
    donorsSection: {
      title: "Top Available Verified Donors",
      subtitle: "Ready to respond for emergency donation in your area",
      donations: "Donations",
      lastDonated: "Last Donated:",
      callNow: "Call Donor",
      available: "Ready to Donate",
    },
    network: {
      title: "Partnered Blood Banks & Organizations",
      subtitle:
        "Working hand-in-hand with Bangladesh's most trusted medical networks",
    },
    modal: {
      regTitle: "Become a Voluntary Blood Donor",
      regSubtitle: "Your registration can give someone another chance at life.",
      name: "Full Name (English or Bangla)",
      phone: "Mobile Number",
      bloodGroup: "Blood Group",
      district: "District",
      lastDonated: "Last Donation Date (Optional)",
      submit: "Complete Donor Registration",
      close: "Close",
    },
  },
  bn: {
    nav: {
      findDonor: "ডোনার খুঁজুন",
      liveRequests: "জরুরি রিকুয়েস্ট",
      compatibility: "রক্তের মানচিত্র",
      hospitals: "ব্লাড ব্যাংক",
      about: "আমাদের সম্পর্কে",
      becomeDonor: "ডোনার হন",
      emergencyCall: "জরুরি হটলাইন: ১০৬১৫",
    },
    hero: {
      badge: "বাংলাদেশের ১ নম্বর জরুরি রক্তদান নেটওয়ার্ক",
      titleMain: "আপনার এক ফোঁটা রক্ত,",
      titleSub: "বাঁচাতে পারে একটি জীবন।",
      description:
        "রিয়েল-টাইমে বাংলাদেশের ৬৪টি জেলায় মুমূর্ষু রোগীর সাথে সরাসরি রক্তদাতাদের সংযোগ তৈরি করছি।",
      searchGroup: "রক্তের গ্রুপ নির্বাচন করুন",
      searchLocation: "বিভাগ / জেলা",
      btnSearch: "ডোনার খুঁজুন",
      btnUrgent: "জরুরি রক্তের আবেদন",
      btnRegister: "ডোনার হিসেবে যুক্ত হন",
      statDonors: "নিবন্ধিত ডোনার",
      statSaved: "জীবন বাঁচানো হয়েছে",
      statDistricts: "জেলা কভারেজ",
      statActive: "জরুরি আবেদন",
    },
    urgentFeed: {
      title: "লাইভ জরুরি রক্তের প্রয়োজন",
      subtitle:
        "রোগীদের এখনই রক্তের প্রয়োজন। আপনার গ্রুপের সাথে মিললে দ্রুত সাড়া দিন!",
      filterAll: "সকল আবেদন",
      filterCritical: "অত্যন্ত জরুরি",
      filterDhaka: "ঢাকা",
      filterRajshahi: "রাজশাহী",
      filterChittagong: "চট্টগ্রাম",
      neededBy: "প্রয়োজনের সময়:",
      units: "পরিমাণ:",
      contactBtn: "যোগাযোগ করুন",
      verified: "হাসপাতাল ভেরিফাইড",
    },
    compatibility: {
      title: "রক্তের গ্রুপিং ও সামঞ্জস্যতা নির্দেশিকা",
      subtitle:
        "আপনার রক্তের গ্রুপ নির্বাচন করে দেখুন আপনি কাকে দান করতে পারবেন এবং কার থেকে নিতে পারবেন।",
      selectLabel: "আপনার রক্তের গ্রুপ নির্বাচন করুন:",
      canDonateTo: "আপনি যাদের রক্ত দিতে পারবেন:",
      canReceiveFrom: "আপনি যাদের থেকে রক্ত নিতে পারবেন:",
      universalDonor: "O- (ও নেগেটিভ) হলো সর্বজনীন দাতা।",
      universalRecipient: "AB+ (এবি পজিটিভ) হলো সর্বজনীন গ্রহীতা।",
    },
    howItWorks: {
      title: "রক্তদান প্রক্রিয়া",
      subtitle: "সহজ ৩টি ধাপে রক্ত দিন এবং জীবন বাঁচান",
      step1Title: "১. প্রোফাইল তৈরি করুন",
      step1Desc:
        "আপনার রক্তের গ্রুপ, ফোন নম্বর ও জেলা দিয়ে মাত্র ২ মিনিটে নিবন্ধন সম্পন্ন করুন।",
      step2Title: "২. নোটিফিকেশন পান",
      step2Desc:
        "আপনার আশেপাশে জরুরি রক্তের প্রয়োজন হলে সঙ্গে সঙ্গে এসএমএস এবং নোটিফিকেশন পাবেন।",
      step3Title: "৩. রক্ত দিন ও জীবন বাঁচান",
      step3Desc:
        "রোগীর স্বজনের সাথে কথা বলে নিরাপদে রক্ত দান করুন এবং প্রভাব ট্র্যাক করুন।",
    },
    donorsSection: {
      title: "প্রস্তুতকৃত রক্তদাতাগণ",
      subtitle: "আপনার এলাকায় রক্তদানে প্রস্তুত আমাদের ভেরিফাইড রক্তদাতাগণ",
      donations: "বার রক্তদান করেছেন",
      lastDonated: "সর্বশেষ রক্তদান:",
      callNow: "কল করুন",
      available: "রক্তদানে প্রস্তুত",
    },
    network: {
      title: "সহযোগী ব্লাড ব্যাংক ও সংস্থাসমূহ",
      subtitle:
        "বাংলাদেশের শীর্ষস্থানীয় স্বাস্থ সেবা ও স্বেচ্ছাসেবী সংস্থার সাথে আমরা যুক্ত",
    },
    modal: {
      regTitle: "স্বেচ্ছাসেবক রক্তদাতা হিসেবে যোগ দিন",
      regSubtitle: "আপনার নিববন্ধন বাঁচিয়ে দিতে পারে অন্য একজনের অমূল্য জীবন।",
      name: "আপনার পূর্ণ নাম",
      phone: "মোবাইল নম্বর",
      bloodGroup: "রক্তের গ্রুপ",
      district: "জেলা",
      lastDonated: "সর্বশেষ রক্তদানের তারিখ (ঐচ্ছিক)",
      submit: "নিবন্ধন সম্পন্ন করুন",
      close: "বন্ধ করুন",
    },
  },
};

// --- COMPATIBILITY DATA ---
type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

const compatibilityMap: Record<
  BloodGroup,
  { give: string[]; receive: string[] }
> = {
  "A+": { give: ["A+", "AB+"], receive: ["A+", "A-", "O+", "O-"] },
  "A-": { give: ["A+", "A-", "AB+", "AB-"], receive: ["A-", "O-"] },
  "B+": { give: ["B+", "AB+"], receive: ["B+", "B-", "O+", "O-"] },
  "B-": { give: ["B+", "B-", "AB+", "AB-"], receive: ["B-", "O-"] },
  "O+": { give: ["O+", "A+", "B+", "AB+"], receive: ["O+", "O-"] },
  "O-": { give: ["All Groups (Universal Donor)"], receive: ["O-"] },
  "AB+": { give: ["AB+"], receive: ["All Groups (Universal Recipient)"] },
  "AB-": { give: ["AB+", "AB-"], receive: ["AB-", "A-", "B-", "O-"] },
};

// --- MOCK EMERGENCY REQUESTS ---
type Request = {
  id: number;
  patientName: string;
  hospital: string;
  location: string;
  bloodGroup: string;
  urgency: string;
  units: string;
  timeRemaining: string;
  contact: string;
  reason: string;
};

const initialRequests: Request[] = [
  {
    id: 1,
    patientName: "Rahim Chowdhury",
    hospital: "Dhaka Medical College Hospital (DMCH)",
    location: "Dhaka",
    bloodGroup: "O-",
    urgency: "CRITICAL",
    units: "2 Bags",
    timeRemaining: "Today by 4:00 PM",
    contact: "01711-XXXXXX",
    reason: "Accident Trauma Unit",
  },
  {
    id: 2,
    patientName: "Nusrat Jahan",
    hospital: "Rajshahi Medical College Hospital",
    location: "Rajshahi",
    bloodGroup: "B-",
    urgency: "URGENT",
    units: "1 Bag",
    timeRemaining: "Within 5 Hours",
    contact: "01819-XXXXXX",
    reason: "Emergency Delivery",
  },
  {
    id: 3,
    patientName: "Tanvir Ahmed",
    hospital: "Chittagong Medical College (CMCH)",
    location: "Chittagong",
    bloodGroup: "AB-",
    urgency: "CRITICAL",
    units: "3 Bags",
    timeRemaining: "Immediate (ICU)",
    contact: "01552-XXXXXX",
    reason: "Open Heart Surgery",
  },
  {
    id: 4,
    patientName: "Sumaiya Begum",
    hospital: "Square Hospital, Panthapath",
    location: "Dhaka",
    bloodGroup: "A+",
    urgency: "MODERATE",
    units: "1 Bag",
    timeRemaining: "Tomorrow 10:00 AM",
    contact: "01912-XXXXXX",
    reason: "Dengue Fever Platelets",
  },
  {
    id: 5,
    patientName: "Arifur Rahman",
    hospital: "Sylhet MAG Osmani Medical College",
    location: "Sylhet",
    bloodGroup: "O+",
    urgency: "URGENT",
    units: "2 Bags",
    timeRemaining: "Tonight",
    contact: "01673-XXXXXX",
    reason: "Cancer Chemotherapy Support",
  },
];

// --- MOCK SAMPLE DONORS ---
const sampleDonors = [
  {
    id: 101,
    name: "Dr. Shakib Al Mamun",
    group: "O-",
    district: "Dhaka",
    lastDonated: "4 Months ago",
    donations: 14,
    phone: "01712-345678",
  },
  {
    id: 102,
    name: "Mahmudul Hasan",
    group: "A+",
    district: "Rajshahi",
    lastDonated: "6 Months ago",
    donations: 8,
    phone: "01811-987654",
  },
  {
    id: 103,
    name: "Subir Ali",
    group: "B-",
    district: "Chittagong",
    lastDonated: "5 Months ago",
    donations: 5,
    phone: "01922-112233",
  },
  {
    id: 104,
    name: "Kazi Farhan",
    group: "AB+",
    district: "Dhaka",
    lastDonated: "4 Months ago",
    donations: 21,
    phone: "01533-445566",
  },
  {
    id: 105,
    name: "Tariqul Islam",
    group: "O+",
    district: "Sylhet",
    lastDonated: "7 Months ago",
    donations: 11,
    phone: "01644-778899",
  },
  {
    id: 106,
    name: "Abir Khan",
    group: "A-",
    district: "Khulna",
    lastDonated: "4 Months ago",
    donations: 3,
    phone: "01755-667788",
  },
];

export default function App() {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const t = translations[lang];

  // Filters & State
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [requestFilter, setRequestFilter] = useState("All");
  const [selectedCompatGroup, setSelectedCompatGroup] =
    useState<BloodGroup>("O-");

  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeContactModal, setActiveContactModal] = useState<Request | null>(
    null,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: "",
    phone: "",
    bloodGroup: "A+",
    district: "Dhaka",
    lastDate: "",
  });
  const [regSuccess, setRegSuccess] = useState(false);

  // Search Submit Handler
  const [filteredDonors, setFilteredDonors] = useState(sampleDonors);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    let results = sampleDonors;
    if (selectedGroup) {
      results = results.filter((d) => d.group === selectedGroup);
    }
    if (selectedLocation) {
      results = results.filter(
        (d) => d.district.toLowerCase() === selectedLocation.toLowerCase(),
      );
    }
    setFilteredDonors(results);

    // Scroll smoothly to donor section
    const el = document.getElementById("donors-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegSuccess(true);
    setTimeout(() => {
      setRegSuccess(false);
      setIsRegisterOpen(false);
      setRegForm({
        name: "",
        phone: "",
        bloodGroup: "A+",
        district: "Dhaka",
        lastDate: "",
      });
    }, 2000);
  };

  // Filter requests
  const displayedRequests = initialRequests.filter((req) => {
    if (requestFilter === "All") return true;
    if (requestFilter === "Critical") return req.urgency === "CRITICAL";
    return req.location === requestFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform duration-300">
              <Droplet className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Rokto<span className="text-rose-600">Life</span>
                </span>
                <span className="text-xs font-semibold text-rose-500 px-1.5 py-0.5 bg-rose-50 rounded-full border border-rose-200">
                  BD
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-1">
                রক্তদানে জীবন বাঁচুক
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-slate-700">
            <a
              href="#urgent-requests"
              className="hover:text-rose-600 transition-colors"
            >
              {t.nav.liveRequests}
            </a>
            <a
              href="#donors-section"
              className="hover:text-rose-600 transition-colors"
            >
              {t.nav.findDonor}
            </a>
            <a
              href="#compatibility"
              className="hover:text-rose-600 transition-colors"
            >
              {t.nav.compatibility}
            </a>
            <a
              href="#network"
              className="hover:text-rose-600 transition-colors"
            >
              {t.nav.hospitals}
            </a>
          </nav>

          {/* Right Header Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-100/70 text-slate-700 text-xs font-bold transition-all"
              title="Switch Language"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span>{lang === "en" ? "বাংলা" : "English"}</span>
            </button>

            {/* Helpline Badge */}
            <a
              href="tel:10615"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>{t.nav.emergencyCall}</span>
            </a>

            {/* Register CTA */}
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-semibold text-sm shadow-md shadow-rose-600/25 hover:shadow-lg hover:shadow-rose-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              {t.nav.becomeDonor}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLang(lang === "en" ? "bn" : "en")}
              className="p-2 rounded-lg bg-slate-100 text-xs font-bold text-slate-700"
            >
              {lang === "en" ? "বাংলা" : "EN"}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <a
              href="#urgent-requests"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium border-b border-slate-100"
            >
              {t.nav.liveRequests}
            </a>
            <a
              href="#donors-section"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium border-b border-slate-100"
            >
              {t.nav.findDonor}
            </a>
            <a
              href="#compatibility"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium border-b border-slate-100"
            >
              {t.nav.compatibility}
            </a>
            <a
              href="#network"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium border-b border-slate-100"
            >
              {t.nav.hospitals}
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsRegisterOpen(true);
              }}
              className="w-full mt-2 py-3 rounded-xl bg-rose-600 text-white font-semibold shadow-md shadow-rose-600/20"
            >
              {t.nav.becomeDonor}
            </button>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden pt-10 pb-20 bg-gradient-to-b from-white via-rose-50/30 to-slate-50">
        {/* Abstract Background Blur Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-rose-300/30 via-red-200/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-rose-100/80 border border-rose-200/60 text-rose-700 text-xs font-bold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-4">
              {t.hero.titleMain} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 bg-clip-text text-transparent">
                {t.hero.titleSub}
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
          </div>

          {/* Quick Search / Urgency Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-4 sm:p-5 shadow-xl shadow-slate-200/60 border border-slate-200/80 mb-12">
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              {/* Select Blood Group */}
              <div className="sm:col-span-5 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                  {t.hero.searchGroup}
                </label>
                <div className="relative">
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-800 font-bold focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all appearance-none outline-none cursor-pointer text-sm"
                  >
                    <option value="">All Blood Groups (সকল গ্রুপ)</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                  </select>
                  <Droplet className="w-4 h-4 text-rose-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Select Division / District */}
              <div className="sm:col-span-4 relative">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
                  {t.hero.searchLocation}
                </label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-slate-800 font-semibold focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all appearance-none outline-none cursor-pointer text-sm"
                  >
                    <option value="">All Bangladesh (সমগ্র বাংলাদেশ)</option>
                    <option value="Dhaka">Dhaka (ঢাকা)</option>
                    <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
                    <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                    <option value="Sylhet">Sylhet (সিলেট)</option>
                    <option value="Khulna">Khulna (খুলনা)</option>
                    <option value="Barisal">Barisal (বরিশাল)</option>
                    <option value="Rangpur">Rangpur (রংপুর)</option>
                    <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                  </select>
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="sm:col-span-3 sm:self-end">
                <button
                  type="submit"
                  className="w-full py-3.5 px-5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-100"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.hero.btnSearch}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#urgent-requests"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl flex items-center justify-center space-x-3 transition-all hover:-translate-y-0.5"
            >
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>{t.hero.btnUrgent}</span>
            </a>

            <button
              onClick={() => setIsRegisterOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-base shadow-sm flex items-center justify-center space-x-2 transition-all"
            >
              <Heart className="w-5 h-5 text-rose-600 fill-current" />
              <span>{t.hero.btnRegister}</span>
            </button>
          </div>

          {/* Stats Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-rose-600 mb-1">
                54,200+
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statDonors}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-slate-900 mb-1">
                128,500+
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statSaved}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-rose-600 mb-1">
                64 / 64
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statDistricts}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-emerald-600 mb-1">
                14
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statActive}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE EMERGENCY REQUESTS FEED ================= */}
      <section
        id="urgent-requests"
        className="py-16 bg-white border-y border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs uppercase tracking-widest mb-2">
                <Activity className="w-4 h-4 animate-spin" />
                <span>Real-Time Request Feed</span>
              </div>
              <h2 className="text-3xl font-black text-slate-900">
                {t.urgentFeed.title}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {t.urgentFeed.subtitle}
              </p>
            </div>

            {/* Request Filter Tabs */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              {["All", "Critical", "Dhaka", "Rajshahi", "Chittagong"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setRequestFilter(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      requestFilter === tab
                        ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab === "All"
                      ? t.urgentFeed.filterAll
                      : tab === "Critical"
                        ? t.urgentFeed.filterCritical
                        : tab}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedRequests.map((req) => (
              <div
                key={req.id}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Urgency Header */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${
                          req.urgency === "CRITICAL"
                            ? "bg-rose-600 text-white animate-pulse"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {req.urgency}
                      </span>
                      <span className="inline-flex items-center text-emerald-700 text-xs font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {t.urgentFeed.verified}
                      </span>
                    </div>

                    {/* Blood Group Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white font-black text-xl flex items-center justify-center shadow-lg shadow-rose-600/30">
                      {req.bloodGroup}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    {req.patientName}
                  </h3>

                  <div className="flex items-center text-xs font-medium text-slate-500 mt-1 mb-4">
                    <Hospital className="w-4 h-4 mr-1 text-slate-400 shrink-0" />
                    <span className="truncate">{req.hospital}</span>
                  </div>

                  <div className="space-y-2 text-xs font-semibold text-slate-600 bg-white p-3.5 rounded-2xl border border-slate-200/80 mb-5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        {t.urgentFeed.units}
                      </span>
                      <span className="text-slate-900 font-bold">
                        {req.units}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">
                        {t.urgentFeed.neededBy}
                      </span>
                      <span className="text-rose-600 font-bold flex items-center">
                        <Clock className="w-3 h-3 mr-1 inline" />
                        {req.timeRemaining}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-100">
                      <span className="text-slate-400">Reason:</span>
                      <span className="text-slate-800">{req.reason}</span>
                    </div>
                  </div>
                </div>

                {/* Respond CTA Button */}
                <button
                  onClick={() => setActiveContactModal(req)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t.urgentFeed.contactBtn}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BLOOD COMPATIBILITY MATRIX WIDGET ================= */}
      <section id="compatibility" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-rose-500 text-xs font-bold uppercase tracking-widest mb-2 block">
              Interactive Tool
            </span>
            <h2 className="text-3xl font-black">{t.compatibility.title}</h2>
            <p className="text-slate-400 text-sm mt-2">
              {t.compatibility.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-800/80 backdrop-blur rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
            {/* Blood Selector Buttons */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">
                {t.compatibility.selectLabel}
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {(Object.keys(compatibilityMap) as BloodGroup[]).map((grp) => (
                  <button
                    key={grp}
                    onClick={() => setSelectedCompatGroup(grp)}
                    className={`py-3 rounded-xl text-base font-black transition-all ${
                      selectedCompatGroup === grp
                        ? "bg-rose-600 text-white ring-4 ring-rose-500/30 scale-105"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    {grp}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Can Donate To */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80">
                <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <ArrowRight className="w-4 h-4" />
                  <span>{t.compatibility.canDonateTo}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {compatibilityMap[selectedCompatGroup].give.map(
                    (target, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-sm"
                      >
                        {target}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Can Receive From */}
              <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-700/80">
                <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
                  <Heart className="w-4 h-4" />
                  <span>{t.compatibility.canReceiveFrom}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {compatibilityMap[selectedCompatGroup].receive.map(
                    (target, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-sm"
                      >
                        {target}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Footnote */}
            <div className="mt-6 pt-6 border-t border-slate-700/60 text-center text-xs text-slate-400 space-y-1">
              <p>
                💡{" "}
                <span className="text-slate-300 font-semibold">
                  {t.compatibility.universalDonor}
                </span>
              </p>
              <p>
                🌟{" "}
                <span className="text-slate-300 font-semibold">
                  {t.compatibility.universalRecipient}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH RESULTS / SAMPLE DONORS SECTION ================= */}
      <section id="donors-section" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-rose-600 text-xs font-bold uppercase tracking-widest mb-1 block">
                Verified Network
              </span>
              <h2 className="text-3xl font-black text-slate-900">
                {t.donorsSection.title}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                {t.donorsSection.subtitle}
              </p>
            </div>
            {hasSearched && (
              <button
                onClick={() => {
                  setSelectedGroup("");
                  setSelectedLocation("");
                  setFilteredDonors(sampleDonors);
                  setHasSearched(false);
                }}
                className="mt-3 md:mt-0 text-xs font-bold text-rose-600 underline hover:text-rose-700"
              >
                Reset Search Filters
              </button>
            )}
          </div>

          {/* Donor Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.map((donor) => (
              <div
                key={donor.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all flex items-start space-x-4"
              >
                {/* Blood Group Circle */}
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-rose-500 font-black text-xl flex items-center justify-center shrink-0 border border-slate-800 shadow-inner">
                  {donor.group}
                </div>

                {/* Donor Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 truncate">
                      {donor.name}
                    </h3>
                    <span
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      title={t.donorsSection.available}
                    />
                  </div>

                  <div className="flex items-center text-xs font-medium text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span>{donor.district}, BD</span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-400 block">
                        {t.donorsSection.lastDonated}
                      </span>
                      <span className="font-semibold text-slate-700">
                        {donor.lastDonated}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-rose-600 text-sm">
                        {donor.donations}
                      </span>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        {t.donorsSection.donations}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${donor.phone}`}
                    className="mt-4 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 text-xs font-bold transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{t.donorsSection.callNow}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-semibold">
                No donors match your selected criteria currently.
              </p>
              <button
                onClick={() => {
                  setSelectedGroup("");
                  setSelectedLocation("");
                  setFilteredDonors(sampleDonors);
                }}
                className="mt-3 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                View All Donors
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-rose-600 text-xs font-bold uppercase tracking-widest mb-2 block">
              Simple & Fast
            </span>
            <h2 className="text-3xl font-black text-slate-900">
              {t.howItWorks.title}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-600/30">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.howItWorks.step1Title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.howItWorks.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.howItWorks.step2Title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.howItWorks.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 text-center relative">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-600/30">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t.howItWorks.step3Title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t.howItWorks.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BANGLADESH BLOOD NETWORK SHOWCASE ================= */}
      <section id="network" className="py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">
            {t.network.title}
          </h2>
          <p className="text-slate-500 text-sm mb-10">{t.network.subtitle}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                name: "Red Crescent BD",
                sub: "Bangladesh Red Crescent Society",
              },
              { name: "Quantum Foundation", sub: "Voluntary Blood Lab" },
              { name: "Sandhani", sub: "Medical College Network" },
              { name: "Badhan", sub: "University Blood Network" },
              {
                name: "DMCH Blood Bank",
                sub: "Dhaka Medical College Hospital",
              },
            ].map((org, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center"
              >
                <Hospital className="w-8 h-8 text-rose-600 mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">{org.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium mt-1">
                  {org.sub}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white">
                  <Droplet className="w-5 h-5 fill-current" />
                </div>
                <span className="text-2xl font-black text-white">
                  Rokto<span className="text-rose-500">Life</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Empowering emergency blood donation across Bangladesh through
                real-time technology and voluntary donor networks.
              </p>
              <div className="text-xs text-rose-400 font-semibold bg-rose-950/60 border border-rose-900/60 p-3 rounded-xl inline-block">
                National Emergency:{" "}
                <span className="text-white font-bold">Call 999</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a
                    href="#urgent-requests"
                    className="hover:text-rose-400 transition-colors"
                  >
                    Emergency Blood Feed
                  </a>
                </li>
                <li>
                  <a
                    href="#donors-section"
                    className="hover:text-rose-400 transition-colors"
                  >
                    Find Donors by District
                  </a>
                </li>
                <li>
                  <a
                    href="#compatibility"
                    className="hover:text-rose-400 transition-colors"
                  >
                    Blood Compatibility Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegisterOpen(true);
                    }}
                    className="hover:text-rose-400 transition-colors"
                  >
                    Register as Volunteer
                  </a>
                </li>
              </ul>
            </div>

            {/* Top Coverage Districts */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                Major Coverage
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <span className="text-slate-300">Dhaka Division</span> (DMCH,
                  Square, Labaid)
                </li>
                <li>
                  <span className="text-slate-300">Rajshahi Division</span>{" "}
                  (RMCH, Christian Hospital)
                </li>
                <li>
                  <span className="text-slate-300">Chittagong Division</span>{" "}
                  (CMCH, Imperial)
                </li>
                <li>
                  <span className="text-slate-300">Sylhet Division</span>{" "}
                  (Osmani Medical)
                </li>
              </ul>
            </div>

            {/* Emergency Hotline Info */}
            <div>
              <h4 className="text-white font-bold text-sm mb-4">
                24/7 Helpline BD
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                Facing an urgent situation? Reach out directly to our central
                coordination room.
              </p>
              <div className="text-lg font-black text-emerald-400">
                09612-ROKTOBD
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Free support for critical hospital patients
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>© 2026 RoktoLife Bangladesh. Voluntary Emergency Initiative.</p>
            <p className="mt-2 sm:mt-0">Made with ❤️ for Bangladesh</p>
          </div>
        </div>
      </footer>

      {/* ================= REGISTER DONOR MODAL ================= */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200">
            <button
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {regSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  Registration Successful!
                </h3>
                <p className="text-slate-600 text-sm">
                  Thank you for registering on RoktoLife. You are now part of
                  Bangladesh&apos;s life-saving donor network.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-black text-slate-900">
                    {t.modal.regTitle}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    {t.modal.regSubtitle}
                  </p>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.modal.name}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={regForm.name}
                      onChange={(e) =>
                        setRegForm({ ...regForm, name: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {t.modal.phone}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={regForm.phone}
                        onChange={(e) =>
                          setRegForm({ ...regForm, phone: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        {t.modal.bloodGroup}
                      </label>
                      <select
                        value={regForm.bloodGroup}
                        onChange={(e) =>
                          setRegForm({ ...regForm, bloodGroup: e.target.value })
                        }
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none cursor-pointer"
                      >
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                          (g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.modal.district}
                    </label>
                    <select
                      value={regForm.district}
                      onChange={(e) =>
                        setRegForm({ ...regForm, district: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none cursor-pointer"
                    >
                      {[
                        "Dhaka",
                        "Chittagong",
                        "Rajshahi",
                        "Sylhet",
                        "Khulna",
                        "Barisal",
                        "Rangpur",
                        "Mymensingh",
                      ].map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      {t.modal.lastDonated}
                    </label>
                    <input
                      type="date"
                      value={regForm.lastDate}
                      onChange={(e) =>
                        setRegForm({ ...regForm, lastDate: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all mt-4"
                  >
                    {t.modal.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= CONTACT ATTENDANT MODAL SIMULATOR ================= */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 text-center">
            <button
              onClick={() => setActiveContactModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
              {activeContactModal.bloodGroup}
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-1">
              {activeContactModal.patientName}
            </h3>
            <p className="text-xs font-medium text-slate-500 mb-4">
              {activeContactModal.hospital}
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs font-semibold text-slate-700 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Urgency Level:</span>
                <span className="text-rose-600 font-bold">
                  {activeContactModal.urgency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Required Units:</span>
                <span>{activeContactModal.units}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hospital Location:</span>
                <span>{activeContactModal.location}, BD</span>
              </div>
            </div>

            <a
              href={`tel:${activeContactModal.contact}`}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Attendant ({activeContactModal.contact})</span>
            </a>

            <p className="text-[10px] text-slate-400 mt-3">
              Please ensure you meet donor health eligibility criteria before
              traveling to the hospital.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
