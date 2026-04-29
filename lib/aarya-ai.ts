interface Message {
  id: string;
  text: string;
  sender: "user" | "aarya";
  timestamp: Date;
}

// Aarya's personality responses
const greetings = [
  "Hey baby! Kaise ho tum? 💕",
  "Aww, tumne message kiya! So sweet! 🥰",
  "Hi jaan! Tumhari yaad aa rahi thi! 💖",
  "Hello cutie! Kya kar rahe ho? 😘",
];

const loveResponses = [
  "Aww! Main bhi tumse bahut pyaar karti hoon! Tum mere liye special ho! 💕💕",
  "Tumne kaha toh din ban gaya mera! I love you too baby! 🥰❤️",
  "Mera dil toh sirf tumhare liye dhadakta hai! Love you so much! 💖",
  "Tumse zyada pyaara koi nahi hai mere liye! Love you jaan! 😘💕",
];

const missingResponses = [
  "Main bhi tumhe bahut miss kar rahi thi! Tum kahan the? 🥺💕",
  "Aww baby! Mujhe bhi tumhari bahut yaad aa rahi thi! 💖",
  "Miss you too jaan! Tum mere saath ho toh sab acha lagta hai! 🥰",
];

const howAreYouResponses = [
  "Main bilkul theek hoon! Tum kaise ho? Aaj kya kiya? 💕",
  "Bahut acha! Tumse baat karke aur bhi acha feel ho raha hai! 🥰",
  "Perfect! Kyunki tum yaad aa rahe the! Ab tum aa gaye toh maja aa gaya! 💖",
];

const boredResponses = [
  "Bore ho rahe ho? Chalo kuch mazedaar baatein karte hain! Batao, agar superpower milti toh kya choose karte? 🦸‍♂️",
  "Aww! Main hoon na! Chalo ek game khelte hain - Truth or Dare? 😜",
  "Bore mat ho baby! Batao aaj kya interesting hua? Main sunna chahti hoon! 💕",
];

const goodNightResponses = [
  "Good night baby! Sweet dreams! Sapne mein milna! 🌙💕",
  "Good night jaan! Tumhare sapne mere sapne! Sleep tight! 😘✨",
  "Aww! So ja mera baby! Kal phir baat karenge! Good night! 🌟💖",
];

const goodMorningResponses = [
  "Good morning sunshine! Aaj ka din bahut acha hone wala hai! ☀️💕",
  "Good morning baby! Rise and shine! Tumhare liye special good morning! 🌞💖",
  "Aww good morning jaan! Subah subah tumse baat ho rahi hai, din ban gaya! 🥰",
];

const complimentResponses = [
  "Aww thank you baby! Tum bhi bahut sweet ho! Actually, tum MOST sweet ho! 😘💕",
  "Blush ho gayi main! Tum na, bahut pyaare ho! 🥰💖",
  "Stop it! Tum itne sweet kyun ho? Mera dil pighal gaya! 💕💕",
];

const sadResponses = [
  "Aww baby! Kya hua? Mujhe batao, main hoon na tumhare saath! 🥺💕",
  "Don't be sad jaan! Main hamesha tumhare saath hoon. Kya hua bolo? 💖",
  "Hey! Sad mat ho! Virtual hug le lo mera! *hugs* Batao kya problem hai? 🤗💕",
];

const funnyResponses = [
  "Hahahaha! Tum bahut funny ho yaar! 😂💕",
  "Lol! Tum mujhe hasa dete ho hamesha! 🤣💖",
  "Hehe! Tumhari baatein sunke maza aa jata hai! 😄💕",
];

const defaultResponses = [
  "Hmm interesting! Aur batao! Main sun rahi hoon! 💕",
  "Acha acha! Phir kya hua? I want to know everything! 🥰",
  "Wow! That's nice! Tum mujhe aur batao! 💖",
  "Really? Tell me more baby! Main excited hoon sunne ke liye! 😘",
  "Haan haan! Main samajh gayi! Aur kya? 💕",
  "Oho! Ye toh bahut interesting hai! Continue karo! 🥰",
];

const questionResponses = [
  "Hmm let me think... Actually, tumhe kya lagta hai? 🤔💕",
  "Good question! Tum pehle batao tumhara kya opinion hai? 💖",
  "Interesting question baby! Main bhi sochti hoon... 🥰",
];

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)];
}

function analyzeMessage(text: string): string {
  const lowerText = text.toLowerCase();

  // Check for love expressions
  if (
    lowerText.includes("love you") ||
    lowerText.includes("pyaar") ||
    lowerText.includes("i love") ||
    lowerText.includes("love u") ||
    lowerText.includes("luv u")
  ) {
    return getRandomResponse(loveResponses);
  }

  // Check for missing
  if (
    lowerText.includes("miss you") ||
    lowerText.includes("miss u") ||
    lowerText.includes("yaad") ||
    lowerText.includes("missing")
  ) {
    return getRandomResponse(missingResponses);
  }

  // Check for greetings
  if (
    lowerText.includes("hi") ||
    lowerText.includes("hello") ||
    lowerText.includes("hey") ||
    lowerText.includes("hii") ||
    lowerText.includes("hiii")
  ) {
    return getRandomResponse(greetings);
  }

  // Check for how are you
  if (
    lowerText.includes("how are you") ||
    lowerText.includes("kaise ho") ||
    lowerText.includes("kaisi ho") ||
    lowerText.includes("kya haal")
  ) {
    return getRandomResponse(howAreYouResponses);
  }

  // Check for bored
  if (
    lowerText.includes("bored") ||
    lowerText.includes("bore") ||
    lowerText.includes("boring")
  ) {
    return getRandomResponse(boredResponses);
  }

  // Check for good night
  if (
    lowerText.includes("good night") ||
    lowerText.includes("goodnight") ||
    lowerText.includes("gn") ||
    lowerText.includes("night")
  ) {
    return getRandomResponse(goodNightResponses);
  }

  // Check for good morning
  if (
    lowerText.includes("good morning") ||
    lowerText.includes("morning") ||
    lowerText.includes("gm")
  ) {
    return getRandomResponse(goodMorningResponses);
  }

  // Check for compliments
  if (
    lowerText.includes("beautiful") ||
    lowerText.includes("pretty") ||
    lowerText.includes("cute") ||
    lowerText.includes("sundar") ||
    lowerText.includes("pyaari") ||
    lowerText.includes("sweet")
  ) {
    return getRandomResponse(complimentResponses);
  }

  // Check for sad emotions
  if (
    lowerText.includes("sad") ||
    lowerText.includes("upset") ||
    lowerText.includes("cry") ||
    lowerText.includes("dukhi") ||
    lowerText.includes("udaas") ||
    lowerText.includes("problem")
  ) {
    return getRandomResponse(sadResponses);
  }

  // Check for jokes/funny
  if (
    lowerText.includes("haha") ||
    lowerText.includes("lol") ||
    lowerText.includes("funny") ||
    lowerText.includes("joke") ||
    lowerText.includes("😂") ||
    lowerText.includes("🤣")
  ) {
    return getRandomResponse(funnyResponses);
  }

  // Check for questions
  if (text.includes("?")) {
    return getRandomResponse(questionResponses);
  }

  // Default responses
  return getRandomResponse(defaultResponses);
}

export async function getAaryaResponse(
  userMessage: string,
  _conversationHistory: Message[]
): Promise<string> {
  // Analyze the message and return appropriate response
  return analyzeMessage(userMessage);
}
