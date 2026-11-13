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
import {
  ApiProblem,
  registerDonor,
  searchDonors,
  submitRequest,
  type DonorForm,
  type RequestForm,
  type Summary,
  type UiBank,
  type UiDonor,
  type UiRequest,
} from "@/lib/site";

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

export interface LandingProps {
  summary: Summary;
  requests: UiRequest[];
  donors: UiDonor[];
  banks: UiBank[];
}

// Texts of the request-blood form and the live states, in both languages.
const EXTRA = {
  en: {
    noRequests:
      "No open requests right now. If you need blood, use the button above.",
    searchFailed: "Could not load donors. Please try again.",
    searching: "Searching…",
    regDone:
      "Thank you for registering on RoktoLife. Our team will verify your details, then you will appear in the donor list.",
    reqTitle: "Request Blood Urgently",
    reqSubtitle:
      "Tell us who needs blood. Once our team verifies the request it is shown on this page so donors can respond.",
    patient: "Patient Name",
    hospital: "Hospital",
    district: "District",
    bloodGroup: "Blood Group",
    bags: "Bags Needed (1 to 20)",
    urgency: "Urgency",
    neededBy: "Needed By",
    attendant: "Attendant Name",
    attendantPhone: "Attendant Mobile Number",
    reason: "Reason (Optional)",
    submit: "Send Request",
    sending: "Sending…",
    reqDone: "Your request was received",
    reqDoneText:
      "Our team will verify it shortly. After that it appears on this page so donors can contact the attendant.",
    levels: { CRITICAL: "Critical", URGENT: "Urgent", MODERATE: "Moderate" },
    errDuplicate: "This phone number is already registered as a donor.",
    errInvalid: "Please check the details and try again.",
    errBusy: "Too many attempts. Please wait a few minutes and try again.",
    errOther: "Something went wrong. Please try again.",
  },
  bn: {
    noRequests:
      "এই মুহূর্তে কোনো খোলা আবেদন নেই। রক্তের প্রয়োজন হলে উপরের বোতামটি ব্যবহার করুন।",
    searchFailed: "ডোনারদের তালিকা আনা যায়নি। আবার চেষ্টা করুন।",
    searching: "খোঁজা হচ্ছে…",
    regDone:
      "রক্তলাইফে নিবন্ধনের জন্য ধন্যবাদ। আমাদের দল তথ্য যাচাই করার পর আপনি ডোনার তালিকায় আসবেন।",
    reqTitle: "জরুরি রক্তের আবেদন",
    reqSubtitle:
      "কার রক্ত দরকার তা জানান। আমাদের দল যাচাই করার পর আবেদনটি এই পাতায় দেখানো হবে, যাতে ডোনাররা সাড়া দিতে পারেন।",
    patient: "রোগীর নাম",
    hospital: "হাসপাতাল",
    district: "জেলা",
    bloodGroup: "রক্তের গ্রুপ",
    bags: "ব্যাগ সংখ্যা (১ থেকে ২০)",
    urgency: "জরুরি অবস্থা",
    neededBy: "কখন প্রয়োজন",
    attendant: "স্বজনের নাম",
    attendantPhone: "স্বজনের মোবাইল নম্বর",
    reason: "কারণ (ঐচ্ছিক)",
    submit: "আবেদন পাঠান",
    sending: "পাঠানো হচ্ছে…",
    reqDone: "আপনার আবেদন পাওয়া গেছে",
    reqDoneText:
      "আমাদের দল শীঘ্রই যাচাই করবে। এরপর এই পাতায় আবেদনটি দেখা যাবে, ডোনাররা স্বজনের সাথে যোগাযোগ করতে পারবেন।",
    levels: { CRITICAL: "অত্যন্ত জরুরি", URGENT: "জরুরি", MODERATE: "মাঝারি" },
    errDuplicate: "এই ফোন নম্বরটি ইতিমধ্যে ডোনার হিসেবে নিবন্ধিত।",
    errInvalid: "তথ্য ঠিক আছে কিনা দেখে আবার চেষ্টা করুন।",
    errBusy: "অনেকবার চেষ্টা করা হয়েছে। কয়েক মিনিট পরে আবার চেষ্টা করুন।",
    errOther: "কিছু একটা ভুল হয়েছে। আবার চেষ্টা করুন।",
  },
} as const;

const DISTRICTS = [
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Sylhet",
  "Khulna",
  "Barisal",
  "Rangpur",
  "Mymensingh",
];
const GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const URGENCIES = ["CRITICAL", "URGENT", "MODERATE"] as const;
const inputCls =
  "w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:bg-white outline-none";
const labelCls =
  "block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1";

export default function Landing({
  summary,
  requests,
  donors,
  banks,
}: LandingProps) {
  const [lang, setLang] = useState<"en" | "bn">("en");
  const t = translations[lang];

  // Filters & State
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [requestFilter, setRequestFilter] = useState("All");
  const [selectedCompatGroup, setSelectedCompatGroup] =
    useState<BloodGroup>("O-");

  const x = EXTRA[lang];
  const problemText = (err: unknown): string => {
    if (err instanceof ApiProblem) {
      if (err.code === "DONOR_PHONE_TAKEN") return x.errDuplicate;
      if (err.status === 422) return x.errInvalid;
      if (err.status === 429) return x.errBusy;
    }
    return x.errOther;
  };

  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [activeContactModal, setActiveContactModal] =
    useState<UiRequest | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Donor registration form
  const emptyReg: DonorForm = {
    name: "",
    phone: "",
    bloodGroup: "A+",
    district: "Dhaka",
    lastDate: "",
  };
  const [regForm, setRegForm] = useState<DonorForm>(emptyReg);
  const [regSuccess, setRegSuccess] = useState(false);
  const [regBusy, setRegBusy] = useState(false);
  const [regError, setRegError] = useState("");

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegBusy(true);
    setRegError("");
    try {
      await registerDonor(regForm);
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setIsRegisterOpen(false);
        setRegForm(emptyReg);
      }, 3500);
    } catch (err) {
      setRegError(problemText(err));
    } finally {
      setRegBusy(false);
    }
  };

  // Blood request form
  const emptyReq: RequestForm = {
    patientName: "",
    hospital: "",
    district: "Dhaka",
    bloodGroup: "O+",
    units: 1,
    urgency: "URGENT",
    neededBy: "",
    contactName: "",
    contactPhone: "",
    reason: "",
  };
  const [reqForm, setReqForm] = useState<RequestForm>(emptyReq);
  const [reqSuccess, setReqSuccess] = useState(false);
  const [reqBusy, setReqBusy] = useState(false);
  const [reqError, setReqError] = useState("");

  const handleRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReqBusy(true);
    setReqError("");
    try {
      await submitRequest(reqForm);
      setReqSuccess(true);
      setReqForm(emptyReq);
    } catch (err) {
      setReqError(problemText(err));
    } finally {
      setReqBusy(false);
    }
  };
  const closeRequest = () => {
    setIsRequestOpen(false);
    setReqSuccess(false);
    setReqError("");
  };

  // Donor search: starts from the donors the page was rendered with
  const [filteredDonors, setFilteredDonors] = useState<UiDonor[]>(donors);
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasSearched(true);
    setSearching(true);
    setSearchError(false);
    searchDonors(selectedGroup, selectedLocation)
      .then(setFilteredDonors)
      .catch(() => setSearchError(true))
      .finally(() => setSearching(false));

    // Scroll smoothly to donor section
    const el = document.getElementById("donors-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const resetSearch = () => {
    setSelectedGroup("");
    setSelectedLocation("");
    setFilteredDonors(donors);
    setHasSearched(false);
    setSearchError(false);
  };

  // Filter requests
  const displayedRequests = requests.filter((req) => {
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
                  <span>{searching ? x.searching : t.hero.btnSearch}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => setIsRequestOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl flex items-center justify-center space-x-3 transition-all hover:-translate-y-0.5"
            >
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>{t.hero.btnUrgent}</span>
            </button>

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
                {summary.registeredDonors.toLocaleString("en-US")}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statDonors}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-slate-900 mb-1">
                {summary.fulfilledRequests.toLocaleString("en-US")}
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statSaved}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-rose-600 mb-1">
                {summary.districtsCovered} / 64
              </div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t.hero.statDistricts}
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/80 text-center shadow-sm">
              <div className="text-3xl font-black text-emerald-600 mb-1">
                {summary.activeRequests}
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
            {displayedRequests.length === 0 && (
              <p className="md:col-span-2 lg:col-span-3 text-center py-12 text-slate-500 font-semibold bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                {x.noRequests}
              </p>
            )}
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
                onClick={resetSearch}
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

          {searchError && (
            <p className="text-center py-4 text-rose-600 font-semibold">
              {x.searchFailed}
            </p>
          )}
          {!searchError && !searching && filteredDonors.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-semibold">
                No donors match your selected criteria currently.
              </p>
              <button
                onClick={resetSearch}
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
      {banks.length > 0 && (
        <section id="network" className="py-16 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              {t.network.title}
            </h2>
            <p className="text-slate-500 text-sm mb-10">{t.network.subtitle}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {banks.map((org) => (
                <div
                  key={org.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center text-center"
                >
                  <Hospital className="w-8 h-8 text-rose-600 mb-2" />
                  <h4 className="font-bold text-slate-900 text-sm">
                    {org.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium mt-1">
                    {org.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                <p className="text-slate-600 text-sm">{x.regDone}</p>
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

                <form
                  onSubmit={(e) => void handleRegisterSubmit(e)}
                  className="space-y-4"
                >
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

                  {regError && (
                    <p
                      role="alert"
                      className="text-rose-600 text-xs font-semibold"
                    >
                      {regError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={regBusy}
                    className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all mt-4"
                  >
                    {regBusy ? x.sending : t.modal.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= REQUEST BLOOD MODAL ================= */}
      {isRequestOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 my-4">
            <button
              onClick={closeRequest}
              aria-label={t.modal.close}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {reqSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">
                  {x.reqDone}
                </h3>
                <p className="text-slate-600 text-sm mb-6">{x.reqDoneText}</p>
                <button
                  onClick={closeRequest}
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold"
                >
                  {t.modal.close}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 pr-8">
                  <h3 className="text-2xl font-black text-slate-900">
                    {x.reqTitle}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">{x.reqSubtitle}</p>
                </div>

                <form
                  onSubmit={(e) => void handleRequestSubmit(e)}
                  className="space-y-4"
                >
                  <div>
                    <label className={labelCls}>{x.patient}</label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      value={reqForm.patientName}
                      onChange={(e) =>
                        setReqForm({ ...reqForm, patientName: e.target.value })
                      }
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>{x.hospital}</label>
                    <input
                      type="text"
                      required
                      minLength={2}
                      value={reqForm.hospital}
                      onChange={(e) =>
                        setReqForm({ ...reqForm, hospital: e.target.value })
                      }
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{x.district}</label>
                      <select
                        value={reqForm.district}
                        onChange={(e) =>
                          setReqForm({ ...reqForm, district: e.target.value })
                        }
                        className={inputCls + " cursor-pointer"}
                      >
                        {DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>{x.bloodGroup}</label>
                      <select
                        value={reqForm.bloodGroup}
                        onChange={(e) =>
                          setReqForm({ ...reqForm, bloodGroup: e.target.value })
                        }
                        className={inputCls + " cursor-pointer"}
                      >
                        {GROUPS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>{x.bags}</label>
                      <input
                        type="number"
                        required
                        min={1}
                        max={20}
                        value={reqForm.units}
                        onChange={(e) =>
                          setReqForm({
                            ...reqForm,
                            units: Number(e.target.value),
                          })
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>{x.urgency}</label>
                      <select
                        value={reqForm.urgency}
                        onChange={(e) =>
                          setReqForm({ ...reqForm, urgency: e.target.value })
                        }
                        className={inputCls + " cursor-pointer"}
                      >
                        {URGENCIES.map((u) => (
                          <option key={u} value={u}>
                            {x.levels[u]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{x.neededBy}</label>
                    <input
                      type="datetime-local"
                      required
                      value={reqForm.neededBy}
                      onChange={(e) =>
                        setReqForm({ ...reqForm, neededBy: e.target.value })
                      }
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>{x.attendant}</label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        value={reqForm.contactName}
                        onChange={(e) =>
                          setReqForm({
                            ...reqForm,
                            contactName: e.target.value,
                          })
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>{x.attendantPhone}</label>
                      <input
                        type="tel"
                        required
                        placeholder="017XXXXXXXX"
                        value={reqForm.contactPhone}
                        onChange={(e) =>
                          setReqForm({
                            ...reqForm,
                            contactPhone: e.target.value,
                          })
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>{x.reason}</label>
                    <textarea
                      rows={2}
                      maxLength={300}
                      value={reqForm.reason}
                      onChange={(e) =>
                        setReqForm({ ...reqForm, reason: e.target.value })
                      }
                      className={inputCls}
                    />
                  </div>
                  {reqError && (
                    <p
                      role="alert"
                      className="text-rose-600 text-xs font-semibold"
                    >
                      {reqError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={reqBusy}
                    className="w-full py-4 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all mt-2"
                  >
                    {reqBusy ? x.sending : x.submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= CONTACT ATTENDANT MODAL ================= */}
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
