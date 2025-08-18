"use client"
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight, Moon, Sun, Trophy, Star, Zap, BookOpen, Target, CheckCircle, Play, User, LogOut} from "lucide-react";

const roadmap = [
  {
    phase: "Phase 1: Foundations (Math & Basics)",
    icon: "🧮",
    color: "from-blue-500 to-cyan-500",
    topics: [
      { title: "Linear Algebra", reason: "Everything in AI is represented as vectors and matrices. Understanding this is key to how models process and store data.", difficulty: 3, xp: 100 },
      { title: "Calculus", reason: "Derivatives are used in backpropagation, which is how neural networks learn.", difficulty: 4, xp: 120 },
      { title: "Optimization (Gradient Descent)", reason: "Helps models minimize error and improve predictions.", difficulty: 3, xp: 100 },
      { title: "Statistics", reason: "Allows you to understand distributions, averages, and variability in data.", difficulty: 2, xp: 80 },
      { title: "Probability", reason: "Used in modeling uncertainty and making predictions.", difficulty: 2, xp: 80 },
    ],
  },
  {
    phase: "Phase 2: Programming & Tools",
    icon: "💻",
    color: "from-green-500 to-emerald-500",
    topics: [
      { title: "Python", reason: "Most ML/AI frameworks (PyTorch, TensorFlow) are built in Python.", difficulty: 2, xp: 80 },
      { title: "Core Python Concepts (OOP, Decorators, Generators)", reason: "Necessary for writing clean, scalable AI code.", difficulty: 3, xp: 100 },
      { title: "NumPy", reason: "Efficient array handling, the backbone of scientific computing in Python.", difficulty: 2, xp: 80 },
      { title: "Pandas", reason: "Essential for preprocessing, cleaning, and analyzing datasets.", difficulty: 2, xp: 80 },
      { title: "PyTorch", reason: "Flexible deep learning framework with dynamic computation graphs.", difficulty: 4, xp: 120 },
      { title: "TensorFlow", reason: "Widely used framework for large-scale production ML systems.", difficulty: 4, xp: 120 },
      { title: "Jupyter/Colab", reason: "Interactive environment for testing and prototyping.", difficulty: 1, xp: 60 },
      { title: "Git & Docker", reason: "Version control and reproducibility for experiments.", difficulty: 2, xp: 80 },
    ],
  },
  {
    phase: "Phase 3: Deep Learning & Neural Networks",
    icon: "🧠",
    color: "from-purple-500 to-pink-500",
    topics: [
      { title: "Perceptron", reason: "The simplest building block of neural networks.", difficulty: 2, xp: 80 },
      { title: "Multi-Layer Perceptron (MLP)", reason: "Foundation of deep learning, with hidden layers to learn complex patterns.", difficulty: 3, xp: 100 },
      { title: "Activation Functions (ReLU, Sigmoid, Tanh)", reason: "Decide when neurons fire, adding non-linearity for complex learning.", difficulty: 3, xp: 100 },
      { title: "Loss Functions (Cross-Entropy, MSE)", reason: "Tell the network how wrong it is and guide improvements.", difficulty: 3, xp: 100 },
      { title: "Convolutional Neural Networks (CNNs)", reason: "Specialized for image recognition and spatial pattern detection.", difficulty: 4, xp: 120 },
      { title: "Recurrent Neural Networks (RNNs)", reason: "Work with sequential data like time series and text.", difficulty: 4, xp: 120 },
      { title: "LSTMs/GRUs", reason: "Overcome RNN limitations by remembering long-term dependencies.", difficulty: 4, xp: 120 },
    ],
  },
  {
    phase: "Phase 4: Advanced AI & LLMs",
    icon: "🚀",
    color: "from-orange-500 to-red-500",
    topics: [
      { title: "Large Language Models (LLMs)", reason: "The backbone of modern AI (e.g., ChatGPT) for understanding and generating language.", difficulty: 5, xp: 150 },
      { title: "Hugging Face", reason: "Provides pre-trained models for text, vision, and more.", difficulty: 3, xp: 100 },
      { title: "LangChain", reason: "Framework for connecting LLMs with tools, databases, and APIs.", difficulty: 4, xp: 120 },
      { title: "Transfer Learning", reason: "Speeds up training by reusing knowledge from pre-trained models.", difficulty: 4, xp: 120 },
      { title: "LoRA & PEFT", reason: "Fine-tune huge models efficiently without retraining everything.", difficulty: 5, xp: 150 },
    ],
  },
  {
    phase: "Phase 5: Projects & Deployment",
    icon: "🎯",
    color: "from-indigo-500 to-blue-600",
    topics: [
      { title: "Domain-Specific Chatbots", reason: "Build specialized assistants (e.g., healthcare, coding, legal).", difficulty: 4, xp: 120 },
      { title: "AI Text Summarizer", reason: "Converts long text into short meaningful summaries.", difficulty: 3, xp: 100 },
      { title: "Text-to-Image Generators (Stable Diffusion, DALL-E)", reason: "Create images from prompts, bridging text & vision AI.", difficulty: 4, xp: 120 },
      { title: "Deployment", reason: "Package and deploy AI models as APIs, apps, or services.", difficulty: 4, xp: 120 },
    ],
  },
];

interface UserData {
  username: string;
  completedTopics: Set<string>;
  totalXP: number;
  level: number;
  currentStreak: number;
  lastCompletedDate: string | null;
  joinDate: string;
  totalTopicsCompleted: number;
  averageDifficulty: number;
  streakHistory: number[];
  longestStreak: number;
  streakMilestones: Set<number>;
  lastStreakCheck: string;
}

interface UserDataStorage {
  username: string;
  completedTopics: string[];
  totalXP: number;
  level: number;
  currentStreak: number;
  lastCompletedDate: string | null;
  joinDate: string;
  totalTopicsCompleted: number;
  averageDifficulty: number;
  streakHistory: number[];
  longestStreak: number;
  streakMilestones: number[];
  lastStreakCheck: string;
}

export default function AIRoadmap() {
  const [openPhase, setOpenPhase] = useState<number | null>(null);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [xpGained, setXpGained] = useState<{ amount: number; x: number; y: number } | null>(null);
  const [levelUp, setLevelUp] = useState(false);
  
  // User authentication states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  // Enhanced streak tracking
  const [streakHistory, setStreakHistory] = useState<number[]>([]);
  const [longestStreak, setLongestStreak] = useState(0);
  const [streakMilestones, setStreakMilestones] = useState<Set<number>>(new Set());
  const [lastStreakCheck, setLastStreakCheck] = useState<string>('');
  const [showStreakCelebration, setShowStreakCelebration] = useState<{ milestone: number; show: boolean }>({ milestone: 0, show: false });
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aiRoadmapUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUsername(user.username);
      setCompletedTopics(new Set(user.completedTopics));
      setTotalXP(user.totalXP);
      setLevel(user.level);
      setCurrentStreak(user.currentStreak);
      setLastCompletedDate(user.lastCompletedDate);
      
      // Initialize enhanced streak tracking
      setStreakHistory(user.streakHistory || []);
      setLongestStreak(user.longestStreak || 0);
      setStreakMilestones(new Set(user.streakMilestones || []));
      setLastStreakCheck(user.lastStreakCheck || '');
      
      setUserData({
        ...user,
        completedTopics: new Set(user.completedTopics),
        streakHistory: user.streakHistory || [],
        longestStreak: user.longestStreak || 0,
        streakMilestones: new Set(user.streakMilestones || []),
        lastStreakCheck: user.lastStreakCheck || ''
      });
    }
    // Set loading to false after checking localStorage
    setIsLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn && username) {
      const userDataToSave: UserDataStorage = {
        username,
        completedTopics: Array.from(completedTopics),
        totalXP,
        level,
        currentStreak,
        lastCompletedDate,
        joinDate: userData?.joinDate || new Date().toISOString(),
        totalTopicsCompleted: completedTopics.size,
        averageDifficulty: calculateAverageDifficulty(),
        streakHistory: streakHistory,
        longestStreak: longestStreak,
        streakMilestones: Array.from(streakMilestones),
        lastStreakCheck: lastStreakCheck
      };
      
      localStorage.setItem('aiRoadmapUser', JSON.stringify(userDataToSave));
      setUserData({
        ...userDataToSave,
        completedTopics: new Set(userDataToSave.completedTopics),
        streakMilestones: new Set(userDataToSave.streakMilestones)
      });
    }
  }, [isLoggedIn, username, completedTopics, totalXP, level, currentStreak, lastCompletedDate, streakHistory, longestStreak, streakMilestones, lastStreakCheck]);

  const calculateAverageDifficulty = () => {
    if (completedTopics.size === 0) return 0;
    let totalDifficulty = 0;
    let count = 0;
    
    completedTopics.forEach(topicKey => {
      const [phaseIndex, topicIndex] = topicKey.split('-').map(Number);
      if (roadmap[phaseIndex]?.topics[topicIndex]) {
        totalDifficulty += roadmap[phaseIndex].topics[topicIndex].difficulty;
        count++;
      }
    });
    
    return count > 0 ? Math.round((totalDifficulty / count) * 10) / 10 : 0;
  };

  const handleLogin = (newUsername: string) => {
    if (newUsername.trim()) {
      setUsername(newUsername.trim());
      setIsLoggedIn(true);
      setShowLoginModal(false);
      
      // Initialize new user data
      const newUserData: UserData = {
        username: newUsername.trim(),
        completedTopics: new Set(),
        totalXP: 0,
        level: 1,
        currentStreak: 0,
        lastCompletedDate: null,
        joinDate: new Date().toISOString(),
        totalTopicsCompleted: 0,
        averageDifficulty: 0,
        streakHistory: [],
        longestStreak: 0,
        streakMilestones: new Set(),
        lastStreakCheck: new Date().toDateString()
      };
      
      setUserData(newUserData);
      setCompletedTopics(new Set());
      setTotalXP(0);
      setLevel(1);
      setCurrentStreak(0);
      setLastCompletedDate(null);
      setStreakHistory([]);
      setLongestStreak(0);
      setStreakMilestones(new Set());
      setLastStreakCheck(new Date().toDateString());
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setCompletedTopics(new Set());
    setTotalXP(0);
    setLevel(1);
    setCurrentStreak(0);
    setLastCompletedDate(null);
    setUserData(null);
    localStorage.removeItem('aiRoadmapUser');
  };

  // Calculate level based on XP
  useEffect(() => {
    const newLevel = Math.floor(totalXP / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setLevelUp(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setLevelUp(false);
      }, 3000);
    } else if (newLevel < level) {
      setLevel(newLevel);
    }
  }, [totalXP, level]);

  // Enhanced streak tracking with auto-updates
  useEffect(() => {
    const checkAndUpdateStreak = () => {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
      
      // Only check once per day
      if (lastStreakCheck === today) return;
      
      if (lastCompletedDate === today) {
        // Completed something today, continue streak
        setLastStreakCheck(today);
      } else if (lastCompletedDate === yesterday) {
        // Completed something yesterday, increment streak
        setCurrentStreak(prev => {
          const newStreak = prev + 1;
          updateStreakStats(newStreak);
          return newStreak;
        });
        setLastStreakCheck(today);
      } else if (lastCompletedDate && lastCompletedDate !== today && lastCompletedDate !== yesterday) {
        // Missed a day, reset streak
        setCurrentStreak(0);
        setLastStreakCheck(today);
      }
    };

    // Check streak immediately
    checkAndUpdateStreak();
    
    // Set up daily check at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const midnightTimer = setTimeout(checkAndUpdateStreak, timeUntilMidnight);
    
    // Also check every hour as backup
    const hourlyTimer = setInterval(checkAndUpdateStreak, 60 * 60 * 1000);
    
    return () => {
      clearTimeout(midnightTimer);
      clearInterval(hourlyTimer);
    };
  }, [lastCompletedDate, lastStreakCheck]);

  const updateStreakStats = (newStreak: number) => {
    // Update longest streak
    if (newStreak > longestStreak) {
      setLongestStreak(newStreak);
    }
    
    // Add to streak history
    setStreakHistory(prev => [...prev, newStreak]);
    
    // Check for milestones
    const milestones = [7, 14, 30, 60, 100, 365];
    milestones.forEach(milestone => {
      if (newStreak === milestone && !streakMilestones.has(milestone)) {
        setStreakMilestones(prev => new Set([...prev, milestone]));
        // Show streak milestone celebration
        setShowStreakCelebration({ milestone, show: true });
        setTimeout(() => setShowStreakCelebration({ milestone: 0, show: false }), 4000);
      }
    });
  };

  const toggleTopicCompletion = (phaseIndex: number, topicIndex: number, event: React.MouseEvent) => {
    const topicKey = `${phaseIndex}-${topicIndex}`;
    const newCompleted = new Set(completedTopics);
    const topic = roadmap[phaseIndex].topics[topicIndex];
    
    if (newCompleted.has(topicKey)) {
      newCompleted.delete(topicKey);
      setTotalXP(prev => prev - topic.xp);
    } else {
      newCompleted.add(topicKey);
      setTotalXP(prev => prev + topic.xp);
      setLastCompletedDate(new Date().toDateString());
      
      // Show XP gained animation
      const rect = event.currentTarget.getBoundingClientRect();
      setXpGained({
        amount: topic.xp,
        x: rect.left + rect.width / 2,
        y: rect.top
      });
      
      setTimeout(() => setXpGained(null), 1500);
    }
    
    setCompletedTopics(newCompleted);
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={`${i < difficulty ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} transition-colors`}
      />
    ));
  };

  const getProgressPercentage = () => {
    const totalTopics = roadmap.reduce((acc, phase) => acc + phase.topics.length, 0);
    return Math.round((completedTopics.size / totalTopics) * 100);
  };

  // Login Modal Component
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">🚀 Welcome to AI Roadmap!</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Write First Letter of your Name!"
              className={`w-full p-3 rounded-lg border-2 transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400' 
                  : 'bg-gray-50 border-gray-300 focus:border-blue-400'
              }`}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin(username)}
            />
          </div>
          <button
            onClick={() => handleLogin(username)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Start Learning Journey
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Modal Component
  const ProfileModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-2xl font-bold mb-6 text-center">👤 {username}&apos;s Profile</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <div className="text-2xl font-bold text-blue-600">{totalXP}</div>
              <div className="text-sm text-blue-600">Total XP</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
              <div className="text-2xl font-bold text-green-600">{level}</div>
              <div className="text-sm text-green-600">Current Level</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <div className="text-2xl font-bold text-purple-600">{completedTopics.size}</div>
              <div className="text-sm text-purple-600">Topics Completed</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
              <div className="text-2xl font-bold text-orange-600">{currentStreak}</div>
              <div className="text-sm text-orange-600">Current Streak</div>
            </div>
          </div>
          
          {/* Enhanced Streak Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
              <div className="text-2xl font-bold text-indigo-600">{longestStreak}</div>
              <div className="text-sm text-indigo-600">Longest Streak</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-pink-50 dark:bg-pink-900/20">
              <div className="text-2xl font-bold text-pink-600">{streakMilestones.size}</div>
              <div className="text-sm text-pink-600">Milestones Hit</div>
            </div>
          </div>
          
          {/* Streak Milestones */}
          {streakMilestones.size > 0 && (
            <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
              <div className="text-lg font-semibold text-yellow-700">🏆 Streak Milestones</div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {Array.from(streakMilestones).sort((a, b) => a - b).map(milestone => (
                  <span key={milestone} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
                    {milestone} days
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="text-lg font-semibold">Average Difficulty</div>
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-300">{userData?.averageDifficulty || 0}/5</div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
          >
            <LogOut className="inline mr-2" size={20} />
            Logout
          </button>
        </div>
        <button
          onClick={() => setShowProfileModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );

  // Show loading spinner while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading your learning journey...</h2>
          <p className="text-gray-500 mt-2">Please wait while we restore your progress</p>
        </div>
      </div>
    );
  }

  // Show login modal if not logged in
  if (!isLoggedIn) {
    return <LoginModal />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
      {/* Header with Stats */}
      <div className={`sticky top-0 z-50 backdrop-blur-md ${darkMode ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b transition-all duration-300`}>
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🚀 AI Learning Roadmap
              </h1>
              <div className="flex items-center space-x-2">
                <Trophy className={`text-yellow-500 transition-all duration-500 ${levelUp ? 'scale-125 animate-bounce' : ''}`} size={24} />
                <span className={`font-semibold transition-all duration-500 ${levelUp ? 'text-yellow-500 scale-110' : ''}`}>
                  Level {level}
                </span>
                {levelUp && (
                  <span className="text-yellow-500 font-bold animate-pulse">↑</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* User Profile Button */}
              <button
                onClick={() => setShowProfileModal(true)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <User size={20} />
                <span className="font-semibold">{username}</span>
              </button>
              
              {/* XP Display */}
              <div className="flex items-center space-x-2">
                <Zap className="text-yellow-500" size={20} />
                <span className="font-semibold">{totalXP} XP</span>
              </div>
              
              {/* Streak */}
              <div className="flex items-center space-x-2">
                <div className="text-orange-500">🔥</div>
                <span className="font-semibold">{currentStreak} day streak</span>
              </div>
              
              {/* Progress */}
              <div className="flex items-center space-x-2">
                <Target className="text-green-500" size={20} />
                <span className="font-semibold">{getProgressPercentage()}%</span>
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
          
          {/* Progress Bars */}
          <div className="mt-4 space-y-2">
            {/* Overall Progress */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            
            {/* Level Progress */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${(totalXP % 100)}%` }}
              />
            </div>
            <div className="text-xs text-gray-500 text-center">
              {totalXP % 100}/100 XP to Level {level + 1}
            </div>
          </div>
        </div>
      </div>

      {/* XP Gained Animation */}
      {xpGained && (
        <div 
          className="fixed pointer-events-none z-50 text-yellow-500 font-bold text-2xl animate-bounce"
          style={{
            left: xpGained.x,
            top: xpGained.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          +{xpGained.amount} XP
        </div>
      )}

      {/* Streak Milestone Celebration */}
      {showStreakCelebration.show && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-2xl animate-in zoom-in duration-500 text-center">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-3xl font-bold mb-2">Streak Milestone!</h2>
            <p className="text-xl">{showStreakCelebration.milestone} Day Streak!</p>
            <div className="text-sm mt-2 opacity-90">Keep up the amazing work!</div>
          </div>
        </div>
      )}

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '⭐', '🏆', '🚀'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {roadmap.map((phase, phaseIndex) => (
          <Card 
            key={phaseIndex} 
            className={`shadow-xl border-2 transition-all duration-500 hover:scale-[1.02] ${
              darkMode 
                ? 'bg-gray-800 border-gray-600 hover:border-gray-500' 
                : 'bg-white border-blue-200 hover:border-blue-300'
            } ${openPhase === phaseIndex ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}
          >
            <CardContent className="p-6">
              <div
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => setOpenPhase(openPhase === phaseIndex ? null : phaseIndex)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl transition-transform duration-300 group-hover:scale-110 ${openPhase === phaseIndex ? 'animate-bounce' : ''}`}>
                    {phase.icon}
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent transition-all duration-300`}>
                      {phase.phase}
                    </h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-gray-500">
                        {phase.topics.filter((_, i) => completedTopics.has(`${phaseIndex}-${i}`)).length}/{phase.topics.length} completed
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`transition-transform duration-300 ${openPhase === phaseIndex ? 'rotate-180' : ''}`}>
                    {openPhase === phaseIndex ? <ChevronDown size={28} /> : <ChevronRight size={28} />}
                  </div>
                </div>
              </div>

              {openPhase === phaseIndex && (
                <div className="mt-6 space-y-4 animate-in slide-in-from-top-2 duration-500">
                  {phase.topics.map((topic, topicIndex) => {
                    const topicKey = `${phaseIndex}-${topicIndex}`;
                    const isCompleted = completedTopics.has(topicKey);
                    
                    return (
                      <div 
                        key={topicIndex}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                          isCompleted 
                            ? 'border-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' 
                            : darkMode 
                              ? 'border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600' 
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => setOpenTopic(openTopic === topicKey ? null : topicKey)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTopicCompletion(phaseIndex, topicIndex, e);
                              }}
                              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                                isCompleted 
                                  ? 'bg-green-500 text-white hover:bg-green-600' 
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500'
                              }`}
                            >
                              {isCompleted ? <CheckCircle size={20} /> : <Play size={20} />}
                            </button>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className={`font-semibold ${isCompleted ? 'line-through text-green-600' : ''}`}>
                                  📌 {topic.title}
                                </span>
                                {isCompleted && <span className="text-green-500">✓</span>}
                              </div>
                              
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex space-x-1">
                                  {getDifficultyStars(topic.difficulty)}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {topic.xp} XP
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <div className={`transition-transform duration-300 ${openTopic === topicKey ? 'rotate-180' : ''}`}>
                              {openTopic === topicKey ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                            </div>
                          </div>
                        </div>
                        
                        {openTopic === topicKey && (
                          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg animate-in slide-in-from-top-2 duration-300">
                            <p className="dark:text-white light:text-black">
                              👉 {topic.reason}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <BookOpen size={16} className="text-blue-500" />
                                <span className="text-sm text-blue-600 dark:text-blue-400">
                                  Click the {isCompleted ? 'pause' : 'play'} button to mark as {isCompleted ? 'incomplete' : 'complete'}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Completion Celebration */}
        {getProgressPercentage() === 100 && (
          <div className="text-center py-12 animate-in zoom-in duration-1000">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-green-600 mb-2">Congratulations!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              You&apos;ve completed the entire AI Learning Roadmap! You&apos;re now ready to build amazing AI applications.
            </p>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {showProfileModal && <ProfileModal />}
    </div>
  );
}
