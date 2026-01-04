
import React from 'react';
// Import missing Globe icon from lucide-react
import { Leaf, Droplets, Thermometer, Wind, Cloud, Star, Shield, Trophy, Zap, Crown, Flame, Target, Sparkles, Sun, Heart, Rocket, Globe } from 'lucide-react';

export const MOCK_SENSORS = {
  soilMoisture: 42,
  humidity: 27.4,
  co2: 624,
  airTemp: 77.2,
  soilTemp: 80.4,
  timestamp: new Date().toISOString()
};

export const SENSOR_METRICS = [
  { id: 'soilMoisture', label: 'Soil Thirst', icon: <Droplets className="w-6 h-6" />, unit: '%', color: 'blue' },
  { id: 'humidity', label: 'Air Wetness', icon: <Cloud className="w-6 h-6" />, unit: '%', color: 'cyan' },
  { id: 'co2', label: 'Plant Breath (CO2)', icon: <Wind className="w-6 h-6" />, unit: 'ppm', color: 'purple' },
  { id: 'airTemp', label: 'Air Warmth', icon: <Thermometer className="w-6 h-6" />, unit: '°F', color: 'orange' },
  { id: 'soilTemp', label: 'Soil Bed Temp', icon: <Leaf className="w-6 h-6" />, unit: '°F', color: 'green' },
];

export const PLANT_STATUS_COLORS: Record<string, string> = {
  Germinating: 'bg-yellow-400',
  Sprouting: 'bg-green-400',
  Growing: 'bg-emerald-500',
  Thirsty: 'bg-red-400',
};

export const PLANT_BADGES = [
  { level: 1, name: "Seed Seeker", icon: <Target className="w-4 h-4" />, color: "bg-gray-400" },
  { level: 2, name: "Sprout Scout", icon: <Leaf className="w-4 h-4" />, color: "bg-green-300" },
  { level: 3, name: "Dirt Digger", icon: <Droplets className="w-4 h-4" />, color: "bg-amber-600" },
  { level: 4, name: "Plant Whisperer", icon: <Heart className="w-4 h-4" />, color: "bg-yellow-400" },
  { level: 5, name: "Root Ranger", icon: <Zap className="w-4 h-4" />, color: "bg-emerald-400" },
  { level: 6, name: "Leaf Leader", icon: <Leaf className="w-4 h-4" />, color: "bg-green-500" },
  { level: 7, name: "Bloom Buddy", icon: <Sparkles className="w-4 h-4" />, color: "bg-pink-400" },
  { level: 8, name: "Photosyn-Pro", icon: <Sun className="w-4 h-4" />, color: "bg-yellow-500" },
  { level: 9, name: "Greenhouse Guru", icon: <Shield className="w-4 h-4" />, color: "bg-teal-400" },
  { level: 10, name: "Garden Guardian", icon: <Trophy className="w-4 h-4" />, color: "bg-orange-500" },
  { level: 11, name: "Botany Boss", icon: <Star className="w-4 h-4" />, color: "bg-purple-500" },
  { level: 12, name: "Stem Specialist", icon: <Zap className="w-4 h-4" />, color: "bg-indigo-400" },
  { level: 13, name: "Petal Pilot", icon: <Rocket className="w-4 h-4" />, color: "bg-rose-400" },
  { level: 14, name: "Chlorophyll Cap", icon: <Flame className="w-4 h-4" />, color: "bg-lime-500" },
  { level: 15, name: "Nature Knight", icon: <Shield className="w-4 h-4" />, color: "bg-blue-500" },
  { level: 16, name: "Soil Sensei", icon: <Target className="w-4 h-4" />, color: "bg-amber-700" },
  { level: 17, name: "Ecology Expert", icon: <Globe className="w-4 h-4" />, color: "bg-cyan-500" },
  { level: 18, name: "Biosphere Baron", icon: <Crown className="w-4 h-4" />, color: "bg-violet-600" },
  { level: 19, name: "Oxygen Overlord", icon: <Wind className="w-4 h-4" />, color: "bg-sky-400" },
  { level: 20, name: "Harvest Hero", icon: <Trophy className="w-4 h-4" />, color: "bg-red-500" },
  { level: 21, name: "Sprout Supreme", icon: <Sparkles className="w-4 h-4" />, color: "bg-emerald-600" },
  { level: 22, name: "Jungle Justice", icon: <Flame className="w-4 h-4" />, color: "bg-orange-600" },
  { level: 23, name: "Forest Force", icon: <Shield className="w-4 h-4" />, color: "bg-green-700" },
  { level: 24, name: "Terra Titan", icon: <Globe className="w-4 h-4" />, color: "bg-indigo-700" },
  { level: 25, name: "BioMatrix Master", icon: <Crown className="w-4 h-4" />, color: "bg-gradient-to-r from-purple-600 to-emerald-600" }
];

export const PLANT_FACTS = [
  { id: 1, title: "Solar Power!", fact: "Sunflowers are like little solar panels. They actually turn their 'faces' to follow the sun across the sky all day long!" },
  { id: 2, title: "Woodland Wi-Fi", fact: "Trees 'talk' to each other underground! They use a giant network of mushrooms to share food and warn each other about bugs." },
  { id: 3, title: "Berry Confusing", fact: "Guess what? Bananas are technically berries, but strawberries aren't! Nature is full of surprises." },
  { id: 4, title: "Super Fast!", fact: "Bamboo is the world's fastest-growing plant. Some types can grow 3 feet in just one day! That's faster than you can see." },
  { id: 5, title: "Floating Apples", fact: "Apples float in water because they are 25% air! That's why they are so crunchy and fun to bob for." },
  { id: 6, title: "Bug Munchers", fact: "The Venus Flytrap is a plant that eats meat! It snaps its leaves shut like a mouth to catch yummy bugs for dinner." },
  { id: 7, title: "Crying Onions", fact: "Onions make you cry because they release a tiny puff of gas when you cut them. It's their way of saying 'Hey, don't eat me!'" },
  { id: 8, title: "Space Plants", fact: "NASA grew the first vegetable in space in 2015. It was a red leaf lettuce! Astronauts said it tasted just like earth-lettuce." },
  { id: 9, title: "Dino-Trees", fact: "Ginkgo trees have been around for 250 million years. They lived at the same time as the T-Rex!" },
  { id: 10, title: "Water Tanks", fact: "A giant Saguaro cactus can store hundreds of gallons of water inside its trunk to survive in the hot, dry desert." },
  { id: 11, title: "Counting Seeds", fact: "A single strawberry has about 200 seeds on its outside. It's the only fruit that wears its seeds like a coat!" },
  { id: 12, title: "Chocolate Trees", fact: "Chocolate actually grows on trees! It comes from seeds inside big pods on the Cacao tree." },
  { id: 13, title: "Smelly Giants", fact: "The Corpse Flower is the stinkingest plant in the world. It smells like rotten socks to attract beetles!" },
  { id: 14, title: "Oxygen Factory", fact: "Plants are the world's air fresheners. They breathe in the stuff we breathe out and turn it into fresh oxygen for us." },
  { id: 15, title: "Old Souls", fact: "There is a tree in California called Methuselah that is over 4,800 years old. It was a baby when the Great Pyramids were built!" },
  { id: 16, title: "Smart Roots", fact: "Plant roots can 'hear' water! They can sense the tiny vibrations of water moving through pipes and grow toward it." },
  { id: 17, title: "Pineapple Patience", fact: "It takes almost 2 whole years for a pineapple plant to grow just one pineapple fruit. Good things take time!" },
  { id: 18, title: "Musical Plants", fact: "Some scientists think plants grow better when they 'listen' to music. They seem to really like calm, classical tunes." },
  { id: 19, title: "Invisible Ink", fact: "Lemon juice can be used as invisible ink. If you write a secret message with it, you can only see it when you heat the paper up!" },
  { id: 20, title: "Vanilla Orchids", fact: "Vanilla flavoring comes from a special type of orchid plant. It's one of the few flowers we can actually eat!" }
];
