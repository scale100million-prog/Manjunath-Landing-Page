import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle, Video, User, Phone, Mail, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  
  // Date selection states
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('32');
  const [goal, setGoal] = useState('both');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate the next 6 days starting from today for scheduling
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const calendarDays = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      rawDate: d.toISOString().split('T')[0],
      dayName: daysOfWeek[d.getDay()],
      dayNum: d.getDate(),
      month: months[d.getMonth()],
    };
  });

  const slots = [
    { time: '09:30 AM EST', status: 'taken' },
    { time: '11:00 AM EST', status: 'filling' },
    { time: '01:30 PM EST', status: 'available' },
    { time: '03:00 PM EST', status: 'filling' },
    { time: '04:30 PM EST', status: 'available' },
    { time: '06:00 PM EST', status: 'filling' },
  ];

  // Set default date
  if (!selectedDate && calendarDays.length > 0) {
    setSelectedDate(calendarDays[0].rawDate);
  }

  const handleNextStep = () => {
    if (!selectedSlot) {
      alert('Please select a preferred time slot first!');
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success Screen
    }, 1200);
  };

  const handleClose = () => {
    setStep(1);
    setSelectedSlot('');
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-10"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-neutral-950 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-red-500 font-bold tracking-wide uppercase text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Superhuman Strategy Session</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full hover:bg-neutral-800 transition text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper indicator */}
          <div className="flex bg-neutral-950 px-6 py-2.5 border-b border-neutral-800 items-center justify-between text-xs text-gray-500 font-medium">
            <span>Progress</span>
            <div className="flex items-center gap-1.5 font-mono">
              <span className={step >= 1 ? "text-red-500 font-bold" : ""}>1. Choose Time</span>
              <span className="text-neutral-700">|</span>
              <span className={step >= 2 ? "text-red-500 font-bold" : ""}>2. Fit Form</span>
              <span className="text-neutral-700">|</span>
              <span className={step >= 3 ? "text-green-500 font-bold" : ""}>3. Success</span>
            </div>
          </div>

          {/* Step 1: Schedule Date & Time */}
          {step === 1 && (
            <div className="p-6">
              <h3 className="text-xl font-bold font-serif text-white mb-2 leading-snug">
                Select Your Transformation Strategy Slot
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                All sessions are 1-on-1 private Zoom calls. Select an available date and time slot below to lock standard assessment credentials.
              </p>

              {/* Date Selector Row */}
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                Select Date
              </label>
              <div className="grid grid-cols-6 gap-2 mb-6">
                {calendarDays.map((c) => {
                  const isSelected = selectedDate === c.rawDate;
                  return (
                    <button
                      type="button"
                      key={c.rawDate}
                      onClick={() => setSelectedDate(c.rawDate)}
                      className={`flex flex-col items-center py-2.5 px-1.5 rounded-xl border transition text-center select-none ${
                        isSelected
                          ? 'bg-red-600 border-red-500 text-white shadow-lg'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-neutral-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-tight opacity-75">{c.dayName}</span>
                      <span className="text-lg font-extrabold leading-none my-1">{c.dayNum}</span>
                      <span className="text-[9px] uppercase font-medium tracking-tight opacity-90">{c.month}</span>
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Area */}
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-red-500" />
                Select Session Time
              </label>
              <div className="grid grid-cols-2 gap-2.5 mb-8">
                {slots.map((s) => {
                  const isSelected = selectedSlot === s.time;
                  const isTaken = s.status === 'taken';
                  const isFilling = s.status === 'filling';

                  return (
                    <button
                      type="button"
                      key={s.time}
                      disabled={isTaken}
                      onClick={() => setSelectedSlot(s.time)}
                      className={`relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                        isTaken
                          ? 'bg-neutral-950/40 border-neutral-800/50 text-neutral-600 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-white border-white text-neutral-950 font-bold shadow-lg'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-200 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-sm font-extrabold">{s.time}</span>
                      {isTaken && (
                        <span className="text-[9px] mt-1 font-bold text-neutral-500 uppercase">Booked Out</span>
                      )}
                      {!isTaken && isFilling && (
                        <span className={`text-[9px] mt-1 font-bold uppercase ${isSelected ? 'text-red-600' : 'text-red-500 animate-pulse'}`}>
                          Filling Fast
                        </span>
                      )}
                      {!isTaken && !isFilling && (
                        <span className={`text-[9px] mt-1 font-bold uppercase ${isSelected ? 'text-emerald-700' : 'text-emerald-500'}`}>
                          Available
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Step Action CTA */}
              <button
                onClick={handleNextStep}
                disabled={!selectedSlot}
                className={`w-full py-4 rounded-xl font-bold tracking-wide uppercase transition duration-200 flex items-center justify-center gap-2 ${
                  selectedSlot
                    ? 'bg-red-600 text-white hover:bg-red-500 hover:shadow-lg'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>Continue to Intake Form</span>
              </button>
            </div>
          )}

          {/* Step 2: Form Intake */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="p-6">
              <h3 className="text-xl font-bold font-serif text-white mb-2 leading-snug">
                Your Transformation Profile
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Tell us about your starting metrics to make this strategy call customized. Your information is 100% confidential.
              </p>

              <div className="space-y-4 mb-6">
                {/* Full name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Anup Sharma"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 transition"
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-red-500" />
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anup@gmail.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-red-500" />
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>

                {/* Age and Main Goal Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-red-500" />
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="18"
                      max="100"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-red-500" />
                      Primary Goal
                    </label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition"
                    >
                      <option value="lose-fat">Lose Fat Shredding</option>
                      <option value="build-muscle">Build Raw Muscle</option>
                      <option value="both">Both (Body Recomp)</option>
                      <option value="stuck">Break Weight Plateau</option>
                    </select>
                  </div>
                </div>

                {/* Additional context */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    What is your single biggest frustration right now?
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g., Struggling with snack cravings at night / No time to prep meals..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-red-500 transition resize-none"
                  />
                </div>
              </div>

              {/* Bottom buttons */}
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 border border-neutral-850 bg-neutral-950 hover:bg-neutral-850 rounded-xl text-neutral-300 font-bold transition duration-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-3 bg-red-650 hover:bg-red-550 rounded-xl text-white font-bold tracking-wide uppercase transition duration-200 flex items-center justify-center gap-2 border border-red-550"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <span>Secure Slot Now</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Success Confirmation */}
          {step === 3 && (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-emerald-950/50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-800">
                <CheckCircle className="w-10 h-10 animate-bounce" />
              </div>

              <h3 className="text-2xl font-bold font-serif text-white mb-2">
                Your Slot Is Confirmed!
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Congratulations {fullName || 'Champ'}! You’re taking the absolute first step toward activating your Superhuman Switch.
              </p>

              {/* Simulated Calendar card */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 mb-6 text-left space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="bg-neutral-900 border border-neutral-800 text-red-500 w-11 h-11 rounded-lg flex flex-col items-center justify-center leading-none">
                    <span className="text-[9px] uppercase font-bold">Zoom</span>
                    <Video className="w-5 h-5 text-white mt-1" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">1-on-1 Strategy Video Consultation</h4>
                    <span className="text-xs text-neutral-400 capitalize">{selectedDate} at {selectedSlot}</span>
                  </div>
                </div>

                <hr className="border-neutral-800" />

                <div className="space-y-1 bg-red-950/20 rounded-xl p-3 border border-red-900/30">
                  <h5 className="text-xs font-extrabold text-red-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    Crucial Next Steps
                  </h5>
                  <ul className="text-xs text-neutral-300 space-y-1.5 pl-1.5 pt-2">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-500">✔</span>
                      <span>An email confirmation containing the secret PDF outline workbook is being dispatched right now to <strong className="text-white">{email}</strong>.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-500">✔</span>
                      <span>We will call or WhatsApp message <strong className="text-white">{phone}</strong> to confirm you can access high-speed internet.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3.5 bg-neutral-950 border border-neutral-800 hover:bg-neutral-900 rounded-xl font-bold text-white transition"
              >
                Done, Let's Continue
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
