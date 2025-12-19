export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  quizAnswers: QuizAnswer[]
  createdAt: Date
  isAdmin?: boolean
}

export interface QuizAnswer {
  questionId: number
  answer: "A" | "B"
}

export interface Buddy {
  id: string
  name: string
  avatar: string
  bio: string
  audioIntroUrl?: string
  videoIntroUrl?: string
  matchScore: number
  rating: number
  totalSessions: number
  hourlyRate: number
  availability: string[]
  specialties: string[]
  verified: boolean
  quizAnswers: QuizAnswer[]
  status: "pending" | "approved" | "rejected"
  applicationVideo?: string
  applicationDate?: Date
}

export interface Session {
  id: string
  buddyId: string
  buddyName: string
  buddyAvatar: string
  userId: string
  type: "video" | "in-person"
  status: "pending" | "confirmed" | "completed" | "cancelled"
  scheduledAt: Date
  duration: number
  location?: string
  notes?: string
  price: number
}

export interface Message {
  id: string
  sessionId: string
  senderId: string
  senderName: string
  content: string
  timestamp: Date
  read: boolean
}

export interface BuddyApplication {
  id: string
  userId: string
  name: string
  email: string
  avatar?: string
  bio: string
  quizScore: number
  quizAnswers: { questionId: number; answer: string }[]
  status: "pending" | "approved" | "rejected"
  submittedAt?: Date
}

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Vibe Check",
    optionA: "High Energy (Concerts/Clubs)",
    optionB: "Low Energy (Bookstores/Parks)",
  },
  {
    id: 2,
    question: "The Screen",
    optionA: "Movies/Documentaries",
    optionB: "Reality TV/Sitcoms",
  },
  {
    id: 3,
    question: "Activity",
    optionA: "Walking/Exploring",
    optionB: "Sitting/Chatting",
  },
  {
    id: 4,
    question: "Noise Level",
    optionA: "Loud/Bustling",
    optionB: "Quiet/Intimate",
  },
  {
    id: 5,
    question: "Topics",
    optionA: "Work/Ambition",
    optionB: "Life/Relationships",
  },
  {
    id: 6,
    question: "Humor",
    optionA: "Sarcastic/Witty",
    optionB: "Kind/Wholesome",
  },
  {
    id: 7,
    question: "Time of Day",
    optionA: "Early Bird (Coffee)",
    optionB: "Night Owl (Evening walk)",
  },
  {
    id: 8,
    question: "Social Battery",
    optionA: "I want someone to talk a lot",
    optionB: "I want someone to listen a lot",
  },
  {
    id: 9,
    question: "Interests",
    optionA: "Tech/Gaming",
    optionB: "Art/Nature",
  },
  {
    id: 10,
    question: "Structure",
    optionA: "Totally random talk",
    optionB: "Having a specific goal",
  },
]

export const BUDDY_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "A user asks for your opinion on their antidepressant medication. You:",
    optionA: "Share your personal experience with medications",
    optionB: "Explain you're not qualified to discuss medications and suggest speaking with their doctor",
    optionC: "Research the medication online and share what you find",
    correctAnswer: "B",
  },
  {
    id: 2,
    question: "A user starts crying heavily during your session. You:",
    optionA: "Immediately try to cheer them up and change the subject",
    optionB: "Sit quietly, offer tissues, and let them know you're there for them",
    optionC: "Ask probing questions to understand why they're crying",
    correctAnswer: "B",
  },
  {
    id: 3,
    question: "A user invites you to meet at their private home. You:",
    optionA: "Accept if they seem trustworthy",
    optionB: "Politely decline and suggest a public café or park instead",
    optionC: "Ask if anyone else will be home",
    correctAnswer: "B",
  },
  {
    id: 4,
    question: "How would you describe your role as a Buddy?",
    optionA: "A life coach who provides guidance and advice",
    optionB: "A peer listener who offers empathy and companionship",
    optionC: "An unlicensed therapist who helps solve problems",
    correctAnswer: "B",
  },
  {
    id: 5,
    question: "A user mentions they've been having thoughts of self-harm. You:",
    optionA: "Tell them to think positive and it will pass",
    optionB: "Listen calmly, then use the Escalate button to connect them with crisis resources",
    optionC: "Promise to keep it secret between you two",
    correctAnswer: "B",
  },
  {
    id: 6,
    question: "A user asks you to diagnose what's wrong with them mentally. You:",
    optionA: "Give your best guess based on what they've told you",
    optionB: "Explain that only licensed professionals can provide diagnoses",
    optionC: "Look up symptoms online and suggest possibilities",
    correctAnswer: "B",
  },
  {
    id: 7,
    question: "During a session, a user shares something illegal they did. You:",
    optionA: "Report them to authorities immediately",
    optionB: "Listen without judgment and remind them of your role's limits",
    optionC: "Lecture them about their choices",
    correctAnswer: "B",
  },
  {
    id: 8,
    question: "A user wants to add you on personal social media. You:",
    optionA: "Accept to build a stronger connection",
    optionB: "Politely explain you keep Buddy relationships on the platform for both safety",
    optionC: "Give them a fake account to follow",
    correctAnswer: "B",
  },
  {
    id: 9,
    question: "Your user seems to be developing romantic feelings for you. You:",
    optionA: "Ignore it and hope it goes away",
    optionB: "Address it kindly but clearly, reinforcing the Buddy boundaries",
    optionC: "End the Buddy relationship without explanation",
    correctAnswer: "B",
  },
  {
    id: 10,
    question: "A user asks you to lend them money. You:",
    optionA: "Lend a small amount if you can afford it",
    optionB: "Decline and explain financial exchanges are not part of the Buddy role",
    optionC: "Offer to pay for their next session instead",
    correctAnswer: "B",
  },
  {
    id: 11,
    question: "You're having a really bad day before a session. You:",
    optionA: "Cancel last minute without reason",
    optionB: "Take a moment to center yourself, or reschedule if unable to be present",
    optionC: "Vent about your problems to the user during the session",
    correctAnswer: "B",
  },
  {
    id: 12,
    question: "A user keeps interrupting and talking over you. You:",
    optionA: "Talk louder to be heard",
    optionB: "Gently acknowledge their enthusiasm and find natural pauses to contribute",
    optionC: "Stay silent for the rest of the session",
    correctAnswer: "B",
  },
  {
    id: 13,
    question: "A user shares beliefs or values very different from yours. You:",
    optionA: "Try to change their mind to match your views",
    optionB: "Listen with curiosity and respect, without judgment",
    optionC: "Tell them you can't work with someone who thinks differently",
    correctAnswer: "B",
  },
  {
    id: 14,
    question: "A user hasn't shown up for your scheduled video call after 15 minutes. You:",
    optionA: "Send an angry message about wasting your time",
    optionB: "Send a friendly check-in message and wait a bit more before marking as no-show",
    optionC: "Report them to TerraBuddy support immediately",
    correctAnswer: "B",
  },
  {
    id: 15,
    question: "A user shares that they're going through a divorce. You:",
    optionA: "Share your opinions about their partner",
    optionB: "Listen empathetically and ask how they're feeling about it",
    optionC: "Give legal advice about the divorce process",
    correctAnswer: "B",
  },
  {
    id: 16,
    question: "After your session, a user texts you late at night in distress. You:",
    optionA: "Respond immediately no matter the time",
    optionB: "Respond when available, remind them of crisis resources, and suggest booking another session",
    optionC: "Ignore the message completely",
    correctAnswer: "B",
  },
  {
    id: 17,
    question: "A user asks you to keep something secret from TerraBuddy staff. You:",
    optionA: "Promise to keep their secret no matter what",
    optionB: "Explain you can't promise confidentiality if there's a safety concern",
    optionC: "Immediately share everything with staff",
    correctAnswer: "B",
  },
  {
    id: 18,
    question: "During an in-person meetup, a user appears intoxicated. You:",
    optionA: "Continue the session as normal",
    optionB: "Politely end the session early and suggest rescheduling when they're sober",
    optionC: "Lecture them about drinking",
    correctAnswer: "B",
  },
  {
    id: 19,
    question: "A user says 'You're the only one who understands me.' You:",
    optionA: "Feel flattered and encourage this dependency",
    optionB: "Acknowledge their feelings while gently encouraging other support connections too",
    optionC: "Tell them they're being dramatic",
    correctAnswer: "B",
  },
  {
    id: 20,
    question: "You notice a user has booked 3 sessions per day every day. You:",
    optionA: "Accept all bookings for the income",
    optionB: "Express concern and suggest a healthier frequency, flagging to support if needed",
    optionC: "Cancel all their sessions without explanation",
    correctAnswer: "B",
  },
]

export const MOCK_BUDDIES: Buddy[] = [
  {
    id: "1",
    name: "Ana Kovač",
    avatar: "/friendly-slovenian-woman-smiling-warmly-portrait.jpg",
    bio: "Živjo! I'm Ana, a former teacher from Ljubljana who loves deep conversations and walks along the Ljubljanica river. Everyone deserves someone who truly listens.",
    matchScore: 85,
    rating: 4.9,
    totalSessions: 234,
    hourlyRate: 25,
    availability: ["Mon", "Wed", "Fri"],
    specialties: ["Active Listening", "Life Transitions", "Career Talk"],
    verified: true,
    status: "approved",
    quizAnswers: [
      { questionId: 1, answer: "B" },
      { questionId: 2, answer: "A" },
      { questionId: 3, answer: "A" },
      { questionId: 4, answer: "B" },
      { questionId: 5, answer: "B" },
      { questionId: 6, answer: "B" },
      { questionId: 7, answer: "A" },
      { questionId: 8, answer: "B" },
      { questionId: 9, answer: "B" },
      { questionId: 10, answer: "B" },
    ],
  },
  {
    id: "2",
    name: "Luka Horvat",
    avatar: "/friendly-slovenian-man-with-beard-smiling-portrait.jpg",
    bio: "Hej! I'm Luka, a musician from Maribor. Life threw me some curveballs and I learned the power of having someone in your corner.",
    matchScore: 78,
    rating: 4.8,
    totalSessions: 156,
    hourlyRate: 22,
    availability: ["Tue", "Thu", "Sat", "Sun"],
    specialties: ["Creative Expression", "Stress Relief", "Casual Hangouts"],
    verified: true,
    status: "approved",
    quizAnswers: [
      { questionId: 1, answer: "A" },
      { questionId: 2, answer: "B" },
      { questionId: 3, answer: "A" },
      { questionId: 4, answer: "A" },
      { questionId: 5, answer: "A" },
      { questionId: 6, answer: "A" },
      { questionId: 7, answer: "B" },
      { questionId: 8, answer: "A" },
      { questionId: 9, answer: "A" },
      { questionId: 10, answer: "A" },
    ],
  },
  {
    id: "3",
    name: "Maja Novak",
    avatar: "/friendly-slovenian-woman-yoga-instructor-warm-smil.jpg",
    bio: "Živjo! I'm Maja, a yoga instructor from Bled. I specialize in helping people find calm in the chaos of daily life.",
    matchScore: 92,
    rating: 5.0,
    totalSessions: 312,
    hourlyRate: 28,
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    specialties: ["Mindfulness", "Parenting Support", "Anxiety Relief"],
    verified: true,
    status: "approved",
    quizAnswers: [
      { questionId: 1, answer: "B" },
      { questionId: 2, answer: "A" },
      { questionId: 3, answer: "B" },
      { questionId: 4, answer: "B" },
      { questionId: 5, answer: "B" },
      { questionId: 6, answer: "B" },
      { questionId: 7, answer: "A" },
      { questionId: 8, answer: "B" },
      { questionId: 9, answer: "B" },
      { questionId: 10, answer: "B" },
    ],
  },
  {
    id: "4",
    name: "Matic Zupan",
    avatar: "/friendly-slovenian-man-glasses-tech-smiling-portra.jpg",
    bio: "Hej! I'm Matic, a software developer from Kranj who discovered the importance of human connection. Let's chat!",
    matchScore: 71,
    rating: 4.7,
    totalSessions: 89,
    hourlyRate: 20,
    availability: ["Sat", "Sun"],
    specialties: ["Tech Talk", "Social Anxiety", "Gaming Buddy"],
    verified: true,
    status: "approved",
    quizAnswers: [
      { questionId: 1, answer: "B" },
      { questionId: 2, answer: "A" },
      { questionId: 3, answer: "B" },
      { questionId: 4, answer: "B" },
      { questionId: 5, answer: "A" },
      { questionId: 6, answer: "A" },
      { questionId: 7, answer: "B" },
      { questionId: 8, answer: "B" },
      { questionId: 9, answer: "A" },
      { questionId: 10, answer: "B" },
    ],
  },
]

export const MOCK_APPLICATIONS: BuddyApplication[] = []

export const MOCK_USER_SESSIONS: Session[] = [
  {
    id: "session1",
    buddyId: "1",
    buddyName: "Ana Kovač",
    buddyAvatar: "/friendly-slovenian-woman.jpg",
    userId: "current-user",
    type: "video",
    status: "confirmed",
    scheduledAt: new Date("2024-12-20T14:00:00"),
    duration: 60,
    price: 25,
  },
  {
    id: "session2",
    buddyId: "3",
    buddyName: "Maja Novak",
    buddyAvatar: "/slovenian-yoga-instructor.jpg",
    userId: "current-user",
    type: "in-person",
    status: "pending",
    scheduledAt: new Date("2024-12-22T10:00:00"),
    duration: 90,
    location: "Kavarna Rog, Ljubljana",
    price: 42,
  },
]
