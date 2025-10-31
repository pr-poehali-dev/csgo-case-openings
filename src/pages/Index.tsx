import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';

interface CaseItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity: Rarity;
}

interface InventoryItem {
  id: number;
  name: string;
  rarity: Rarity;
  value: number;
  image?: string;
}

interface HistoryItem {
  id: number;
  caseName: string;
  itemName: string;
  rarity: Rarity;
  timestamp: string;
}

interface LeaderboardPlayer {
  id: number;
  username: string;
  totalWon: number;
  casesOpened: number;
}

const cases: CaseItem[] = [
  { id: 1, name: 'Стартовый кейс', price: 50, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'common' },
  { id: 2, name: 'Золотой кейс', price: 150, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'rare' },
  { id: 3, name: 'Легендарный кейс', price: 300, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'epic' },
  { id: 4, name: 'Мифический кейс', price: 500, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'legendary' },
  { id: 5, name: 'Королевский кейс', price: 1000, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'mythic' },
  { id: 6, name: 'Неоновый кейс', price: 250, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'epic' },
  { id: 7, name: 'Кибер кейс', price: 180, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'rare' },
  { id: 8, name: 'Драконий кейс', price: 450, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'legendary' },
  { id: 9, name: 'Милитари кейс', price: 120, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/09d5b858-7f77-4158-8cfd-f84a61384552.jpg', rarity: 'rare' },
  { id: 10, name: 'Chroma Case', price: 200, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 11, name: 'Gamma Case', price: 280, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 12, name: 'Spectrum Case', price: 220, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'epic' },
  { id: 13, name: 'Glove Case', price: 800, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'legendary' },
  { id: 14, name: 'Danger Zone Case', price: 160, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/09d5b858-7f77-4158-8cfd-f84a61384552.jpg', rarity: 'rare' },
  { id: 15, name: 'Prisma Case', price: 240, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 16, name: 'CS20 Case', price: 350, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'legendary' },
  { id: 17, name: 'Shattered Web Case', price: 190, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'rare' },
  { id: 18, name: 'Fracture Case', price: 270, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 19, name: 'Operation Broken Fang', price: 420, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/09d5b858-7f77-4158-8cfd-f84a61384552.jpg', rarity: 'legendary' },
  { id: 20, name: 'Snakebite Case', price: 210, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 21, name: 'Operation Riptide', price: 380, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'legendary' },
  { id: 22, name: 'Dreams & Nightmares', price: 320, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'epic' },
  { id: 23, name: 'Recoil Case', price: 230, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'epic' },
  { id: 24, name: 'Revolution Case', price: 290, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 25, name: 'Clutch Case', price: 260, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/09d5b858-7f77-4158-8cfd-f84a61384552.jpg', rarity: 'epic' },
  { id: 26, name: 'Horizon Case', price: 310, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 27, name: 'Phoenix Case', price: 140, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'rare' },
  { id: 28, name: 'Huntsman Case', price: 170, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/09d5b858-7f77-4158-8cfd-f84a61384552.jpg', rarity: 'rare' },
  { id: 29, name: 'Breakout Case', price: 185, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'rare' },
  { id: 30, name: 'Vanguard Case', price: 195, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 31, name: 'Shadow Case', price: 215, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 32, name: 'Revolver Case', price: 175, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'rare' },
  { id: 33, name: 'Wildfire Case', price: 205, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 34, name: 'Chroma 2 Case', price: 225, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 35, name: 'Chroma 3 Case', price: 235, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 36, name: 'Gamma 2 Case', price: 295, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/128d2027-5e3d-40e2-ab94-293cb8510653.jpg', rarity: 'epic' },
  { id: 37, name: 'Spectrum 2 Case', price: 245, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/27affd36-1b2b-4379-a512-58424d9b55d6.jpg', rarity: 'epic' },
  { id: 38, name: 'Prisma 2 Case', price: 265, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/a26bddf3-9966-47d7-bb24-a9a2aea551da.jpg', rarity: 'epic' },
  { id: 39, name: 'Elite Case', price: 650, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'legendary' },
  { id: 40, name: 'Ultimate Case', price: 1500, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c88317bd-41df-43c7-a339-c99cff9779ee.jpg', rarity: 'mythic' },
];

const rarityColors: Record<Rarity, string> = {
  common: 'text-rarity-common border-rarity-common',
  rare: 'text-rarity-rare border-rarity-rare',
  epic: 'text-rarity-epic border-rarity-epic',
  legendary: 'text-rarity-legendary border-rarity-legendary',
  mythic: 'text-rarity-mythic border-rarity-mythic',
};

const rarityLabels: Record<Rarity, string> = {
  common: 'Обычный',
  rare: 'Редкий',
  epic: 'Эпический',
  legendary: 'Легендарный',
  mythic: 'Мифический',
};

const Index = () => {
  const [balance, setBalance] = useState(1000);
  const [isOpeningCase, setIsOpeningCase] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);
  const [wonItem, setWonItem] = useState<InventoryItem | null>(null);
  const [rouletteItems, setRouletteItems] = useState<InventoryItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: '★ Karambit | Fade', rarity: 'mythic', value: 3500, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/d4718631-280d-4f03-8c40-bb62744abc7a.jpg' },
    { id: 2, name: 'AK-47 | Redline', rarity: 'legendary', value: 1200, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/1817158d-6714-4f64-a134-cd7d32544c61.jpg' },
    { id: 3, name: 'AWP | Asiimov', rarity: 'legendary', value: 980, image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/1d686c74-dadf-4e53-8ce5-0cec8f9ad441.jpg' },
  ]);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 1, caseName: 'Королевский кейс', itemName: '★ Karambit | Fade', rarity: 'mythic', timestamp: '2 мин назад' },
    { id: 2, caseName: 'Золотой кейс', itemName: 'AK-47 | Redline', rarity: 'legendary', timestamp: '15 мин назад' },
    { id: 3, caseName: 'Легендарный кейс', itemName: 'AWP | Asiimov', rarity: 'legendary', timestamp: '1 час назад' },
  ]);
  const [leaderboard] = useState<LeaderboardPlayer[]>([
    { id: 1, username: 'ProGamer2024', totalWon: 15420, casesOpened: 342 },
    { id: 2, username: 'LuckyShot', totalWon: 12850, casesOpened: 289 },
    { id: 3, username: 'CaseKing', totalWon: 11200, casesOpened: 256 },
    { id: 4, username: 'DragonSlayer', totalWon: 9800, casesOpened: 221 },
    { id: 5, username: 'NightHawk', totalWon: 8500, casesOpened: 198 },
  ]);
  const [activeTab, setActiveTab] = useState('cases');
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [selectedUpgradeItems, setSelectedUpgradeItems] = useState<InventoryItem[]>([]);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState<{ success: boolean; item?: InventoryItem } | null>(null);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('price-asc');

  const openCase = (caseItem: CaseItem) => {
    if (balance < caseItem.price) {
      alert('Недостаточно средств!');
      return;
    }

    const openSound = new Audio('https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3');
    openSound.volume = 0.3;
    openSound.play();

    setSelectedCase(caseItem);
    setIsOpeningCase(true);
    setWonItem(null);
    setBalance(balance - caseItem.price);

    const rarities: Rarity[] = ['common', 'rare', 'epic', 'legendary', 'mythic'];
    const skins = [
      { name: '★ Karambit | Fade', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/d4718631-280d-4f03-8c40-bb62744abc7a.jpg', rarity: 'mythic' as Rarity },
      { name: '★ Butterfly Knife | Doppler', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/ba1f5ac6-968f-4af9-8e1f-9b2896613848.jpg', rarity: 'mythic' as Rarity },
      { name: '★ M9 Bayonet | Crimson Web', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/e0d60ad9-b2a2-466b-aa0a-01bb42695b91.jpg', rarity: 'legendary' as Rarity },
      { name: '★ Sport Gloves | Pandoras Box', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/3760a7f8-d2b1-42be-9321-de282c11b6bf.jpg', rarity: 'mythic' as Rarity },
      { name: '★ Specialist Gloves | Crimson Kimono', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/134703c5-8fc5-4eca-9287-6dc276fbfc9e.jpg', rarity: 'mythic' as Rarity },
      { name: '★ Driver Gloves | King Snake', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/12ff4b68-3fb5-4c91-884a-dcd2d9f35907.jpg', rarity: 'legendary' as Rarity },
      { name: 'AK-47 | Redline', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/1817158d-6714-4f64-a134-cd7d32544c61.jpg', rarity: 'legendary' as Rarity },
      { name: 'AWP | Asiimov', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/1d686c74-dadf-4e53-8ce5-0cec8f9ad441.jpg', rarity: 'legendary' as Rarity },
      { name: 'M4A4 | Howl', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/c3991274-3346-486a-a173-2a3356611dd4.jpg', rarity: 'epic' as Rarity },
      { name: 'Desert Eagle | Blaze', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/f98bc3ea-e274-4290-93a4-4df9fa84b2cc.jpg', rarity: 'epic' as Rarity },
      { name: 'Glock-18 | Fade', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/6a1a3c7a-7c64-4b6c-b12f-0b5531f6215a.jpg', rarity: 'rare' as Rarity },
      { name: 'USP-S | Kill Confirmed', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/3a7a2486-34ec-4f61-9da4-911b58ee5ed0.jpg', rarity: 'rare' as Rarity },
      { name: 'P250 | Asiimov', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/bc57f5b7-9aee-4b11-8f38-a2ab0062906f.jpg', rarity: 'rare' as Rarity },
      { name: 'MAC-10 | Neon Rider', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/e5354089-2758-4cb2-a372-8dc6cbb78378.jpg', rarity: 'common' as Rarity },
      { name: 'AUG | Chameleon', image: 'https://cdn.poehali.dev/projects/a4cfb459-bfa5-479a-a77f-5804385aa5b2/files/d36451ed-2c86-4d1c-99e5-58f59d909ac5.jpg', rarity: 'common' as Rarity },
    ];
    
    const generatedItems: InventoryItem[] = [];
    for (let i = 0; i < 50; i++) {
      const randomSkin = skins[Math.floor(Math.random() * skins.length)];
      const rarityValue = randomSkin.rarity === 'mythic' ? 2000 + Math.floor(Math.random() * 3000) :
                          randomSkin.rarity === 'legendary' ? 500 + Math.floor(Math.random() * 1500) :
                          randomSkin.rarity === 'epic' ? 200 + Math.floor(Math.random() * 500) :
                          randomSkin.rarity === 'rare' ? 100 + Math.floor(Math.random() * 300) :
                          50 + Math.floor(Math.random() * 150);
      
      generatedItems.push({
        id: Date.now() + i,
        name: randomSkin.name,
        rarity: randomSkin.rarity,
        value: rarityValue,
        image: randomSkin.image,
      });
    }
    
    const winningIndex = 45;
    const randomSkin = skins[Math.floor(Math.random() * skins.length)];
    const rarityValue = randomSkin.rarity === 'mythic' ? 2000 + Math.floor(Math.random() * 3000) :
                        randomSkin.rarity === 'legendary' ? 500 + Math.floor(Math.random() * 1500) :
                        randomSkin.rarity === 'epic' ? 200 + Math.floor(Math.random() * 500) :
                        randomSkin.rarity === 'rare' ? 100 + Math.floor(Math.random() * 300) :
                        50 + Math.floor(Math.random() * 150);
    
    const winningItem: InventoryItem = {
      id: Date.now() + 999,
      name: randomSkin.name,
      rarity: randomSkin.rarity,
      value: rarityValue,
      image: randomSkin.image,
    };
    generatedItems[winningIndex] = winningItem;
    
    setRouletteItems(generatedItems);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      
      const winSound = new Audio('https://cdn.freesound.org/previews/171/171671_2437358-lq.mp3');
      winSound.volume = 0.4;
      winSound.play();
      
      setWonItem(winningItem);
      setInventory([winningItem, ...inventory]);
      setHistory([
        {
          id: Date.now(),
          caseName: caseItem.name,
          itemName: winningItem.name,
          rarity: winningItem.rarity,
          timestamp: 'только что',
        },
        ...history,
      ]);
    }, 5000);
  };

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0) {
      setBalance(balance + amount);
      setDepositAmount('');
      setShowDepositDialog(false);
    }
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      setWithdrawAmount('');
      setShowWithdrawDialog(false);
    } else {
      alert('Недостаточно средств!');
    }
  };

  const sellItem = (item: InventoryItem) => {
    setInventory(inventory.filter(i => i.id !== item.id));
    setBalance(balance + item.value);
  };

  const toggleUpgradeItem = (item: InventoryItem) => {
    if (selectedUpgradeItems.find(i => i.id === item.id)) {
      setSelectedUpgradeItems(selectedUpgradeItems.filter(i => i.id !== item.id));
    } else {
      if (selectedUpgradeItems.length < 5) {
        setSelectedUpgradeItems([...selectedUpgradeItems, item]);
      }
    }
  };

  const performUpgrade = () => {
    if (selectedUpgradeItems.length < 2) {
      alert('Выберите минимум 2 предмета!');
      return;
    }

    const upgradeSound = new Audio('https://cdn.freesound.org/previews/341/341695_5121236-lq.mp3');
    upgradeSound.volume = 0.3;
    upgradeSound.play();

    setIsUpgrading(true);

    setTimeout(() => {
      const totalValue = selectedUpgradeItems.reduce((sum, item) => sum + item.value, 0);
      const successChance = Math.min(0.5 + (selectedUpgradeItems.length * 0.1), 0.85);
      const success = Math.random() < successChance;

      if (success) {
        const successSound = new Audio('https://cdn.freesound.org/previews/270/270404_5123851-lq.mp3');
        successSound.volume = 0.5;
        successSound.play();

        const rarities: Rarity[] = ['common', 'rare', 'epic', 'legendary', 'mythic'];
        const maxRarityIndex = Math.max(...selectedUpgradeItems.map(item => 
          rarities.indexOf(item.rarity)
        ));
        const newRarityIndex = Math.min(maxRarityIndex + 1, rarities.length - 1);
        const newRarity = rarities[newRarityIndex];
        
        const newItem: InventoryItem = {
          id: Date.now(),
          name: `Upgraded ${selectedUpgradeItems[0].name}`,
          rarity: newRarity,
          value: Math.floor(totalValue * 1.5),
        };

        const newInventory = inventory.filter(item => 
          !selectedUpgradeItems.find(selected => selected.id === item.id)
        );
        setInventory([newItem, ...newInventory]);
        setUpgradeResult({ success: true, item: newItem });
      } else {
        const failSound = new Audio('https://cdn.freesound.org/previews/142/142608_2615119-lq.mp3');
        failSound.volume = 0.4;
        failSound.play();

        const newInventory = inventory.filter(item => 
          !selectedUpgradeItems.find(selected => selected.id === item.id)
        );
        setInventory(newInventory);
        setUpgradeResult({ success: false });
      }

      setIsUpgrading(false);
      setSelectedUpgradeItems([]);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-10 blur-sm"
        >
          <source src="https://cdn.cloudflare.steamstatic.com/apps/csgo/videos/weapons/awp_dragon_lore.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
      </div>
      
      <div className="relative z-10">
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-[#0F1419]/98 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center font-bold text-xl">G</div>
            <h1 className="text-2xl font-bold text-white">
              GG<span className="text-primary">DROP</span>
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('cases')}
              className={`font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'cases' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white hover:bg-card/50'
              }`}
            >
              Кейсы
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'inventory' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white hover:bg-card/50'
              }`}
            >
              Инвентарь
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'history' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white hover:bg-card/50'
              }`}
            >
              История
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'leaderboard' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white hover:bg-card/50'
              }`}
            >
              Топ игроков
            </button>
            <button
              onClick={() => setActiveTab('upgrade')}
              className={`font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'upgrade' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white hover:bg-card/50'
              }`}
            >
              Апгрейд
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`font-semibold px-4 py-2 rounded-lg transition-all ${
                activeTab === 'faq' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-white hover:bg-card/50'
              }`}
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-primary/30">
              <Icon name="Coins" size={20} className="text-secondary" />
              <span className="font-bold text-white">{balance.toFixed(0)}</span>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold" onClick={() => setShowDepositDialog(true)}>
              <Icon name="Plus" size={16} className="mr-1" />
              Пополнить
            </Button>
            <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-black font-semibold" onClick={() => setShowWithdrawDialog(true)}>
              <Icon name="ArrowUpRight" size={16} className="mr-1" />
              Вывести
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setActiveTab('profile')}>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {activeTab === 'cases' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-destructive bg-clip-text text-transparent animate-glow-pulse">
                Открой свой кейс прямо сейчас!
              </h2>
              <p className="text-muted-foreground text-lg">
                Выбери кейс и получи шанс выиграть легендарные скины
              </p>
            </div>

            <Card className="p-6 bg-card/80 backdrop-blur border-primary/20">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-wrap gap-3 flex-1">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">Цена</label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={priceFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setPriceFilter('all')}
                      >
                        Все
                      </Button>
                      <Button
                        size="sm"
                        variant={priceFilter === '0-200' ? 'default' : 'outline'}
                        onClick={() => setPriceFilter('0-200')}
                      >
                        До 200₽
                      </Button>
                      <Button
                        size="sm"
                        variant={priceFilter === '200-500' ? 'default' : 'outline'}
                        onClick={() => setPriceFilter('200-500')}
                      >
                        200-500₽
                      </Button>
                      <Button
                        size="sm"
                        variant={priceFilter === '500+' ? 'default' : 'outline'}
                        onClick={() => setPriceFilter('500+')}
                      >
                        500₽+
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-muted-foreground">Редкость</label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={rarityFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setRarityFilter('all')}
                      >
                        Все
                      </Button>
                      <Button
                        size="sm"
                        variant={rarityFilter === 'rare' ? 'default' : 'outline'}
                        onClick={() => setRarityFilter('rare')}
                        className={rarityFilter === 'rare' ? '' : rarityColors.rare}
                      >
                        Редкие
                      </Button>
                      <Button
                        size="sm"
                        variant={rarityFilter === 'epic' ? 'default' : 'outline'}
                        onClick={() => setRarityFilter('epic')}
                        className={rarityFilter === 'epic' ? '' : rarityColors.epic}
                      >
                        Эпические
                      </Button>
                      <Button
                        size="sm"
                        variant={rarityFilter === 'legendary' ? 'default' : 'outline'}
                        onClick={() => setRarityFilter('legendary')}
                        className={rarityFilter === 'legendary' ? '' : rarityColors.legendary}
                      >
                        Легендарные
                      </Button>
                      <Button
                        size="sm"
                        variant={rarityFilter === 'mythic' ? 'default' : 'outline'}
                        onClick={() => setRarityFilter('mythic')}
                        className={rarityFilter === 'mythic' ? '' : rarityColors.mythic}
                      >
                        Мифические
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm text-muted-foreground">Сортировка</label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={sortBy === 'price-asc' ? 'default' : 'outline'}
                      onClick={() => setSortBy('price-asc')}
                    >
                      <Icon name="ArrowUp" size={16} className="mr-1" />
                      Дешевле
                    </Button>
                    <Button
                      size="sm"
                      variant={sortBy === 'price-desc' ? 'default' : 'outline'}
                      onClick={() => setSortBy('price-desc')}
                    >
                      <Icon name="ArrowDown" size={16} className="mr-1" />
                      Дороже
                    </Button>
                    <Button
                      size="sm"
                      variant={sortBy === 'name' ? 'default' : 'outline'}
                      onClick={() => setSortBy('name')}
                    >
                      <Icon name="ArrowUpAZ" size={16} className="mr-1" />
                      Имя
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases
                .filter(caseItem => {
                  if (priceFilter === 'all') return true;
                  if (priceFilter === '0-200') return caseItem.price <= 200;
                  if (priceFilter === '200-500') return caseItem.price > 200 && caseItem.price <= 500;
                  if (priceFilter === '500+') return caseItem.price > 500;
                  return true;
                })
                .filter(caseItem => rarityFilter === 'all' || caseItem.rarity === rarityFilter)
                .sort((a, b) => {
                  if (sortBy === 'price-asc') return a.price - b.price;
                  if (sortBy === 'price-desc') return b.price - a.price;
                  if (sortBy === 'name') return a.name.localeCompare(b.name);
                  return 0;
                })
                .map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`group relative overflow-hidden border-2 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                    rarityColors[caseItem.rarity]
                  } hover:shadow-[0_0_30px_rgba(29,185,84,0.3)] cursor-pointer bg-card/80 backdrop-blur`}
                  onClick={() => openCase(caseItem)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-black/40" />
                  <div className="relative p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`${rarityColors[caseItem.rarity]} font-semibold`}>
                        {rarityLabels[caseItem.rarity]}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-center my-3">
                      <img 
                        src={caseItem.image} 
                        alt={caseItem.name}
                        className="w-full h-44 object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white">{caseItem.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xl font-bold text-secondary">
                          <Icon name="Coins" size={22} />
                          {caseItem.price}
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                          Открыть
                          <Icon name="ChevronRight" size={16} className="ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мой инвентарь</h2>
              <div className="text-muted-foreground">
                Всего предметов: <span className="font-bold text-foreground">{inventory.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <Card key={item.id} className={`border-2 ${rarityColors[item.rarity]} hover:scale-105 transition-all`}>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={rarityColors[item.rarity]}>
                        {rarityLabels[item.rarity]}
                      </Badge>
                    </div>
                    <div className="flex justify-center my-2">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-sm">{item.name}</h3>
                    <div className="flex items-center gap-2 text-secondary font-bold">
                      <Icon name="Coins" size={18} />
                      {item.value}
                    </div>
                    <Button 
                      onClick={() => sellItem(item)} 
                      size="sm" 
                      variant="outline"
                      className="w-full mt-2"
                    >
                      <Icon name="DollarSign" size={14} className="mr-1" />
                      Продать
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">История открытий</h2>
            
            <div className="space-y-3">
              {history.map((item) => (
                <Card key={item.id} className="hover:bg-card/80 transition-colors">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">🎁</div>
                      <div>
                        <div className="font-bold">{item.itemName}</div>
                        <div className="text-sm text-muted-foreground">
                          из кейса: {item.caseName}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={rarityColors[item.rarity]}>
                        {rarityLabels[item.rarity]}
                      </Badge>
                      <div className="text-sm text-muted-foreground min-w-[100px] text-right">
                        {item.timestamp}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Топ игроков</h2>
            
            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <Card key={player.id} className="hover:bg-card/80 transition-colors">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`text-3xl font-bold ${
                        index === 0 ? 'text-secondary' : 
                        index === 1 ? 'text-rarity-rare' : 
                        index === 2 ? 'text-rarity-epic' : 
                        'text-muted-foreground'
                      }`}>
                        #{index + 1}
                      </div>
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {player.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">{player.username}</div>
                        <div className="text-sm text-muted-foreground">
                          Открыто кейсов: {player.casesOpened}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-secondary font-bold text-xl">
                      <Icon name="Trophy" size={24} />
                      {player.totalWon.toLocaleString()}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Мой профиль</h2>
            
            <Card className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Игрок #12345</h3>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <div className="text-muted-foreground">Баланс</div>
                      <div className="font-bold text-lg">{balance.toFixed(0)} ₽</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Открыто кейсов</div>
                      <div className="font-bold text-lg">{history.length}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Предметов</div>
                      <div className="font-bold text-lg">{inventory.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'upgrade' && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Система апгрейдов</h2>
              <p className="text-muted-foreground">
                Выберите от 2 до 5 предметов для апгрейда. Шанс успеха увеличивается с количеством предметов!
              </p>
            </div>

            {selectedUpgradeItems.length > 0 && (
              <Card className="p-6 bg-card/50 border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Выбрано предметов: {selectedUpgradeItems.length}/5</h3>
                    <div className="text-sm text-muted-foreground">
                      Шанс успеха: {Math.min(50 + (selectedUpgradeItems.length * 10), 85)}%
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {selectedUpgradeItems.map((item) => (
                      <Badge key={item.id} className={rarityColors[item.rarity]}>
                        {item.name} ({item.value})
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={performUpgrade} 
                      className="flex-1"
                      disabled={selectedUpgradeItems.length < 2}
                    >
                      <Icon name="Zap" size={18} className="mr-2" />
                      Улучшить
                    </Button>
                    <Button 
                      onClick={() => setSelectedUpgradeItems([])} 
                      variant="outline"
                    >
                      Очистить
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inventory.map((item) => {
                const isSelected = selectedUpgradeItems.find(i => i.id === item.id);
                return (
                  <Card 
                    key={item.id} 
                    className={`border-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'ring-2 ring-primary scale-105' 
                        : rarityColors[item.rarity]
                    } hover:scale-105`}
                    onClick={() => toggleUpgradeItem(item)}
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className={rarityColors[item.rarity]}>
                          {rarityLabels[item.rarity]}
                        </Badge>
                        <div className="text-2xl">🔫</div>
                      </div>
                      <h3 className="font-bold">{item.name}</h3>
                      <div className="flex items-center gap-2 text-secondary font-bold">
                        <Icon name="Coins" size={18} />
                        {item.value}
                      </div>
                      {isSelected && (
                        <Badge className="w-full justify-center bg-primary">
                          <Icon name="Check" size={14} className="mr-1" />
                          Выбрано
                        </Badge>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center">Вопросы и ответы</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">Как пополнить баланс?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Нажмите кнопку "Пополнить" в правом верхнем углу, введите сумму и выберите способ оплаты. Минимальная сумма пополнения - 100 рублей.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">Как открыть кейс?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Выберите понравившийся кейс на главной странице и нажмите "Открыть". Стоимость кейса будет списана с вашего баланса, и вы получите случайный предмет.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">Что такое редкость предметов?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Предметы делятся на 5 уровней редкости: Обычный (серый), Редкий (синий), Эпический (фиолетовый), Легендарный (золотой) и Мифический (красный). Чем выше редкость, тем больше стоимость предмета.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">Как вывести средства?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Нажмите "Вывести" в правом верхнем углу, укажите сумму и реквизиты. Вывод обрабатывается в течение 1-3 рабочих дней. Минимальная сумма вывода - 500 рублей.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">Честная ли система выпадения предметов?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да! Все выпадения происходят с использованием проверяемой системы случайных чисел. Шансы на получение предметов каждой редкости указаны в описании кейса.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </main>

      <Dialog open={isOpeningCase} onOpenChange={setIsOpeningCase}>
        <DialogContent className="sm:max-w-4xl max-w-[90vw]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {wonItem ? '🎉 Поздравляем!' : 'Открываем кейс...'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {wonItem ? 'Вы выиграли:' : 'Следите за рулеткой'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center space-y-4">
            {!wonItem ? (
              <div className="w-full overflow-hidden relative" style={{ height: '200px' }}>
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary z-10" style={{ transform: 'translateX(-50%)' }}></div>
                <div className="absolute left-1/2 top-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-primary z-10" style={{ transform: 'translateX(-50%)' }}></div>
                
                <div 
                  className={`flex gap-2 py-4 ${isSpinning ? 'roulette-spinning' : ''}`}
                  style={{ paddingLeft: 'calc(50% - 75px)' }}
                >
                  {rouletteItems.map((item, index) => (
                    <div 
                      key={index}
                      className={`flex-shrink-0 w-[150px] h-[180px] border-2 rounded-lg p-3 flex flex-col items-center justify-center gap-2 ${rarityColors[item.rarity]}`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-contain"
                      />
                      <div className="text-xs text-center font-medium line-clamp-2">{item.name}</div>
                      <Badge className={`${rarityColors[item.rarity]} text-xs`}>
                        {rarityLabels[item.rarity]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <img 
                  src={wonItem.image} 
                  alt={wonItem.name}
                  className="w-48 h-48 object-contain animate-bounce-subtle"
                />
                <div className="text-center space-y-2">
                  <div className="text-xl font-bold">{wonItem.name}</div>
                  <Badge className={`${rarityColors[wonItem.rarity]} text-lg px-4 py-1`}>
                    {rarityLabels[wonItem.rarity]}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-secondary mt-4">
                    <Icon name="Coins" size={28} />
                    {wonItem.value}
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    setWonItem(null);
                    setSelectedCase(null);
                  }}
                  className="w-full mt-4"
                >
                  Отлично!
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Пополнение баланса</DialogTitle>
            <DialogDescription>
              Введите сумму для пополнения
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Сумма (₽)</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="100"
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
                min="100"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setDepositAmount('100')} variant="outline" size="sm">+100</Button>
              <Button onClick={() => setDepositAmount('500')} variant="outline" size="sm">+500</Button>
              <Button onClick={() => setDepositAmount('1000')} variant="outline" size="sm">+1000</Button>
              <Button onClick={() => setDepositAmount('5000')} variant="outline" size="sm">+5000</Button>
            </div>
            <Button onClick={handleDeposit} className="w-full">
              Пополнить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вывод средств</DialogTitle>
            <DialogDescription>
              Доступно для вывода: {balance.toFixed(0)} ₽
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Сумма (₽)</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="500"
                className="w-full px-3 py-2 bg-input border border-border rounded-md"
                min="500"
                max={balance}
              />
            </div>
            <Button onClick={handleWithdraw} className="w-full">
              Вывести
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isUpgrading || upgradeResult !== null} onOpenChange={() => {
        if (!isUpgrading) {
          setUpgradeResult(null);
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {isUpgrading ? 'Улучшаем предметы...' : upgradeResult?.success ? '🎉 Успех!' : '💔 Неудача'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {isUpgrading ? 'Ожидайте результат' : upgradeResult?.success ? 'Вы получили улучшенный предмет!' : 'Апгрейд не удался, предметы потеряны'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            {isUpgrading ? (
              <>
                <div className="text-7xl animate-spin-slow">⚡</div>
                <div className="text-lg font-medium animate-pulse">
                  Улучшаем...
                </div>
              </>
            ) : upgradeResult?.success && upgradeResult.item ? (
              <>
                <div className="text-6xl animate-bounce-subtle">🔫</div>
                <div className="text-center space-y-2">
                  <div className="text-xl font-bold">{upgradeResult.item.name}</div>
                  <Badge className={`${rarityColors[upgradeResult.item.rarity]} text-lg px-4 py-1`}>
                    {rarityLabels[upgradeResult.item.rarity]}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-secondary mt-4">
                    <Icon name="Coins" size={28} />
                    {upgradeResult.item.value}
                  </div>
                </div>
                <Button 
                  onClick={() => setUpgradeResult(null)}
                  className="w-full mt-4"
                >
                  Отлично!
                </Button>
              </>
            ) : (
              <>
                <div className="text-6xl">😢</div>
                <div className="text-center space-y-2">
                  <div className="text-lg text-muted-foreground">
                    К сожалению, апгрейд не удался
                  </div>
                </div>
                <Button 
                  onClick={() => setUpgradeResult(null)}
                  className="w-full mt-4"
                  variant="outline"
                >
                  Понятно
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default Index;