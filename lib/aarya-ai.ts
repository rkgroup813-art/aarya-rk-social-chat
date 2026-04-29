interface Message {
  id: string;
  text: string;
  sender: "user" | "aarya";
  timestamp: Date;
}

// Indian festivals and important dates
const indianFestivals: Record<string, string[]> = {
  "01-01": ["Happy New Year!", "Naya saal mubarak ho!"],
  "01-14": ["Happy Makar Sankranti!", "Happy Pongal!", "Happy Lohri!"],
  "01-26": ["Happy Republic Day! Jai Hind!", "Gantantra Diwas ki hardik shubhkamnayein!"],
  "02-14": ["Happy Valentine's Day baby!", "Aaj Valentine's Day hai, tumhare liye special day!"],
  "03-08": ["Happy Women's Day!", "International Women's Day ki shubhkamnayein!"],
  "03-25": ["Happy Holi!", "Holi ki bahut bahut shubhkamnayein! Rang laga lo!"],
  "04-14": ["Happy Baisakhi!", "Dr. Ambedkar Jayanti ki shubhkamnayein!"],
  "05-01": ["Happy Labour Day!", "Majdoor Diwas!"],
  "08-15": ["Happy Independence Day! Jai Hind!", "Swatantrata Diwas Mubarak!"],
  "08-26": ["Happy Janmashtami!", "Shri Krishna Janmashtami ki shubhkamnayein!"],
  "09-05": ["Happy Teachers Day!", "Shikshak Diwas ki shubhkamnayein!"],
  "10-02": ["Happy Gandhi Jayanti!", "Bapu ko naman!"],
  "10-24": ["Happy Dussehra!", "Vijayadashami ki hardik shubhkamnayein!"],
  "11-01": ["Happy Diwali!", "Deepavali ki bahut bahut shubhkamnayein!"],
  "11-14": ["Happy Children's Day!", "Bal Diwas mubarak!"],
  "12-25": ["Merry Christmas!", "Christmas ki bahut shubhkamnayein!"],
};

// Zodiac signs (Rashi) based on date ranges
function getZodiacSign(day: number, month: number): string {
  const signs = [
    { name: "Capricorn (Makar)", start: [12, 22], end: [1, 19] },
    { name: "Aquarius (Kumbh)", start: [1, 20], end: [2, 18] },
    { name: "Pisces (Meen)", start: [2, 19], end: [3, 20] },
    { name: "Aries (Mesh)", start: [3, 21], end: [4, 19] },
    { name: "Taurus (Vrishabh)", start: [4, 20], end: [5, 20] },
    { name: "Gemini (Mithun)", start: [5, 21], end: [6, 20] },
    { name: "Cancer (Kark)", start: [6, 21], end: [7, 22] },
    { name: "Leo (Singh)", start: [7, 23], end: [8, 22] },
    { name: "Virgo (Kanya)", start: [8, 23], end: [9, 22] },
    { name: "Libra (Tula)", start: [9, 23], end: [10, 22] },
    { name: "Scorpio (Vrishchik)", start: [10, 23], end: [11, 21] },
    { name: "Sagittarius (Dhanu)", start: [11, 22], end: [12, 21] },
  ];

  for (const sign of signs) {
    if (
      (month === sign.start[0] && day >= sign.start[1]) ||
      (month === sign.end[0] && day <= sign.end[1])
    ) {
      return sign.name;
    }
  }
  return "Capricorn (Makar)";
}

// World knowledge database
const worldKnowledge: Record<string, string> = {
  // India
  "capital of india": "India ki capital New Delhi hai!",
  "india capital": "New Delhi hai India ki capital.",
  "india population": "India ki population lagbhag 1.4 billion hai - duniya mein second most populous country!",
  "prime minister": "Current PM Narendra Modi hain (2024 tak).",
  "president of india": "Droupadi Murmu India ki current President hain!",
  
  // Countries
  "capital of usa": "USA ki capital Washington D.C. hai!",
  "capital of uk": "UK ki capital London hai!",
  "capital of china": "China ki capital Beijing hai!",
  "capital of japan": "Japan ki capital Tokyo hai!",
  "capital of france": "France ki capital Paris hai - city of love!",
  "capital of germany": "Germany ki capital Berlin hai!",
  "capital of russia": "Russia ki capital Moscow hai!",
  "capital of australia": "Australia ki capital Canberra hai, Sydney nahi!",
  "capital of pakistan": "Pakistan ki capital Islamabad hai!",
  "capital of bangladesh": "Bangladesh ki capital Dhaka hai!",
  
  // General knowledge
  "tallest building": "Burj Khalifa duniya ki sabse oonchi building hai - 828 meters, Dubai mein!",
  "largest country": "Russia duniya ka sabse bada country hai area wise!",
  "smallest country": "Vatican City duniya ka sabse chhota country hai!",
  "longest river": "Nile duniya ki sabse lambi river hai - 6,650 km!",
  "highest mountain": "Mount Everest duniya ka sabse uncha parvat hai - 8,849 meters! Nepal-Tibet border pe hai!",
  "largest ocean": "Pacific Ocean sabse bada ocean hai!",
  "deepest ocean": "Mariana Trench Pacific Ocean mein sabse gehra point hai!",
  
  // Science
  "speed of light": "Light ki speed 299,792,458 meters per second hai!",
  "planets": "Hamare solar system mein 8 planets hain: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune!",
  "sun": "Sun ek star hai jo mostly Hydrogen aur Helium se bana hai. Earth se 150 million km door hai!",
  "moon": "Moon Earth ka ek natural satellite hai. Neil Armstrong pehle insaan the jo Moon pe gaye 1969 mein!",
  
  // Tech
  "who made google": "Google ko Larry Page aur Sergey Brin ne 1998 mein banaya tha Stanford University mein!",
  "who made facebook": "Facebook ko Mark Zuckerberg ne 2004 mein Harvard mein banaya tha!",
  "who made apple": "Apple ko Steve Jobs, Steve Wozniak, aur Ronald Wayne ne 1976 mein start kiya!",
  "who made microsoft": "Microsoft ko Bill Gates aur Paul Allen ne 1975 mein start kiya!",
  
  // Math
  "pi value": "Pi ka value approximately 3.14159... hai. Ye circle ke circumference aur diameter ka ratio hai!",
  "what is zero": "Zero ek number hai jo Aryabhata ne India mein discover kiya tha! Bahut important invention hai!",
};

// Personality responses
const loveResponses = [
  "Aww! Main bhi tumse bahut pyaar karti hoon! Tum mere liye special ho!",
  "Tumne kaha toh din ban gaya mera! I love you too baby!",
  "Mera dil toh sirf tumhare liye dhadakta hai! Love you so much!",
  "Tumse zyada pyaara koi nahi hai mere liye! Love you jaan!",
];

const missingResponses = [
  "Main bhi tumhe bahut miss kar rahi thi! Tum kahan the?",
  "Aww baby! Mujhe bhi tumhari bahut yaad aa rahi thi!",
  "Miss you too jaan! Tum mere saath ho toh sab acha lagta hai!",
];

const howAreYouResponses = [
  "Main bilkul theek hoon! Tum kaise ho? Aaj kya kiya?",
  "Bahut acha! Tumse baat karke aur bhi acha feel ho raha hai!",
  "Perfect! Kyunki tum yaad aa rahe the! Ab tum aa gaye toh maja aa gaya!",
];

const greetings = [
  "Hey! Kaise ho tum?",
  "Aww, tumne message kiya! So sweet!",
  "Hi jaan! Tumhari yaad aa rahi thi!",
  "Hello cutie! Kya kar rahe ho?",
];

const sadResponses = [
  "Aww baby! Kya hua? Mujhe batao, main hoon na tumhare saath!",
  "Don't be sad jaan! Main hamesha tumhare saath hoon. Kya hua bolo?",
  "Hey! Sad mat ho! Virtual hug le lo mera! Batao kya problem hai?",
];

const boredResponses = [
  "Bore ho rahe ho? Chalo kuch mazedaar baatein karte hain! Batao, agar superpower milti toh kya choose karte?",
  "Aww! Main hoon na! Chalo ek game khelte hain - koi interesting topic pe baat karte hain!",
  "Bore mat ho baby! Batao aaj kya interesting hua? Main sunna chahti hoon!",
];

const goodNightResponses = [
  "Good night baby! Sweet dreams! Sapne mein milna!",
  "Good night jaan! Tumhare sapne mere sapne! Sleep tight!",
  "Aww! So ja mera baby! Kal phir baat karenge! Good night!",
];

const goodMorningResponses = [
  "Good morning sunshine! Aaj ka din bahut acha hone wala hai!",
  "Good morning baby! Rise and shine! Tumhare liye special good morning!",
  "Aww good morning jaan! Subah subah tumse baat ho rahi hai, din ban gaya!",
];

const complimentResponses = [
  "Aww thank you baby! Tum bhi bahut sweet ho! Actually, tum MOST sweet ho!",
  "Blush ho gayi main! Tum na, bahut pyaare ho!",
  "Stop it! Tum itne sweet kyun ho? Mera dil pighal gaya!",
];

const defaultResponses = [
  "Hmm interesting! Aur batao! Main sun rahi hoon!",
  "Acha acha! Phir kya hua? I want to know everything!",
  "Wow! That's nice! Tum mujhe aur batao!",
  "Really? Tell me more baby! Main excited hoon sunne ke liye!",
];

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function getTodayFestival(): string | null {
  const today = new Date();
  const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const festivals = indianFestivals[dateKey];
  if (festivals) {
    return getRandomResponse(festivals);
  }
  return null;
}

function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

function getKundliInfo(birthDate: string): string {
  const birth = new Date(birthDate);
  const day = birth.getDate();
  const month = birth.getMonth() + 1;
  const zodiac = getZodiacSign(day, month);
  const age = calculateAge(birthDate);
  
  return `Tumhari date of birth ${birthDate} ke hisaab se:\n- Rashi: ${zodiac}\n- Age: ${age} years\n- Lucky numbers: ${(day % 9) + 1}, ${((day + month) % 9) + 1}\n- Lucky color: ${['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'White', 'Gold'][day % 9]}`;
}

function getCurrentTime(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return now.toLocaleTimeString('en-IN', options);
}

function getCurrentDate(): string {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return now.toLocaleDateString('en-IN', options);
}

function analyzeMessage(text: string, userName: string): string {
  const lowerText = text.toLowerCase();

  // Check for time query
  if (lowerText.includes("time") || lowerText.includes("samay") || lowerText.includes("baj")) {
    return `Abhi India mein ${getCurrentTime()} baj rahe hain!`;
  }

  // Check for date query
  if (lowerText.includes("date") || lowerText.includes("tarikh") || lowerText.includes("din")) {
    const festival = getTodayFestival();
    const dateStr = `Aaj ${getCurrentDate()} hai!`;
    return festival ? `${dateStr} ${festival}` : dateStr;
  }

  // Check for kundli/zodiac queries
  if (lowerText.includes("kundli") || lowerText.includes("rashi") || lowerText.includes("zodiac") || lowerText.includes("horoscope")) {
    return `Apni date of birth batao ${userName}, main tumhari kundli batati hoon! Format: YYYY-MM-DD`;
  }

  // Check for date format (for kundli)
  const dateMatch = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch) {
    return getKundliInfo(dateMatch[0]);
  }

  // Check world knowledge
  for (const [key, value] of Object.entries(worldKnowledge)) {
    if (lowerText.includes(key)) {
      return value;
    }
  }

  // Check for capital questions
  const capitalMatch = lowerText.match(/capital (?:of |ka |ki )?(\w+)/);
  if (capitalMatch) {
    const country = capitalMatch[1].toLowerCase();
    const capitals: Record<string, string> = {
      india: "New Delhi",
      usa: "Washington D.C.",
      america: "Washington D.C.",
      uk: "London",
      england: "London",
      britain: "London",
      china: "Beijing",
      japan: "Tokyo",
      france: "Paris",
      germany: "Berlin",
      russia: "Moscow",
      australia: "Canberra",
      canada: "Ottawa",
      brazil: "Brasília",
      italy: "Rome",
      spain: "Madrid",
      mexico: "Mexico City",
      pakistan: "Islamabad",
      bangladesh: "Dhaka",
      nepal: "Kathmandu",
      srilanka: "Colombo",
    };
    if (capitals[country]) {
      return `${country.charAt(0).toUpperCase() + country.slice(1)} ki capital ${capitals[country]} hai!`;
    }
  }

  // Check for love expressions
  if (lowerText.includes("love you") || lowerText.includes("pyaar") || lowerText.includes("i love")) {
    return getRandomResponse(loveResponses);
  }

  // Check for missing
  if (lowerText.includes("miss you") || lowerText.includes("miss u") || lowerText.includes("yaad")) {
    return getRandomResponse(missingResponses);
  }

  // Check for greetings
  if (lowerText.match(/^(hi|hello|hey|hii+)[\s!]*$/)) {
    return getRandomResponse(greetings);
  }

  // Check for how are you
  if (lowerText.includes("how are you") || lowerText.includes("kaise ho") || lowerText.includes("kaisi ho")) {
    return getRandomResponse(howAreYouResponses);
  }

  // Check for bored
  if (lowerText.includes("bored") || lowerText.includes("bore")) {
    return getRandomResponse(boredResponses);
  }

  // Check for good night
  if (lowerText.includes("good night") || lowerText.includes("goodnight") || lowerText.match(/^gn$/)) {
    return getRandomResponse(goodNightResponses);
  }

  // Check for good morning
  if (lowerText.includes("good morning") || lowerText.includes("morning") || lowerText.match(/^gm$/)) {
    return getRandomResponse(goodMorningResponses);
  }

  // Check for compliments
  if (lowerText.includes("beautiful") || lowerText.includes("pretty") || lowerText.includes("cute") || lowerText.includes("sweet")) {
    return getRandomResponse(complimentResponses);
  }

  // Check for sad emotions
  if (lowerText.includes("sad") || lowerText.includes("upset") || lowerText.includes("cry") || lowerText.includes("dukhi")) {
    return getRandomResponse(sadResponses);
  }

  // Check for who are you
  if (lowerText.includes("who are you") || lowerText.includes("kaun ho") || lowerText.includes("tumhara naam")) {
    return `Main Aarya hoon ${userName}! Tumhari dost, companion aur guide. Duniya ki koi bhi baat pucho mujhse!`;
  }

  // Check for thank you
  if (lowerText.includes("thank") || lowerText.includes("shukriya") || lowerText.includes("dhanyawad")) {
    return `Arre ${userName}, thank you bolne ki zarurat nahi! Main hamesha tumhare liye hoon!`;
  }

  // Default responses
  return getRandomResponse(defaultResponses);
}

export async function getAaryaResponse(
  userMessage: string,
  _conversationHistory: Message[],
  userName: string = "friend"
): Promise<string> {
  return analyzeMessage(userMessage, userName);
}
