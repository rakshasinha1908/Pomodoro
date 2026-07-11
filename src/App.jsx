import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Sparkles, Flower2, Coffee, Moon, Cloud, Play, Pause, RotateCcw,
  SkipForward, Settings, Plus, Minus, Clock, Target, Bookmark,
  Music, X, Flame, Quote as QuoteIcon, Calendar, Trash2,
  CheckCircle2, Circle, ListChecks, Gift, ChevronRight, Sun, MoonStar,
  Bell, Volume2, Award, Link2, Check
} from "lucide-react";

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */
const COLORS = {
  hotPink: "#FF4FA3",
  bubblegum: "#FF78C8",
  cottonCandy: "#FFA9DD",
  lavender: "#C78BFF",
  lilac: "#DFA8FF",
  softWhite: "#FFF9FC",
  coral: "#FF6F91",
  cream: "#FFF7FD",
  mint: "#9EF4D7",
  sky: "#7ED8FF",
};

const MODES = {
  focus: {
    key: "focus",
    label: "Focus",
    icon: Sparkles,
    grad: `linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.bubblegum})`,
    ring: [COLORS.hotPink, COLORS.bubblegum],
    soft: "rgba(255,79,163,0.16)",
    text: COLORS.hotPink,
  },
  short: {
    key: "short",
    label: "Short Break",
    icon: Coffee,
    grad: `linear-gradient(135deg, ${COLORS.mint}, ${COLORS.sky})`,
    ring: [COLORS.mint, COLORS.sky],
    soft: "rgba(126,216,255,0.18)",
    text: "#0FA37F",
  },
  long: {
    key: "long",
    label: "Long Break",
    icon: Moon,
    grad: `linear-gradient(135deg, ${COLORS.lavender}, ${COLORS.lilac})`,
    ring: [COLORS.lavender, COLORS.lilac],
    soft: "rgba(199,139,255,0.18)",
    text: COLORS.lavender,
  },
};

/* ---------------------------------------------------------
   QUOTES (130 positive productivity quotes)
--------------------------------------------------------- */
const QUOTES = [
  "Small petals make a whole bouquet.",
  "Bloom where you're focused.",
  "Progress is a series of pretty little sprints.",
  "Soft effort, strong results.",
  "Today's a good day to sparkle and get things done.",
  "You don't have to be perfect, just consistent.",
  "One focused hour beats ten scattered ones.",
  "Every session is a step toward something bigger.",
  "Consistency is the quietest kind of magic.",
  "Your future self is already thanking you.",
  "A calm mind gets more done than a rushed one.",
  "Tiny habits grow into big wins.",
  "The work you do today is a gift to tomorrow.",
  "Focus is a muscle, keep flexing it.",
  "Rest is part of the rhythm, not a break from it.",
  "Done is better than perfect.",
  "Momentum loves company, keep going.",
  "You are exactly where you need to be to begin.",
  "A single pomodoro can change your whole day.",
  "Discipline is just self-love in action.",
  "Slow progress is still progress.",
  "Trust the process, one timer at a time.",
  "Great things grow from small, steady sessions.",
  "Your focus is your superpower today.",
  "Breathe in calm, breathe out distraction.",
  "The best time to start was yesterday, the next best is now.",
  "Celebrate the small wins, they add up.",
  "You don't need motivation, just the next five minutes.",
  "Clarity comes from doing, not just thinking.",
  "Each session brings you closer to your goal.",
  "Effort compounds quietly and beautifully.",
  "Your only competition is who you were yesterday.",
  "A tidy timer, a tidy mind.",
  "Show up for yourself today.",
  "Little by little, a little becomes a lot.",
  "Stay soft, stay strong, stay focused.",
  "The garden of your goals needs daily watering.",
  "Deep work deserves a gentle pace.",
  "Growth happens in the quiet, steady moments.",
  "You're building something wonderful, session by session.",
  "Let today's focus be your quiet flex.",
  "Even a few petals of progress count.",
  "Kindness to yourself fuels better focus.",
  "Your attention is precious, spend it wisely.",
  "The timer is ticking toward your dreams.",
  "Every bloom starts as a tiny bud.",
  "Focus now, celebrate later.",
  "Progress feels better than perfection ever will.",
  "Your calm is your superpower.",
  "Steady hands build strong futures.",
  "Today's effort is tomorrow's ease.",
  "One petal at a time still makes a garden.",
  "The quiet sessions are where the magic happens.",
  "You're closer than you were an hour ago.",
  "Soft focus, sharp results.",
  "Let your work be gentle and your progress be real.",
  "A calm start is still a start.",
  "Your streak is a story you're writing daily.",
  "The timer doesn't judge, it just waits for you.",
  "Every checkbox is a tiny celebration.",
  "Today's five minutes matter more than yesterday's plans.",
  "Slow and steady blooms the loveliest garden.",
  "You're allowed to go at your own pace.",
  "The best focus feels like a soft exhale.",
  "Little sessions, big dreams.",
  "Small petals make a whole bouquet — keep going.",
  "Bloom where you're focused — you've got this.",
  "Progress is a series of pretty little sprints — one step at a time.",
  "Soft effort, strong results — bloom brightly.",
  "Today's a good day to sparkle and get things done — stay curious.",
  "You don't have to be perfect, just consistent — trust yourself.",
  "One focused hour beats ten scattered ones — the sparkle is in the effort.",
  "Every session is a step toward something bigger — your pace is enough.",
  "Consistency is the quietest kind of magic — small wins count too.",
  "Your future self is already thanking you — let it unfold gently.",
  "A calm mind gets more done than a rushed one — focus is self-care.",
  "Tiny habits grow into big wins — every minute matters.",
  "The work you do today is a gift to tomorrow — you're doing great.",
  "Focus is a muscle, keep flexing it — the streak starts now.",
  "Rest is part of the rhythm, not a break from it — breathe and begin.",
  "Done is better than perfect — today counts.",
  "Momentum loves company, keep going — petal by petal.",
  "You are exactly where you need to be to begin — you're on your way.",
  "A single pomodoro can change your whole day — this is enough.",
  "Discipline is just self-love in action — keep blooming.",
  "Slow progress is still progress — keep going.",
  "Trust the process, one timer at a time — you've got this.",
  "Great things grow from small, steady sessions — one step at a time.",
  "Your focus is your superpower today — bloom brightly.",
  "Breathe in calm, breathe out distraction — stay curious.",
  "The best time to start was yesterday, the next best is now — trust yourself.",
  "Celebrate the small wins, they add up — the sparkle is in the effort.",
  "You don't need motivation, just the next five minutes — your pace is enough.",
  "Clarity comes from doing, not just thinking — small wins count too.",
  "Each session brings you closer to your goal — let it unfold gently.",
  "Effort compounds quietly and beautifully — focus is self-care.",
  "Your only competition is who you were yesterday — every minute matters.",
  "A tidy timer, a tidy mind — you're doing great.",
  "Show up for yourself today — the streak starts now.",
  "Little by little, a little becomes a lot — breathe and begin.",
  "Stay soft, stay strong, stay focused — today counts.",
  "The garden of your goals needs daily watering — petal by petal.",
  "Deep work deserves a gentle pace — you're on your way.",
  "Growth happens in the quiet, steady moments — this is enough.",
  "You're building something wonderful, session by session — keep blooming.",
  "Let today's focus be your quiet flex — keep going.",
  "Even a few petals of progress count — you've got this.",
  "Kindness to yourself fuels better focus — one step at a time.",
  "Your attention is precious, spend it wisely — bloom brightly.",
  "The timer is ticking toward your dreams — stay curious.",
  "Every bloom starts as a tiny bud — trust yourself.",
  "Focus now, celebrate later — the sparkle is in the effort.",
  "Progress feels better than perfection ever will — your pace is enough.",
  "Your calm is your superpower — small wins count too.",
  "Steady hands build strong futures — let it unfold gently.",
  "Today's effort is tomorrow's ease — focus is self-care.",
  "One petal at a time still makes a garden — every minute matters.",
  "The quiet sessions are where the magic happens — you're doing great.",
  "You're closer than you were an hour ago — the streak starts now.",
  "Soft focus, sharp results — breathe and begin.",
  "Let your work be gentle and your progress be real — today counts.",
  "A calm start is still a start — petal by petal.",
  "Your streak is a story you're writing daily — you're on your way.",
  "The timer doesn't judge, it just waits for you — this is enough.",
  "Every checkbox is a tiny celebration — keep blooming.",
  "Today's five minutes matter more than yesterday's plans — keep going.",
  "Slow and steady blooms the loveliest garden — you've got this.",
  "You're allowed to go at your own pace — one step at a time.",
  "The best focus feels like a soft exhale — bloom brightly.",
  "Little sessions, big dreams — stay curious.",
];

/* ---------------------------------------------------------
   ACHIEVEMENTS
--------------------------------------------------------- */
const ACHIEVEMENTS = [
  { id: "first-bloom", label: "First Bloom", desc: "10 lifetime sessions", icon: Flower2, check: (s) => s.lifetimeSessions >= 10 },
  { id: "rose-garden", label: "Rose Garden", desc: "50 lifetime sessions", icon: Sparkles, check: (s) => s.lifetimeSessions >= 50 },
  { id: "full-bouquet", label: "Full Bouquet", desc: "100 lifetime sessions", icon: Gift, check: (s) => s.lifetimeSessions >= 100 },
  { id: "budding-habit", label: "Budding Habit", desc: "3-day streak", icon: Flame, check: (s) => s.streak >= 3 },
  { id: "blooming-streak", label: "Blooming Streak", desc: "7-day streak", icon: Flame, check: (s) => s.streak >= 7 },
  { id: "evergreen", label: "Evergreen", desc: "30-day streak", icon: Award, check: (s) => s.streak >= 30 },
];

/* ---------------------------------------------------------
   LOCAL STORAGE HELPERS
--------------------------------------------------------- */
const STORAGE_KEY = "petal-pomodoro-state-v1";

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Deterministic daily index so the quote only changes once every calendar day,
// with no manual shuffle needed.
function dailyQuoteIndex(dateStr) {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return hash % QUOTES.length;
}

const DEFAULT_STATE = {
  durations: { focus: 45, short: 5, long: 15 },
  mode: "focus",
  timeLeft: 45 * 60,
  isRunning: false,
  sessionsToday: 0,
  focusMinutesToday: 0,
  lifetimeSessions: 0,
  cyclePos: 0,
  cyclesCompleted: 0,
  streak: 0,
  history: [],
  tasks: [],
  goals: { dailyFocusGoal: 8, targetFocusHours: 5, taskGoal: "", reward: "" },
  quoteIndex: dailyQuoteIndex(todayStr()),
  quoteDate: todayStr(),
  musicOn: false,
  lastSavedDate: todayStr(),
  theme: "light",
  settings: {
    soundEnabled: true,
    notificationsEnabled: true,
    autoStartBreaks: false,
    autoStartFocus: false,
  },
  music: { source: null, url: "", embedUrl: "" },
  achievements: [],
};

function loadRawState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      goals: { ...DEFAULT_STATE.goals, ...(parsed.goals || {}) },
      settings: { ...DEFAULT_STATE.settings, ...(parsed.settings || {}) },
      music: { ...DEFAULT_STATE.music, ...(parsed.music || {}) },
    };
  } catch {
    return null;
  }
}

// Applies daily rollover logic (streak + today's counters) to a loaded state.
function applyDailyRollover(state) {
  const today = todayStr();
  let next = { ...state };

  if (next.lastSavedDate !== today) {
    const metGoal = next.sessionsToday >= (next.goals?.dailyFocusGoal || 1) && next.sessionsToday > 0;
    next.streak = metGoal ? next.streak + 1 : 0;
    next.sessionsToday = 0;
    next.focusMinutesToday = 0;
    next.lastSavedDate = today;
  }

  if (next.quoteDate !== today) {
    next.quoteIndex = dailyQuoteIndex(today);
    next.quoteDate = today;
  }

  return next;
}

function initState() {
  const loaded = loadRawState();
  if (!loaded) {
    return { ...DEFAULT_STATE };
  }
  return applyDailyRollover(loaded);
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatHoursMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}

/* ---------------------------------------------------------
   SOUND + NOTIFICATIONS
--------------------------------------------------------- */
let audioCtxSingleton = null;
function getAudioCtx() {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtxSingleton) audioCtxSingleton = new Ctor();
  return audioCtxSingleton;
}

function playChime() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;
  const TOTAL_DUR = 7.6; // seconds

  // master bus — noticeably louder than before, with a slow natural fade-out
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.linearRampToValueAtTime(0.55, now + 0.08);
  master.gain.setValueAtTime(0.55, now + TOTAL_DUR - 2.2);
  master.gain.exponentialRampToValueAtTime(0.0001, now + TOTAL_DUR);
  master.connect(ctx.destination);

  // a soft feedback delay gives the bells a warm, reverberant shimmer/tail
  const delay = ctx.createDelay(2);
  delay.delayTime.value = 0.34;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.38;
  const delayWet = ctx.createGain();
  delayWet.gain.value = 0.5;
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(delayWet);
  delayWet.connect(master);

  // one bell-like note: fundamental + a quiet upper harmonic, soft attack, long decay
  function bellNote(freq, startTime, dur, peakGain) {
    const fundamental = ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.value = freq;

    const harmonic = ctx.createOscillator();
    harmonic.type = "sine";
    harmonic.frequency.value = freq * 2.005; // slight detune for a natural bell shimmer

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.value = 0.28;

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0008, startTime + dur);

    harmonic.connect(harmonicGain);
    harmonicGain.connect(noteGain);
    fundamental.connect(noteGain);
    noteGain.connect(master);
    noteGain.connect(delay);

    fundamental.start(startTime);
    fundamental.stop(startTime + dur + 0.15);
    harmonic.start(startTime);
    harmonic.stop(startTime + dur + 0.15);
  }

  // gentle rising arpeggio (pentatonic bloom), each note left to ring and overlap
  const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5 E5 G5 C6 E6 G6
  arpeggio.forEach((freq, i) => {
    bellNote(freq, now + i * 0.5, 3.4, 0.24);
  });

  // a soft settling chord near the end for a rewarding, resolved finish
  bellNote(1046.5, now + 3.1, 4.2, 0.16);
  bellNote(1318.51, now + 3.3, 4.2, 0.14);
  bellNote(783.99, now + 3.5, 4.4, 0.15);

  // a warm low pad underneath, like a soft piano note, sustaining through the chime
  const pad = ctx.createOscillator();
  pad.type = "triangle";
  pad.frequency.value = 261.63; // C4
  const padGain = ctx.createGain();
  padGain.gain.setValueAtTime(0, now);
  padGain.gain.linearRampToValueAtTime(0.09, now + 0.5);
  padGain.gain.linearRampToValueAtTime(0.06, now + 4.5);
  padGain.gain.exponentialRampToValueAtTime(0.0008, now + TOTAL_DUR - 0.2);
  pad.connect(padGain);
  padGain.connect(master);
  pad.start(now);
  pad.stop(now + TOTAL_DUR);
}

function sendNotification(title, body) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "granted") {
    try {
      new Notification(title, { body, icon: undefined });
    } catch {
      /* ignore */
    }
  }
}

/* ---------------------------------------------------------
   MUSIC URL PARSING
--------------------------------------------------------- */
function buildEmbedUrl(source, rawUrl) {
  const url = (rawUrl || "").trim();
  if (!url) return "";
  try {
    if (source === "spotify") {
      const m = url.match(/open\.spotify\.com\/(playlist|album|track|artist)\/([a-zA-Z0-9]+)/);
      if (m) return `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`;
      return "";
    }
    if (source === "apple") {
      const m = url.match(/music\.apple\.com\/(.+)/);
      if (m) return `https://embed.music.apple.com/${m[1]}`;
      return "";
    }
    if (source === "youtube") {
      const listMatch = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
      if (listMatch) return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`;
      const vidMatch = url.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{6,})/);
      if (vidMatch) return `https://www.youtube.com/embed/${vidMatch[1]}`;
      return "";
    }
  } catch {
    return "";
  }
  return "";
}

const MUSIC_SOURCES = [
  { id: "spotify", label: "Spotify", placeholder: "Paste a Spotify playlist link…" },
  { id: "apple", label: "Apple Music", placeholder: "Paste an Apple Music playlist link…" },
  { id: "youtube", label: "YouTube", placeholder: "Paste a YouTube playlist link…" },
];

/* ---------------------------------------------------------
   STEPPER
--------------------------------------------------------- */
function Stepper({ label, value, onChange, min = 1, max = 90, accent }) {
  return (
    <div className="stepper">
      <span className="stepper-label">{label}</span>
      <div className="stepper-pill">
        <button
          className="stepper-btn"
          style={{ color: accent }}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label}`}
        >
          <Minus size={16} strokeWidth={3} />
        </button>
        <span className="stepper-value">{value}<small>min</small></span>
        <button
          className="stepper-btn"
          style={{ color: accent }}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label}`}
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   TOGGLE SWITCH
--------------------------------------------------------- */
function ToggleRow({ label, checked, onChange, icon: Icon }) {
  return (
    <div className="toggle-row">
      <span className="toggle-label">
        {Icon && <Icon size={14} strokeWidth={2.6} />}
        {label}
      </span>
      <button
        className={`toggle-switch ${checked ? "on" : ""}`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        aria-label={label}
      >
        <span className="toggle-knob" />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   STAT CARD
--------------------------------------------------------- */
function StatCard({ icon: Icon, value, label, grad }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: grad }}>
        <Icon size={18} color="#fff" strokeWidth={2.4} />
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN APP
--------------------------------------------------------- */
export default function App() {
  const initial = useMemo(() => initState(), []);

  const [durations, setDurations] = useState(initial.durations);
  const [mode, setMode] = useState(initial.mode);
  const [timeLeft, setTimeLeft] = useState(initial.timeLeft);
  const [isRunning, setIsRunning] = useState(false); // never auto-resume running on load

  const [sessionsToday, setSessionsToday] = useState(initial.sessionsToday);
  const [cyclesCompleted, setCyclesCompleted] = useState(initial.cyclesCompleted);
  const [streak, setStreak] = useState(initial.streak);
  const [focusMinutesToday, setFocusMinutesToday] = useState(initial.focusMinutesToday);
  const [lifetimeSessions, setLifetimeSessions] = useState(initial.lifetimeSessions);
  const [cyclePos, setCyclePos] = useState(initial.cyclePos);
  const [history, setHistory] = useState(initial.history);
  const [tasks, setTasks] = useState(initial.tasks);
  const [goals, setGoals] = useState(initial.goals);
  const [lastSavedDate, setLastSavedDate] = useState(initial.lastSavedDate);

  const [theme, setTheme] = useState(initial.theme);
  const [settings, setSettings] = useState(initial.settings);
  const [music, setMusic] = useState(initial.music);
  const [musicUrlDraft, setMusicUrlDraft] = useState(initial.music.url || "");
  const [musicSourceDraft, setMusicSourceDraft] = useState(initial.music.source || "spotify");
  const [unlockedAchievements, setUnlockedAchievements] = useState(initial.achievements);
  const [achievementPopup, setAchievementPopup] = useState(null);
  const achievementQueueRef = useRef([]);

  const [showSettings, setShowSettings] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBloom, setShowBloom] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(initial.quoteIndex);
  const [quoteDate, setQuoteDate] = useState(initial.quoteDate);
  const [musicOn, setMusicOn] = useState(initial.musicOn);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskEst, setNewTaskEst] = useState(2);
  const [activeTaskId, setActiveTaskId] = useState(null);

  const totalDuration = durations[mode] * 60;
  const modeInfo = MODES[mode];
  const quote = QUOTES[quoteIndex] || QUOTES[0];

  // refs to avoid stale closures inside interval callbacks
  const sessionsTodayRef = useRef(sessionsToday);
  const goalsRef = useRef(goals);
  const settingsRef = useRef(settings);
  useEffect(() => { sessionsTodayRef.current = sessionsToday; }, [sessionsToday]);
  useEffect(() => { goalsRef.current = goals; }, [goals]);
  useEffect(() => { settingsRef.current = settings; }, [settings]);

  const skippedRef = useRef(false);

  const switchMode = useCallback((nextMode, autoDurations = durations, startRunning = false) => {
    setMode(nextMode);
    setTimeLeft(autoDurations[nextMode] * 60);
    setIsRunning(startRunning);
  }, [durations]);

  // ask for notification permission once, lazily, first time the toggle is on
  useEffect(() => {
    if (settings.notificationsEnabled && typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "default") {
        Notification.requestPermission();
      }
    }
  }, [settings.notificationsEnabled]);

  // countdown
  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft <= 0) return;
    const id = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, timeLeft]);

  // completion handling
  useEffect(() => {
    if (timeLeft !== 0 || !isRunning) return;
    setIsRunning(false);

    const wasNatural = !skippedRef.current;
    skippedRef.current = false;

    setHistory((h) => [{ mode, minutes: durations[mode], at: Date.now(), natural: wasNatural }, ...h].slice(0, 8));

    if (wasNatural) {
      if (settingsRef.current.soundEnabled) playChime();
      if (mode === "focus") {
        sendNotification("Focus session complete! 🌸", "Time for a break.");
      } else {
        sendNotification("Break's over! 🌷", "Ready for your next focus session?");
      }
    }

    const nextAutoStart = mode === "focus"
      ? settingsRef.current.autoStartBreaks
      : settingsRef.current.autoStartFocus;

    if (mode === "focus") {
      if (wasNatural) {
        setSessionsToday((s) => s + 1);
        setFocusMinutesToday((m) => m + durations.focus);
        setLifetimeSessions((l) => l + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2200);

        if (activeTaskId) {
          setTasks((ts) => ts.map((t) => t.id === activeTaskId ? { ...t, completed: Math.min(t.estimate, t.completed + 1) } : t));
        }
      }

      const newPos = cyclePos + 1;
      if (newPos >= 4) {
        setCyclePos(0);
        setCyclesCompleted((c) => c + 1);
        if (wasNatural) {
          setShowBloom(true);
          setTimeout(() => setShowBloom(false), 2600);
        }
        switchMode("long", durations, nextAutoStart);
      } else {
        setCyclePos(newPos);
        switchMode("short", durations, nextAutoStart);
      }
    } else {
      switchMode("focus", durations, nextAutoStart);
    }
    // eslint-disable-next-line
  }, [timeLeft]);

  // daily rollover check while app stays open
  useEffect(() => {
    const id = setInterval(() => {
      const today = todayStr();
      setLastSavedDate((prevDate) => {
        if (prevDate === today) return prevDate;
        const metGoal = sessionsTodayRef.current >= (goalsRef.current?.dailyFocusGoal || 1) && sessionsTodayRef.current > 0;
        setStreak((s) => (metGoal ? s + 1 : 0));
        setSessionsToday(0);
        setFocusMinutesToday(0);
        return today;
      });
      setQuoteDate((prevQDate) => {
        if (prevQDate === today) return prevQDate;
        setQuoteIndex(dailyQuoteIndex(today));
        return today;
      });
    }, 30000);
    return () => clearInterval(id);
  }, []);

  // achievement checking — watches lifetime sessions & streak
  useEffect(() => {
    const statSnapshot = { lifetimeSessions, streak };
    const newlyUnlocked = ACHIEVEMENTS.filter(
      (a) => !unlockedAchievements.includes(a.id) && a.check(statSnapshot)
    );
    if (newlyUnlocked.length > 0) {
      achievementQueueRef.current.push(...newlyUnlocked.map((a) => a.id));
      setUnlockedAchievements((prev) => [...prev, ...newlyUnlocked.map((a) => a.id)]);
    }
    // eslint-disable-next-line
  }, [lifetimeSessions, streak]);

  // pop achievement popups one at a time from the queue
  useEffect(() => {
    if (achievementPopup) return;
    if (achievementQueueRef.current.length === 0) return;
    const nextId = achievementQueueRef.current.shift();
    const def = ACHIEVEMENTS.find((a) => a.id === nextId);
    if (def) {
      setAchievementPopup(def);
      const t = setTimeout(() => setAchievementPopup(null), 3400);
      return () => clearTimeout(t);
    }
  }, [achievementPopup, unlockedAchievements]);

  // persist to localStorage on any relevant change
  useEffect(() => {
    const state = {
      durations, mode, timeLeft, isRunning,
      sessionsToday, focusMinutesToday, lifetimeSessions,
      cyclePos, cyclesCompleted, streak, history,
      tasks, goals, quoteIndex, quoteDate, musicOn, lastSavedDate,
      theme, settings, music, achievements: unlockedAchievements,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [
    durations, mode, timeLeft, isRunning,
    sessionsToday, focusMinutesToday, lifetimeSessions,
    cyclePos, cyclesCompleted, streak, history,
    tasks, goals, quoteIndex, quoteDate, musicOn, lastSavedDate,
    theme, settings, music, unlockedAchievements,
  ]);

  const progressRatio = totalDuration > 0 ? timeLeft / totalDuration : 0;
  const r = 128;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - progressRatio);

  const handleReset = () => {
    setIsRunning(false);
    skippedRef.current = false;
    setTimeLeft(durations[mode] * 60);
  };

  const handleSkip = () => {
    skippedRef.current = true;
    setIsRunning(true);
    setTimeLeft(0);
  };

  const handleModeTab = (m) => {
    skippedRef.current = false;
    switchMode(m);
  };

  const updateDuration = (m, val) => {
    setDurations((d) => {
      const next = { ...d, [m]: val };
      if (m === mode && !isRunning) setTimeLeft(val * 60);
      return next;
    });
  };

  const dateLabel = useMemo(() => {
    const d = new Date();
    const weekday = d.toLocaleDateString(undefined, { weekday: "short" });
    const day = d.getDate();
    const month = d.toLocaleDateString(undefined, { month: "short" });
    return `${weekday}, ${day} ${month}`;
  }, [lastSavedDate]);

  /* ---------------- TASKS ---------------- */
  const addTask = () => {
    const title = newTaskTitle.trim();
    if (!title) return;
    const task = {
      id: `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title,
      estimate: Math.max(1, Number(newTaskEst) || 1),
      completed: 0,
      done: false,
    };
    setTasks((ts) => [task, ...ts]);
    setNewTaskTitle("");
    setNewTaskEst(2);
  };

  const toggleTaskDone = (id) => {
    setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks((ts) => ts.filter((t) => t.id !== id));
    if (activeTaskId === id) setActiveTaskId(null);
  };

  const bumpTaskPomodoro = (id, delta) => {
    setTasks((ts) => ts.map((t) => t.id === id ? { ...t, completed: Math.max(0, Math.min(t.estimate, t.completed + delta)) } : t));
  };

  /* ---------------- GOALS ---------------- */
  const updateGoal = (key, value) => {
    setGoals((g) => ({ ...g, [key]: value }));
  };

  /* ---------------- SETTINGS ---------------- */
  const updateSetting = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
  };

  /* ---------------- MUSIC ---------------- */
  const connectMusic = () => {
    const embedUrl = buildEmbedUrl(musicSourceDraft, musicUrlDraft);
    setMusic({ source: musicSourceDraft, url: musicUrlDraft.trim(), embedUrl });
    setMusicOn(!!embedUrl);
  };

  const disconnectMusic = () => {
    setMusic({ source: null, url: "", embedUrl: "" });
    setMusicUrlDraft("");
    setMusicOn(false);
  };

  const focusHoursToday = focusMinutesToday / 60;
  const sessionsGoalPct = Math.min(100, (sessionsToday / Math.max(1, goals.dailyFocusGoal)) * 100);
  const hoursGoalPct = Math.min(100, (focusHoursToday / Math.max(0.1, goals.targetFocusHours)) * 100);
  const tasksDonePct = tasks.length > 0 ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0;

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 1.6 + Math.random() * 1.2,
        rot: Math.random() * 360,
        color: [COLORS.hotPink, COLORS.bubblegum, COLORS.mint, COLORS.sky, COLORS.lavender, COLORS.coral][i % 6],
      })),
    [showConfetti]
  );

  return (
    <div className={`pomo-root ${theme === "dark" ? "dark" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap');

        .pomo-root {
          --pink: ${COLORS.hotPink};
          --bubblegum: ${COLORS.bubblegum};
          --cotton: ${COLORS.cottonCandy};
          --lavender: ${COLORS.lavender};
          --lilac: ${COLORS.lilac};
          --white: ${COLORS.softWhite};
          --coral: ${COLORS.coral};
          --cream: ${COLORS.cream};
          --mint: ${COLORS.mint};
          --sky: ${COLORS.sky};

          --page-bg: linear-gradient(180deg, #FFFDFE 0%, #FFF3FB 50%, #FDF1FF 100%);
          --card-bg: #FFF9FC;
          --text-primary: #3A1B32;
          --text-secondary: #B569A0;
          --text-tertiary: #C88EB0;
          --text-quote: #7A3D69;
          --input-bg: #FFFAFD;
          --input-border: #FFE1F1;
          --surface: #FFF1F8;
          --surface-2: #FFEAF5;
          --track-bg: #FFE9F5;
          --raised: #ffffff;
          --divider: #FFE1F1;
          --shadow-card: 0 20px 50px rgba(255,79,163,0.12), 0 6px 16px rgba(199,139,255,0.10);
          --shadow-soft: 0 6px 16px rgba(199,139,255,0.18);
          --overlay-bg: rgba(90,40,80,0.28);
          --bloom-overlay-bg: rgba(255,249,252,0.72);

          font-family: 'Nunito', sans-serif;
          position: relative;
          min-height: 100vh;
          width: 100%;
          max-width: 100vw;
          background: var(--page-bg);
          overflow-x: hidden;
          box-sizing: border-box;
          padding: clamp(16px, 4vw, 32px) clamp(12px, 3vw, 16px) clamp(80px, 10vw, 96px);
          transition: background .3s ease;
        }
        .pomo-root.dark {
          --page-bg: linear-gradient(180deg, #1B1120 0%, #221528 50%, #241129 100%);
          --card-bg: #241A2B;
          --text-primary: #FCE9F5;
          --text-secondary: #D9A3C4;
          --text-tertiary: #B98BAE;
          --text-quote: #EFC2E1;
          --input-bg: #2C1F32;
          --input-border: #4A3350;
          --surface: #2C1F32;
          --surface-2: #33243B;
          --track-bg: #33243B;
          --raised: #2A1D31;
          --divider: #40304A;
          --shadow-card: 0 20px 50px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.25);
          --shadow-soft: 0 6px 16px rgba(0,0,0,0.3);
          --overlay-bg: rgba(10,4,12,0.55);
          --bloom-overlay-bg: rgba(27,17,32,0.82);
        }
        .pomo-root *, .pomo-root *::before, .pomo-root *::after { box-sizing: border-box; }
        .pomo-root h1, .pomo-root h2, .pomo-root h3, .pomo-root .heading {
          font-family: 'Baloo 2', 'Nunito', sans-serif;
        }

        /* background texture + blobs */
        .bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: radial-gradient(rgba(255,79,163,0.08) 1px, transparent 1px);
          background-size: 26px 26px;
          mask-image: radial-gradient(circle at 50% 30%, black, transparent 85%);
        }
        .pomo-root.dark .bg-grid { background-image: radial-gradient(rgba(255,79,163,0.14) 1px, transparent 1px); }
        .blob { position: fixed; border-radius: 50%; filter: blur(50px); z-index: 0; opacity: 0.55; pointer-events: none; }
        .pomo-root.dark .blob { opacity: 0.22; }
        .blob1 { width: 340px; height: 340px; background: var(--cotton); top: -100px; left: -100px; animation: floatA 14s ease-in-out infinite; }
        .blob2 { width: 300px; height: 300px; background: var(--mint); bottom: -80px; right: -80px; animation: floatB 16s ease-in-out infinite; }
        .blob3 { width: 260px; height: 260px; background: var(--lilac); top: 40%; right: -120px; animation: floatA 18s ease-in-out infinite; }
        .blob4 { width: 220px; height: 220px; background: var(--sky); bottom: 10%; left: -100px; animation: floatB 15s ease-in-out infinite; }
        @keyframes floatA { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(30px,-25px) scale(1.08);} }
        @keyframes floatB { 0%,100% { transform: translate(0,0) scale(1);} 50% { transform: translate(-25px,20px) scale(1.05);} }

        .pomo-shell { position: relative; z-index: 1; max-width: 1080px; margin: 0 auto; width: 100%; }

        /* header */
        .pomo-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: clamp(18px, 3vw, 28px); gap: 10px; flex-wrap: wrap; }
        .brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .brand-badge {
          width: 42px; height: 42px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, var(--pink), var(--lavender));
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 18px rgba(255,79,163,0.35);
        }
        .brand-title { font-weight: 800; font-size: clamp(18px, 4vw, 22px); color: var(--text-primary); letter-spacing: -0.3px; }
        .brand-sub { font-size: 12px; color: var(--text-secondary); font-weight: 700; margin-top: -2px; }
        .header-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .date-pill {
          display: flex; align-items: center; gap: 8px; background: var(--raised); border-radius: 16px;
          padding: 9px 14px; box-shadow: var(--shadow-soft); flex-shrink: 0;
        }
        .date-pill .ic { width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--pink), var(--lavender)); color: #fff; flex-shrink: 0; }
        .date-pill-text { font-weight: 800; font-size: 13px; color: var(--text-primary); white-space: nowrap; }
        .icon-btn {
          width: 44px; height: 44px; border-radius: 14px; border: none; cursor: pointer;
          background: var(--raised); box-shadow: var(--shadow-soft);
          display: flex; align-items: center; justify-content: center; color: #A64FD9;
          transition: transform .18s ease, box-shadow .18s ease; flex-shrink: 0;
        }
        .icon-btn:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 10px 22px rgba(199,139,255,0.28); }
        .theme-toggle {
          width: 44px; height: 44px; border-radius: 14px; border: none; cursor: pointer;
          background: linear-gradient(135deg, var(--pink), var(--lavender)); box-shadow: 0 8px 18px rgba(255,79,163,0.3);
          display: flex; align-items: center; justify-content: center; color: #fff;
          transition: transform .18s ease; flex-shrink: 0;
        }
        .theme-toggle:hover { transform: translateY(-3px) scale(1.05) rotate(-8deg); }

        /* layout grid */
        .pomo-grid { display: grid; grid-template-columns: 1.25fr 1fr; gap: clamp(14px, 2.5vw, 24px); align-items: start; }
        @media (max-width: 880px) { .pomo-grid { grid-template-columns: 1fr; } }

        .card {
          background: var(--card-bg);
          border-radius: clamp(18px, 3vw, 28px);
          box-shadow: var(--shadow-card);
          padding: clamp(16px, 3.5vw, 24px);
          min-width: 0;
          max-width: 100%;
          transition: background .3s ease;
        }

        /* tabs */
        .tabs { display: flex; gap: 8px; margin-bottom: clamp(18px, 3vw, 26px); flex-wrap: wrap; }
        .tab {
          flex: 1; min-width: 96px; border: none; cursor: pointer; padding: clamp(9px,2vw,12px) clamp(8px,2vw,16px);
          border-radius: 999px; font-family: 'Nunito'; font-weight: 800; font-size: clamp(11.5px, 2.6vw, 13.5px);
          display: flex; align-items: center; justify-content: center; gap: 6px;
          background: var(--surface); color: var(--text-tertiary); transition: all .22s ease; letter-spacing: 0.2px; white-space: nowrap;
        }
        .tab.active { color: #fff; transform: translateY(-2px); }
        .tab:hover:not(.active) { background: var(--surface-2); transform: translateY(-1px); }

        /* timer capsule */
        .timer-wrap { display: flex; flex-direction: column; align-items: center; padding: 12px 0 20px; width: 100%; }
        .timer-ring-box { position: relative; width: clamp(200px, 62vw, 280px); height: clamp(200px, 62vw, 280px); margin: 0 auto; max-width: 100%; }
        .timer-glow {
          position: absolute; inset: -18px; border-radius: 50%; z-index: 0;
          filter: blur(28px); opacity: 0.55;
        }
        .timer-pulse { animation: pulseGlow 2.4s ease-in-out infinite; }
        @keyframes pulseGlow { 0%,100% { opacity: 0.45; transform: scale(1);} 50% { opacity: 0.75; transform: scale(1.06);} }
        .timer-disc {
          position: absolute; inset: 14px; border-radius: 50%; background: var(--raised); z-index: 1;
          box-shadow: 0 14px 40px rgba(255,111,145,0.18), inset 0 0 0 1px rgba(255,255,255,0.06);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .timer-time { font-family: 'Baloo 2'; font-weight: 800; font-size: clamp(34px, 10vw, 52px); color: var(--text-primary); letter-spacing: -1px; line-height: 1; }
        .timer-mode-label { margin-top: 8px; font-weight: 800; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
        .timer-svg { position: relative; z-index: 1; transform: rotate(-90deg); width: 100%; height: 100%; }
        .timer-svg circle:first-child { stroke: var(--track-bg); }

        /* controls */
        .controls { display: flex; align-items: center; justify-content: center; gap: clamp(10px, 3vw, 16px); margin-top: clamp(22px, 4vw, 32px); flex-wrap: wrap; }
        .btn-round {
          border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: transform .18s ease, box-shadow .18s ease; color: #fff; flex-shrink: 0;
        }
        .btn-round:hover { transform: translateY(-3px) scale(1.04); }
        .btn-round:active { transform: translateY(0) scale(0.97); }
        .btn-secondary { width: clamp(48px,10vw,56px); height: clamp(48px,10vw,56px); border-radius: 20px; background: linear-gradient(135deg, var(--coral), var(--pink)); box-shadow: 0 10px 22px rgba(255,111,145,0.35); }
        .btn-primary { width: clamp(64px,14vw,78px); height: clamp(64px,14vw,78px); border-radius: 26px; box-shadow: 0 14px 30px rgba(255,79,163,0.4); }
        .btn-outline {
          width: clamp(48px,10vw,56px); height: clamp(48px,10vw,56px); border-radius: 20px; background: var(--raised); color: #A64FD9;
          box-shadow: var(--shadow-soft);
        }

        /* steppers */
        .stepper-row { display: flex; gap: 12px; justify-content: center; margin-top: clamp(28px, 5vw, 38px); flex-wrap: wrap; }
        .stepper { display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .stepper-label { font-size: 11px; font-weight: 800; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; text-align: center; }
        .stepper-pill {
          display: flex; align-items: center; gap: 10px; background: var(--surface); border-radius: 999px; padding: 6px 8px;
        }
        .stepper-btn {
          width: 30px; height: 30px; border-radius: 50%; border: none; background: var(--raised); cursor: pointer;
          display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.06);
          transition: transform .15s ease; flex-shrink: 0;
        }
        .stepper-btn:hover { transform: scale(1.12); }
        .stepper-value { font-weight: 800; color: var(--text-primary); font-size: 15px; min-width: 34px; text-align: center; }
        .stepper-value small { font-weight: 700; color: var(--text-tertiary); margin-left: 2px; font-size: 10px; }

        /* sidebar cards */
        .side-stack { display: flex; flex-direction: column; gap: clamp(14px, 2.5vw, 18px); min-width: 0; }
        .mini-title { display: flex; align-items: center; gap: 8px; font-weight: 800; color: var(--text-primary); font-size: 14px; margin-bottom: 12px; }
        .mini-title .ic { width: 26px; height: 26px; border-radius: 9px; display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }

        .goal-bar-track { height: 12px; border-radius: 999px; background: var(--track-bg); overflow: hidden; }
        .goal-bar-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--pink), var(--lavender)); transition: width .5s ease; }
        .goal-caption { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--text-secondary); margin-top: 8px; gap: 6px; }
        .goal-block + .goal-block { margin-top: 18px; }
        .goal-block-label { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 800; color: var(--text-quote); margin-bottom: 8px; }
        .goal-block-label span { color: var(--text-primary); }

        .task-input {
          width: 100%; border: 2px solid var(--input-border); border-radius: 16px; padding: 11px 14px;
          font-family: 'Nunito'; font-weight: 700; font-size: 13.5px; color: var(--text-primary); outline: none;
          transition: border-color .2s ease; background: var(--input-bg);
        }
        .task-input:focus { border-color: var(--pink); }
        .task-input::placeholder { color: var(--text-tertiary); }

        .goal-input {
          width: 100%; border: 2px solid var(--input-border); border-radius: 12px; padding: 8px 12px;
          font-family: 'Nunito'; font-weight: 700; font-size: 13px; color: var(--text-primary); outline: none;
          transition: border-color .2s ease; background: var(--input-bg);
        }
        .goal-input:focus { border-color: var(--pink); }
        .goal-input::placeholder { color: var(--text-tertiary); }

        .stats-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 12px; }
        .stat-card { background: var(--input-bg); border-radius: 18px; padding: 14px; box-shadow: 0 6px 16px rgba(255,120,200,0.10); min-width: 0; }
        .stat-icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; }
        .stat-value { font-family: 'Baloo 2'; font-weight: 800; font-size: clamp(16px, 4vw, 20px); color: var(--text-primary); line-height: 1; word-break: break-word; }
        .stat-label { font-size: 11px; font-weight: 700; color: var(--text-tertiary); margin-top: 4px; }

        .quote-box { font-weight: 700; color: var(--text-quote); font-size: 13.5px; line-height: 1.5; font-style: normal; }

        /* toggle switches (settings) */
        .toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 4px 0; }
        .toggle-label { display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 13px; color: var(--text-primary); }
        .toggle-switch {
          width: 46px; height: 26px; border-radius: 999px; border: none; cursor: pointer; position: relative; flex-shrink: 0;
          background: var(--track-bg); transition: background .2s ease; padding: 0;
        }
        .toggle-switch.on { background: linear-gradient(135deg, var(--pink), var(--lavender)); }
        .toggle-knob {
          position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%; background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2); transition: transform .2s ease;
        }
        .toggle-switch.on .toggle-knob { transform: translateX(20px); }

        /* music */
        .music-source-row { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
        .music-source-btn {
          flex: 1; min-width: 88px; border: 2px solid var(--input-border); background: var(--input-bg); cursor: pointer;
          border-radius: 12px; padding: 8px 10px; font-weight: 800; font-size: 12px; color: var(--text-secondary);
          display: flex; align-items: center; justify-content: center; gap: 6px; transition: all .15s ease;
        }
        .music-source-btn.active { border-color: var(--pink); color: var(--pink); background: rgba(255,79,163,0.08); }
        .music-url-row { display: flex; gap: 8px; }
        .music-url-row .task-input { flex: 1; }
        .music-connect-btn {
          border: none; cursor: pointer; border-radius: 12px; padding: 0 16px;
          background: linear-gradient(135deg, var(--pink), var(--lavender)); color: #fff; font-weight: 800; font-size: 12.5px;
          display: flex; align-items: center; justify-content: center; gap: 6px; box-shadow: 0 8px 18px rgba(255,79,163,0.3);
          transition: transform .15s ease; flex-shrink: 0;
        }
        .music-connect-btn:hover { transform: translateY(-2px); }
        .music-embed-wrap { margin-top: 14px; border-radius: 16px; overflow: hidden; background: var(--input-bg); }
        .music-connected-row { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; gap: 8px; }
        .music-connected-tag { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 800; color: #0FA37F; }
        .music-disconnect-btn { border: none; background: none; cursor: pointer; color: var(--text-tertiary); font-weight: 800; font-size: 11.5px; text-decoration: underline; }

        .history-row { display: flex; align-items: center; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid var(--divider); font-size: 12.5px; font-weight: 700; color: var(--text-quote); gap: 8px; }
        .history-row:last-child { border-bottom: none; }
        .history-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 8px; flex-shrink: 0; }
        .history-skip-tag { font-size: 10px; font-weight: 800; color: var(--text-tertiary); background: var(--surface); padding: 2px 8px; border-radius: 999px; }

        /* achievements */
        .achv-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }
        .achv-tile {
          border-radius: 16px; padding: 12px; background: var(--input-bg); text-align: center; opacity: 0.4; filter: grayscale(1);
          transition: all .2s ease;
        }
        .achv-tile.unlocked { opacity: 1; filter: none; box-shadow: 0 6px 16px rgba(255,120,200,0.14); }
        .achv-icon { width: 34px; height: 34px; border-radius: 11px; margin: 0 auto 8px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--pink), var(--lavender)); color: #fff; }
        .achv-tile-label { font-weight: 800; font-size: 11.5px; color: var(--text-primary); line-height: 1.2; }
        .achv-tile-desc { font-size: 10px; font-weight: 700; color: var(--text-tertiary); margin-top: 3px; }

        /* achievement popup */
        .achv-popup {
          position: fixed; top: clamp(16px, 4vw, 26px); left: 50%; transform: translateX(-50%); z-index: 70;
          background: var(--raised); border-radius: 20px; padding: 14px 22px; display: flex; align-items: center; gap: 12px;
          box-shadow: 0 20px 44px rgba(255,79,163,0.28); animation: achvSlide .4s cubic-bezier(.34,1.56,.64,1);
          max-width: min(92vw, 380px);
        }
        @keyframes achvSlide { 0% { transform: translate(-50%, -30px); opacity: 0; } 100% { transform: translate(-50%, 0); opacity: 1; } }
        .achv-popup-icon { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, var(--pink), var(--lavender)); display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; animation: pulseGlow 1.4s ease-in-out infinite; }
        .achv-popup-title { font-size: 11px; font-weight: 800; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; }
        .achv-popup-name { font-family: 'Baloo 2'; font-weight: 800; font-size: 15px; color: var(--text-primary); }
        .achv-popup-desc { font-size: 11.5px; font-weight: 700; color: var(--text-secondary); }

        /* task manager */
        .task-add-row { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; }
        .task-add-row .task-input { flex: 1; min-width: 140px; }
        .task-est-input {
          width: 64px; border: 2px solid var(--input-border); border-radius: 12px; padding: 10px 8px; text-align: center;
          font-family: 'Nunito'; font-weight: 800; font-size: 13.5px; color: var(--text-primary); outline: none; background: var(--input-bg);
        }
        .task-add-btn {
          border: none; cursor: pointer; border-radius: 12px; padding: 0 14px;
          background: linear-gradient(135deg, var(--pink), var(--lavender)); color: #fff;
          display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 18px rgba(255,79,163,0.3);
          transition: transform .15s ease; flex-shrink: 0;
        }
        .task-add-btn:hover { transform: translateY(-2px); }
        .task-list { display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; padding-right: 2px; }
        .task-row {
          display: flex; align-items: center; gap: 10px; background: var(--input-bg); border-radius: 14px; padding: 10px 12px;
          border: 2px solid transparent; transition: border-color .15s ease; min-width: 0;
        }
        .task-row.active { border-color: var(--pink); }
        .task-check { background: none; border: none; cursor: pointer; color: var(--pink); display: flex; flex-shrink: 0; padding: 0; }
        .task-title-btn { background: none; border: none; cursor: pointer; text-align: left; flex: 1; min-width: 0; padding: 0; }
        .task-title { font-weight: 800; font-size: 13.5px; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .task-title.done { text-decoration: line-through; color: var(--text-tertiary); }
        .task-progress { font-size: 11.5px; font-weight: 700; color: var(--text-secondary); margin-top: 2px; }
        .task-actions { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
        .task-mini-btn {
          width: 22px; height: 22px; border-radius: 50%; border: none; background: var(--surface-2); cursor: pointer;
          display: flex; align-items: center; justify-content: center; color: #A64FD9; transition: transform .12s ease;
        }
        .task-mini-btn:hover { transform: scale(1.1); }
        .task-delete-btn {
          width: 28px; height: 28px; border-radius: 50%; border: none; background: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; color: #E0709A; transition: transform .12s ease; flex-shrink: 0;
        }
        .task-delete-btn:hover { transform: scale(1.12); color: var(--coral); }
        .task-empty { font-size: 12.5px; font-weight: 700; color: var(--text-tertiary); text-align: center; padding: 14px 0; }

        /* bottom settings button */
        .bottom-settings-btn {
          position: fixed; bottom: clamp(16px, 4vw, 24px); right: clamp(16px, 4vw, 24px); z-index: 30;
          border: none; cursor: pointer; padding: 12px 18px; border-radius: 999px; display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, var(--pink), var(--lavender)); color: #fff; font-weight: 800; font-size: 13px;
          box-shadow: 0 14px 30px rgba(255,79,163,0.35); transition: transform .18s ease;
        }
        .bottom-settings-btn:hover { transform: translateY(-3px) scale(1.03); }

        /* settings drawer */
        .drawer-overlay { position: fixed; inset: 0; background: var(--overlay-bg); z-index: 40; animation: fadeIn .2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: min(360px, 92vw); background: var(--cream);
          z-index: 41; padding: clamp(20px,4vw,26px) clamp(16px,4vw,22px); box-shadow: -20px 0 50px rgba(0,0,0,0.15);
          animation: slideIn .25s ease; overflow-y: auto;
        }
        .pomo-root.dark .drawer { background: #201725; }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .drawer-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 22px; }
        .drawer-title { font-family: 'Baloo 2'; font-weight: 800; font-size: 20px; color: var(--text-primary); }
        .drawer-divider { height: 1px; background: var(--divider); margin: 4px 0; }
        .drawer-toggle-stack { display: flex; flex-direction: column; gap: 4px; background: var(--input-bg); border-radius: 16px; padding: 12px 14px; }
        .drawer-toggle-stack .toggle-row + .toggle-row { border-top: 1px solid var(--divider); padding-top: 10px; margin-top: 4px; }

        .theme-pick-row { display: flex; gap: 10px; }
        .theme-pick-btn {
          flex: 1; border: 2px solid var(--input-border); background: var(--input-bg); cursor: pointer; border-radius: 14px;
          padding: 12px; display: flex; flex-direction: column; align-items: center; gap: 6px; font-weight: 800; font-size: 12px;
          color: var(--text-secondary); transition: all .15s ease;
        }
        .theme-pick-btn.active { border-color: var(--pink); color: var(--pink); background: rgba(255,79,163,0.08); }

        /* confetti */
        .confetti-piece {
          position: fixed; top: -20px; width: 9px; height: 14px; z-index: 60; border-radius: 3px;
          animation-name: fall; animation-timing-function: ease-in; animation-fill-mode: forwards;
        }
        @keyframes fall { to { transform: translateY(105vh) rotate(400deg); opacity: 0.85; } }

        /* bloom overlay */
        .bloom-overlay {
          position: fixed; inset: 0; z-index: 55; display: flex; align-items: center; justify-content: center;
          background: var(--bloom-overlay-bg); animation: fadeIn .25s ease; padding: 20px;
        }
        .bloom-card {
          background: var(--card-bg); border-radius: 32px; padding: clamp(28px,6vw,40px) clamp(24px,6vw,48px); text-align: center;
          box-shadow: 0 30px 70px rgba(255,79,163,0.3); animation: bloomPop .5s cubic-bezier(.34,1.56,.64,1); max-width: 92vw;
        }
        @keyframes bloomPop { 0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .bloom-icon-ring { width: 92px; height: 92px; border-radius: 50%; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--pink), var(--lavender)); animation: pulseGlow 1.6s ease-in-out infinite; }
        .bloom-title { font-family: 'Baloo 2'; font-weight: 800; font-size: 22px; color: var(--text-primary); margin-bottom: 6px; }
        .bloom-sub { font-weight: 700; color: var(--text-secondary); font-size: 13px; }

        input[type=range] { -webkit-appearance: none; }

        @media (max-width: 400px) {
          .tab { min-width: 84px; }
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .achv-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="bg-grid" />
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />
      <div className="blob blob4" />

      {showConfetti && (
        <>
          {confettiPieces.map((p) => (
            <span
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.left}%`,
                background: p.color,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                transform: `rotate(${p.rot}deg)`,
              }}
            />
          ))}
        </>
      )}

      {showBloom && (
        <div className="bloom-overlay">
          <div className="bloom-card">
            <div className="bloom-icon-ring">
              <Flower2 size={44} color="#fff" strokeWidth={2} />
            </div>
            <div className="bloom-title">Full bloom!</div>
            <div className="bloom-sub">You finished a whole cycle of 4 pomodoros 🌸</div>
          </div>
        </div>
      )}

      {achievementPopup && (
        <div className="achv-popup">
          <div className="achv-popup-icon">
            <achievementPopup.icon size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div className="achv-popup-title">Badge unlocked</div>
            <div className="achv-popup-name">{achievementPopup.label}</div>
            <div className="achv-popup-desc">{achievementPopup.desc}</div>
          </div>
        </div>
      )}

      <div className="pomo-shell">
        {/* header */}
        <div className="pomo-header">
          <div className="brand">
            <div className="brand-badge">
              <Sparkles size={22} color="#fff" strokeWidth={2.4} />
            </div>
            <div>
              <div className="brand-title">Petal</div>
              <div className="brand-sub">your cheerful pomodoro</div>
            </div>
          </div>
          <div className="header-actions">
            <div className="date-pill">
              <span className="ic"><Calendar size={15} strokeWidth={2.6} /></span>
              <span className="date-pill-text">{dateLabel}</span>
            </div>
            <button
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} strokeWidth={2.4} /> : <MoonStar size={18} strokeWidth={2.4} />}
            </button>
          </div>
        </div>

        <div className="pomo-grid">
          {/* LEFT: timer card */}
          <div className="card">
            <div className="tabs">
              {Object.values(MODES).map((m) => {
                const Icon = m.icon;
                const active = mode === m.key;
                return (
                  <button
                    key={m.key}
                    className={`tab ${active ? "active" : ""}`}
                    style={active ? { background: m.grad, boxShadow: `0 10px 22px ${m.soft}` } : {}}
                    onClick={() => handleModeTab(m.key)}
                  >
                    <Icon size={16} strokeWidth={2.4} />
                    {m.label}
                  </button>
                );
              })}
            </div>

            <div className="timer-wrap">
              <div className="timer-ring-box">
                <div
                  className={`timer-glow ${isRunning ? "timer-pulse" : ""}`}
                  style={{ background: modeInfo.grad }}
                />
                <svg className="timer-svg" viewBox="0 0 280 280">
                  <circle cx="140" cy="140" r={r} fill="none" stroke="#FFEAF5" strokeWidth="14" />
                  <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={modeInfo.ring[0]} />
                      <stop offset="100%" stopColor={modeInfo.ring[1]} />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="140" cy="140" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="14"
                    strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
                    style={{ transition: "stroke-dashoffset 1s linear" }}
                  />
                </svg>
                <div className="timer-disc">
                  <div className="timer-time">{formatTime(timeLeft)}</div>
                  <div className="timer-mode-label" style={{ color: modeInfo.text }}>{modeInfo.label}</div>
                </div>
              </div>

              <div className="controls">
                <button className="btn-round btn-secondary" onClick={handleReset} aria-label="Reset">
                  <RotateCcw size={20} strokeWidth={2.4} />
                </button>
                <button
                  className="btn-round btn-primary"
                  style={{ background: modeInfo.grad }}
                  onClick={() => setIsRunning((r) => !r)}
                  aria-label={isRunning ? "Pause" : "Play"}
                >
                  {isRunning ? <Pause size={30} strokeWidth={2.4} /> : <Play size={30} strokeWidth={2.4} style={{ marginLeft: 3 }} />}
                </button>
                <button className="btn-round btn-outline" onClick={handleSkip} aria-label="Skip">
                  <SkipForward size={20} strokeWidth={2.4} />
                </button>
              </div>

              <div className="stepper-row">
                <Stepper
                  label={`${modeInfo.label} length`}
                  value={durations[mode]}
                  onChange={(v) => updateDuration(mode, v)}
                  accent={modeInfo.text}
                  min={1}
                  max={90}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: sidebar */}
          <div className="side-stack">
            <div className="card">
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.lavender})` }}>
                  <Target size={14} strokeWidth={2.6} />
                </span>
                Today's Goals
              </div>

              <div className="goal-block">
                <div className="goal-block-label"><Flower2 size={13} /> Daily focus goal</div>
                <div className="goal-bar-track">
                  <div className="goal-bar-fill" style={{ width: `${sessionsGoalPct}%` }} />
                </div>
                <div className="goal-caption">
                  <span>{sessionsToday} of {goals.dailyFocusGoal} sessions</span>
                  <span>{Math.max(0, goals.dailyFocusGoal - sessionsToday)} to go</span>
                </div>
              </div>

              <div className="goal-block">
                <div className="goal-block-label"><Clock size={13} /> Target focus hours</div>
                <div className="goal-bar-track">
                  <div className="goal-bar-fill" style={{ width: `${hoursGoalPct}%`, background: `linear-gradient(90deg, ${COLORS.sky}, ${COLORS.mint})` }} />
                </div>
                <div className="goal-caption">
                  <span>{formatHoursMinutes(focusMinutesToday)} of {goals.targetFocusHours}h</span>
                  <span>{hoursGoalPct >= 100 ? "reached!" : `${Math.round(hoursGoalPct)}%`}</span>
                </div>
              </div>

              {tasks.length > 0 && (
                <div className="goal-block">
                  <div className="goal-block-label"><ListChecks size={13} /> Task completion</div>
                  <div className="goal-bar-track">
                    <div className="goal-bar-fill" style={{ width: `${tasksDonePct}%`, background: `linear-gradient(90deg, ${COLORS.lavender}, ${COLORS.lilac})` }} />
                  </div>
                  <div className="goal-caption">
                    <span>{tasks.filter((t) => t.done).length} of {tasks.length} tasks</span>
                    <span>{tasksDonePct}%</span>
                  </div>
                </div>
              )}

              {(goals.taskGoal || goals.reward) && (
                <div className="goal-block">
                  {goals.taskGoal && (
                    <div className="goal-block-label" style={{ marginBottom: goals.reward ? 6 : 0 }}>
                      <ChevronRight size={13} /> Focus task: <span>{goals.taskGoal}</span>
                    </div>
                  )}
                  {goals.reward && (
                    <div className="goal-block-label" style={{ marginBottom: 0 }}>
                      <Gift size={13} /> Reward: <span>{goals.reward}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="card">
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.hotPink})` }}>
                  <Bookmark size={14} strokeWidth={2.6} />
                </span>
                Tasks
              </div>
              <div className="task-add-row">
                <input
                  className="task-input"
                  placeholder="Add a task..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
                />
                <input
                  className="task-est-input"
                  type="number"
                  min={1}
                  max={20}
                  value={newTaskEst}
                  onChange={(e) => setNewTaskEst(e.target.value)}
                  aria-label="Estimated pomodoros"
                />
                <button className="task-add-btn" onClick={addTask} aria-label="Add task">
                  <Plus size={18} strokeWidth={2.8} />
                </button>
              </div>

              {tasks.length === 0 ? (
                <div className="task-empty">No tasks yet — add one to get started 🌸</div>
              ) : (
                <div className="task-list">
                  {tasks.map((t) => (
                    <div key={t.id} className={`task-row ${activeTaskId === t.id ? "active" : ""}`}>
                      <button className="task-check" onClick={() => toggleTaskDone(t.id)} aria-label="Toggle done">
                        {t.done ? <CheckCircle2 size={20} color={COLORS.hotPink} fill={COLORS.hotPink} /> : <Circle size={20} color="#E7B8D3" />}
                      </button>
                      <button className="task-title-btn" onClick={() => setActiveTaskId(t.id === activeTaskId ? null : t.id)}>
                        <div className={`task-title ${t.done ? "done" : ""}`}>{t.title}</div>
                        <div className="task-progress">{t.completed}/{t.estimate} pomodoros{activeTaskId === t.id ? " • active" : ""}</div>
                      </button>
                      <div className="task-actions">
                        <button className="task-mini-btn" onClick={() => bumpTaskPomodoro(t.id, -1)} aria-label="Decrease pomodoros"><Minus size={12} strokeWidth={3} /></button>
                        <button className="task-mini-btn" onClick={() => bumpTaskPomodoro(t.id, 1)} aria-label="Increase pomodoros"><Plus size={12} strokeWidth={3} /></button>
                      </div>
                      <button className="task-delete-btn" onClick={() => deleteTask(t.id)} aria-label="Delete task">
                        <Trash2 size={16} strokeWidth={2.3} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.lavender}, ${COLORS.sky})` }}>
                  <Flame size={14} strokeWidth={2.6} />
                </span>
                Statistics
              </div>
              <div className="stats-grid">
                <StatCard icon={Flower2} value={sessionsToday} label="Focus Sessions Today" grad={`linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.bubblegum})`} />
                <StatCard icon={Clock} value={formatHoursMinutes(focusMinutesToday)} label="Focus Time Today" grad={`linear-gradient(135deg, ${COLORS.sky}, ${COLORS.mint})`} />
                <StatCard icon={Flame} value={streak} label="Current Streak" grad={`linear-gradient(135deg, ${COLORS.coral}, ${COLORS.hotPink})`} />
                <StatCard icon={Sparkles} value={lifetimeSessions} label="Lifetime Sessions" grad={`linear-gradient(135deg, ${COLORS.lavender}, ${COLORS.lilac})`} />
              </div>
            </div>

            <div className="card">
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.coral})` }}>
                  <Award size={14} strokeWidth={2.6} />
                </span>
                Achievements ({unlockedAchievements.length}/{ACHIEVEMENTS.length})
              </div>
              <div className="achv-grid">
                {ACHIEVEMENTS.map((a) => {
                  const AIcon = a.icon;
                  const unlocked = unlockedAchievements.includes(a.id);
                  return (
                    <div key={a.id} className={`achv-tile ${unlocked ? "unlocked" : ""}`}>
                      <div className="achv-icon"><AIcon size={16} strokeWidth={2.4} /></div>
                      <div className="achv-tile-label">{a.label}</div>
                      <div className="achv-tile-desc">{a.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card">
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.mint}, ${COLORS.sky})` }}>
                  <QuoteIcon size={14} strokeWidth={2.6} />
                </span>
                Quote of the Day
              </div>
              <div className="quote-box">“{quote}”</div>
            </div>

            <div className="card">
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.mint})` }}>
                  <Music size={14} strokeWidth={2.6} />
                </span>
                Focus Music
              </div>

              {!music.embedUrl ? (
                <>
                  <div className="music-source-row">
                    {MUSIC_SOURCES.map((s) => (
                      <button
                        key={s.id}
                        className={`music-source-btn ${musicSourceDraft === s.id ? "active" : ""}`}
                        onClick={() => setMusicSourceDraft(s.id)}
                      >
                        {s.id === "youtube" ? <Play size={14} /> : <Link2 size={14} />}
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <div className="music-url-row">
                    <input
                      className="task-input"
                      placeholder={MUSIC_SOURCES.find((s) => s.id === musicSourceDraft)?.placeholder || "Paste a playlist link…"}
                      value={musicUrlDraft}
                      onChange={(e) => setMusicUrlDraft(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") connectMusic(); }}
                    />
                    <button className="music-connect-btn" onClick={connectMusic}>
                      <Check size={14} strokeWidth={3} /> Connect
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="music-connected-row">
                    <span className="music-connected-tag">
                      <Check size={13} strokeWidth={3} />
                      Connected to {MUSIC_SOURCES.find((s) => s.id === music.source)?.label}
                    </span>
                    <button className="music-disconnect-btn" onClick={disconnectMusic}>Change</button>
                  </div>
                  <div className="music-embed-wrap">
                    <iframe
                      title="focus-music-player"
                      src={music.embedUrl}
                      width="100%"
                      height={music.source === "spotify" ? 152 : 175}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ display: "block", border: "none" }}
                    />
                  </div>
                </>
              )}
            </div>

            {history.length > 0 && (
              <div className="card">
                <div className="mini-title">
                  <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.lavender})` }}>
                    <Clock size={14} strokeWidth={2.6} />
                  </span>
                  Session History
                </div>
                {history.map((h, i) => (
                  <div className="history-row" key={i}>
                    <span style={{ display: "flex", alignItems: "center", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span className="history-dot" style={{ background: MODES[h.mode].text }} />
                      {MODES[h.mode].label}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      {!h.natural && <span className="history-skip-tag">skipped</span>}
                      {h.minutes} min
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <button className="bottom-settings-btn" onClick={() => setShowSettings(true)}>
        <Settings size={16} strokeWidth={2.6} />
        Settings
      </button>

      {showSettings && (
        <>
          <div className="drawer-overlay" onClick={() => setShowSettings(false)} />
          <div className="drawer">
            <div className="drawer-head">
              <div className="drawer-title">Settings</div>
              <button className="icon-btn" onClick={() => setShowSettings(false)} aria-label="Close settings">
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.lavender})` }}>{theme === "dark" ? <Sun size={13} strokeWidth={2.6} /> : <MoonStar size={13} strokeWidth={2.6} />}</span>
                Appearance
              </div>
              <div className="theme-pick-row">
                <button className={`theme-pick-btn ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>
                  <Sun size={18} strokeWidth={2.4} /> Light
                </button>
                <button className={`theme-pick-btn ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}>
                  <MoonStar size={18} strokeWidth={2.4} /> Dark
                </button>
              </div>

              <div className="drawer-divider" />

              <div className="mini-title">
                <span className="ic" style={{ background: MODES.focus.grad }}><Sparkles size={13} strokeWidth={2.6} /></span>
                Session lengths
              </div>
              <div className="stepper-row" style={{ justifyContent: "flex-start", gap: 20 }}>
                <Stepper label="Focus" value={durations.focus} onChange={(v) => updateDuration("focus", v)} accent={MODES.focus.text} />
                <Stepper label="Short break" value={durations.short} onChange={(v) => updateDuration("short", v)} accent={MODES.short.text} />
              </div>
              <div className="stepper-row" style={{ justifyContent: "flex-start" }}>
                <Stepper label="Long break" value={durations.long} onChange={(v) => updateDuration("long", v)} accent={MODES.long.text} />
              </div>

              <div className="drawer-divider" />

              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.hotPink})` }}><Bell size={13} strokeWidth={2.6} /></span>
                Session behavior
              </div>
              <div className="drawer-toggle-stack">
                <ToggleRow
                  label="Notifications"
                  icon={Bell}
                  checked={settings.notificationsEnabled}
                  onChange={(v) => updateSetting("notificationsEnabled", v)}
                />
                <ToggleRow
                  label="Sound Effects"
                  icon={Volume2}
                  checked={settings.soundEnabled}
                  onChange={(v) => updateSetting("soundEnabled", v)}
                />
                <ToggleRow
                  label="Auto-start Breaks"
                  icon={Coffee}
                  checked={settings.autoStartBreaks}
                  onChange={(v) => updateSetting("autoStartBreaks", v)}
                />
                <ToggleRow
                  label="Auto-start Focus Sessions"
                  icon={Sparkles}
                  checked={settings.autoStartFocus}
                  onChange={(v) => updateSetting("autoStartFocus", v)}
                />
              </div>

              <div className="drawer-divider" />

              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.hotPink}, ${COLORS.lavender})` }}><Target size={13} strokeWidth={2.6} /></span>
                Goals
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div className="stepper-label" style={{ marginBottom: 6, textAlign: "left" }}>Daily focus goal (sessions)</div>
                  <input
                    className="goal-input" type="number" min={1} max={30}
                    value={goals.dailyFocusGoal}
                    onChange={(e) => updateGoal("dailyFocusGoal", Math.max(1, Number(e.target.value) || 1))}
                  />
                </div>
                <div>
                  <div className="stepper-label" style={{ marginBottom: 6, textAlign: "left" }}>Target focus hours</div>
                  <input
                    className="goal-input" type="number" min={0.5} step={0.5} max={16}
                    value={goals.targetFocusHours}
                    onChange={(e) => updateGoal("targetFocusHours", Math.max(0.5, Number(e.target.value) || 0.5))}
                  />
                </div>
                <div>
                  <div className="stepper-label" style={{ marginBottom: 6, textAlign: "left" }}>Task goal</div>
                  <input
                    className="goal-input" type="text" placeholder="e.g. Finish DBMS"
                    value={goals.taskGoal}
                    onChange={(e) => updateGoal("taskGoal", e.target.value)}
                  />
                </div>
                <div>
                  <div className="stepper-label" style={{ marginBottom: 6, textAlign: "left" }}>Reward</div>
                  <input
                    className="goal-input" type="text" placeholder="e.g. Watch Netflix"
                    value={goals.reward}
                    onChange={(e) => updateGoal("reward", e.target.value)}
                  />
                </div>
              </div>

              <div className="drawer-divider" />

              <div className="mini-title">
                <span className="ic" style={{ background: `linear-gradient(135deg, ${COLORS.mint}, ${COLORS.sky})` }}><Cloud size={13} strokeWidth={2.6} /></span>
                About
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                Petal keeps your rhythm sweet: four focus sessions bloom into a long break.
                Your progress is saved automatically on this device.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}