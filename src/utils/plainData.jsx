import workoutImg from "../assets/images/workOut1.png";
import workoutImg1 from "../assets/images/workOut2.png";
import workoutImg2 from "../assets/images/workOut3.png";
import workoutImg3 from "../assets/images/workOut4.png";
import Test1 from "../assets/images/testimony1.png";
import Test2 from "../assets/images/testimony2.png";
import Test3 from "../assets/images/testimony3.png";
import Test4 from "../assets/images/testimony4.png";
import Test5 from "../assets/images/testimony5.png";
import Test6 from "../assets/images/testimony6.png";
import Test7 from "../assets/images/testimony7.png";
import Test8 from "../assets/images/testimony8.png";
import Test9 from "../assets/images/testimony9.png";
import Trainer1 from "../assets/images/trainer1.png"
import Trainer2 from "../assets/images/trainer2.png"
import Trainer3 from "../assets/images/trainer3.png"
import Trainer4 from "../assets/images/trainer4.png"
import Trainer5 from "../assets/images/trainer5.png"
import Trainer6 from "../assets/images/trainer6.png"
import Trainer7 from "../assets/images/trainer7.png"
import Trainer8 from "../assets/images/trainer8.png"
import Trainer9 from "../assets/images/trainer9.png"
import Trainer10 from "../assets/images/trainer10.png"


export const TestimonyData = [
  {
    feedback:
      "I joined AktiveGym on the Student Plan and lost 12kg in 3 months. The energy here is unmatched",
    name: "LARA",
    image: {Test1},
    rating: "src/assets/images/rating.png",
  },
  {
    feedback:
      "AktiveGym has transformed my fitness journey. The trainers are knowledgeable and the community is so supportive.",
    name: "JAMES",
    image:{Test2},
  },
  {
    feedback:
      "I love the variety of classes and the personalized attention I get. It’s more than just a gym, it’s a lifestyle.",
    name: "SOPHIA",
    image: {Test3},
  },
  {
    feedback:
      "The Premium Plan is worth every penny. I’ve seen incredible results and made lifelong friends here.",
    name: "MICHAEL",
    image: {Test4},
  },
  {
    feedback:
      "Being a student, I wanted something affordable but effective. AktiveGym’s Student Plan delivered results I never expected.",
    name: "JACK",
    image: {Test5},
  },
  {
    feedback:
      "I’ve tried many gyms, but AktiveGym’s community and trainers make it stand out. I feel motivated every time I step in.",
    name: "EMILY",
    image: {Test6},
  },
  {
    feedback:
      "The nutrition guidance has been a game-changer for me. I’m not just working out, I’m learning how to fuel my body right.",
    name: "DAVID",
    image:{Test7},
  },
  {
    feedback:
      "I joined the Regular Plan and it’s been the best decision. The classes are fun and the trainers are always there to help.",
    name: "SARAH",
    image: {Test8},
  },
  {
    feedback:
      "AktiveGym is more than a gym, it’s a community. I’ve made friends and achieved goals I never thought possible.",
    name: "OLIVER",
    image: {Test9},
  },
];

export const trainers = [
  {
    name: "TOM ADAM",
    specialization: "Strength & Hypertrophy Specialist",
    experience: "6+ years",
    image: <img src={Trainer6} alt="" />,
  },
  {
    name: "JESSICA LARA",
    specialization: "Kickboxing",
    experience: "12+ years",
    image: {Trainer2},
  },
  {
    name: "ESTHER SARAH",
    specialization: "Nutrition & Diet Planning",
    experience: "4+ years",
    image: {Trainer9},
  },
  {
    name: "DAVID LEE",
    specialization: "Functional Training & Mobility",
    experience: "8+ years",
    image: {Trainer10},
  },
  {
    name: "MAYA KAPOOR",
    specialization: "Yoga & Flexibility Coach",
    experience: "10+ years",
    image: {Trainer5},
  },
  {
    name: "JORDAN WILLIAMS",
    specialization: "Powerlifting & Strength Coach",
    experience: "7+ years",
    image: {Trainer1},
  },
  {
    name: "LINDA CHEN",
    specialization: "Pilates Instructor",
    experience: "5+ years",
    image: {Trainer7},
  },
  {
    name: "ALEX MURPHY",
    specialization: "CrossFit & Endurance Training",
    experience: "9+ years",
    image: {Trainer8},
  },
  {
    name: "NINA OKAFOR",
    specialization: "HIIT & Bodyweight Expert",
    experience: "6+ years",
    image: {Trainer4},
  },
];

export const plans = [
  {
    name: "Student Plan",
    description:
      "Perfect for college students looking to stay fit on a budget.",
    monthly: ["$7/month"],
    yearly: ["$70/quarter"],
    features: [
      "Off-peak gym access (8am - 4pm)",
      "3 sessions/week",
      "Beginner workout video library",
      "Group class (1/week)",
      "Monthly Progress tracking",
      "10% off supplement",
      "Event notifications",
    ],
    price: "$7",
  },
  {
    name: "Regular Plan",
    description: "Our most popular plan for busy professionals.",
    monthly: ["$12/month"],
    yearly: ["$120/quarter"],
    features: [
      "Full access (6am - 10pm)",
      "Unlimited sessions",
      "Weekly diet + fitness plans",
      "Beginner & intermediate video access",
      "Group classes (3/week)",
      "Weekly trainer feedback",
      "Partner discounts",
      "Event notifications",
    ],
    price: "$12",
  },
  {
    name: "Premium Plan",
    description: "Elite support with full amenities.",
    monthly: ["$45/month"],
    yearly: ["$450/quarter"],
    features: [
      "24/7 gym + spa access",
      "Personal trainer bookings",
      "Custom diet & supplement plan",
      "Advanced training + masterclasses",
      "Unlimited classes (yoga, fitness)",
      "Welcome Pack (towel, bottle, branded gear)",
      "20% off all store items",
      "Event notifications",
    ],
    price: "45",
  },
];

export const FAQData = [
  {
    question: "Which Membership Plan is right for me?",
    answer: [
      "We offer three plans to suit different needs:",
      "1. Student Plan for budget-friendly, off-peak access.",
      "2. Regular Plan for full gym access and group classes.",
      "3. Premium Plan for 24/7 access, personal training, and advanced features.",
      "Choose based on your fitness goals, schedule, and desired support level.",
    ],
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes! You can upgrade or downgrade your membership at any time through your member dashboard. Plan changes take effect in the next billing cycle.",
  },
  {
    question: "Do I need to come to the gym to sign up?",
    answer:
      "Nope! You can sign up entirely online. Once you choose a plan, you’ll receive access to your dashboard and be ready to book your first session..",
  },
  {
    question: "What is included in the diet plan?",
    answer:
      "Each plan includes personalized diet recommendations, workout videos based on your goal, and optional progress tracking. Premium members also get meal planning with a dietician and access to advanced workouts..",
  },
];

export const MembershipPlan = [
  { id: "regular", name: "Regular", price: 12, value: "REGULAR" },
  { id: "premium", name: "Premium", price: 45, value: "PREMIUM" },
  { id: "student", name: "Student", price: 7, value: "STUDENT" },
];

export const WorkOutType = [
  {
    name: "Full Body Workout",
    description:
      "A balanced routine to target all major muscle groups. Ideal for building strength, endurance, and overall fitness.",
    images: workoutImg,
    type: "FULL_BODY_WORKOUT"
    },
  {
    name: "Core & Fat Burn",
    description:
      "Torch calories and strengthen your core with high-intensity circuits designed for fat loss and definition.",
    images: workoutImg1,
    type: "CORE_AND_FAT_BURN_WORKOUT"
    },
  {
    name: "Upper Body Strength",
    description:
      "Work your chest, back, arms, and shoulders. Perfect for sculpting and building upper-body power.",
    images: workoutImg2,
    type: "UPPER_BODY_STRETCH_WORKOUT"
    },
  {
    name: "Full Leg Workout",
    description:
      "Focus on glutes, quads, hamstrings, and calves. Build lower-body strength and improve stability.",
    images: workoutImg3,
    type: "FULL_LEG_WORKOUT",
    },
];
