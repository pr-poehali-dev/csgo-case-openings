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
  { id: 1, name: 'Стартовый кейс', price: 50, image: '🎁', rarity: 'common' },
  { id: 2, name: 'Золотой кейс', price: 150, image: '💰', rarity: 'rare' },
  { id: 3, name: 'Легендарный кейс', price: 300, image: '👑', rarity: 'epic' },
  { id: 4, name: 'Мифический кейс', price: 500, image: '💎', rarity: 'legendary' },
  { id: 5, name: 'Королевский кейс', price: 1000, image: '🔥', rarity: 'mythic' },
  { id: 6, name: 'Неоновый кейс', price: 250, image: '⚡', rarity: 'epic' },
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
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'AK-47 | Redline', rarity: 'legendary', value: 450 },
    { id: 2, name: 'AWP | Asiimov', rarity: 'mythic', value: 800 },
    { id: 3, name: 'M4A4 | Howl', rarity: 'epic', value: 350 },
  ]);
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 1, caseName: 'Золотой кейс', itemName: 'AK-47 | Redline', rarity: 'legendary', timestamp: '2 мин назад' },
    { id: 2, caseName: 'Мифический кейс', itemName: 'AWP | Asiimov', rarity: 'mythic', timestamp: '15 мин назад' },
    { id: 3, caseName: 'Легендарный кейс', itemName: 'M4A4 | Howl', rarity: 'epic', timestamp: '1 час назад' },
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

  const openCase = (caseItem: CaseItem) => {
    if (balance < caseItem.price) {
      alert('Недостаточно средств!');
      return;
    }

    setSelectedCase(caseItem);
    setIsOpeningCase(true);
    setBalance(balance - caseItem.price);

    setTimeout(() => {
      const rarities: Rarity[] = ['common', 'rare', 'epic', 'legendary', 'mythic'];
      const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
      const itemValue = Math.floor(Math.random() * 500) + 100;
      
      const newItem: InventoryItem = {
        id: Date.now(),
        name: `Скин ${caseItem.name}`,
        rarity: randomRarity,
        value: itemValue,
      };

      setWonItem(newItem);
      setInventory([newItem, ...inventory]);
      setHistory([
        {
          id: Date.now(),
          caseName: caseItem.name,
          itemName: newItem.name,
          rarity: randomRarity,
          timestamp: 'только что',
        },
        ...history,
      ]);
      setIsOpeningCase(false);
    }, 3000);
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

    setIsUpgrading(true);

    setTimeout(() => {
      const totalValue = selectedUpgradeItems.reduce((sum, item) => sum + item.value, 0);
      const successChance = Math.min(0.5 + (selectedUpgradeItems.length * 0.1), 0.85);
      const success = Math.random() < successChance;

      if (success) {
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="text-3xl">📦</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BoosterBox.gg
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveTab('cases')}
              className={`font-medium transition-colors hover:text-primary ${
                activeTab === 'cases' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Кейсы
            </button>
            <button
              onClick={() => setActiveTab('inventory')}
              className={`font-medium transition-colors hover:text-primary ${
                activeTab === 'inventory' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Инвентарь
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`font-medium transition-colors hover:text-primary ${
                activeTab === 'history' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              История
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`font-medium transition-colors hover:text-primary ${
                activeTab === 'leaderboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Топ игроков
            </button>
            <button
              onClick={() => setActiveTab('upgrade')}
              className={`font-medium transition-colors hover:text-primary ${
                activeTab === 'upgrade' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Апгрейд
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`font-medium transition-colors hover:text-primary ${
                activeTab === 'faq' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              FAQ
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Card className="px-4 py-2 bg-card/50 border-primary/20">
              <div className="flex items-center gap-2">
                <Icon name="Coins" className="text-secondary" size={20} />
                <span className="font-bold text-lg">{balance.toFixed(0)}</span>
              </div>
            </Card>
            <Button size="sm" variant="outline" onClick={() => setShowDepositDialog(true)}>
              <Icon name="Plus" size={16} className="mr-1" />
              Пополнить
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowWithdrawDialog(true)}>
              <Icon name="ArrowDownToLine" size={16} className="mr-1" />
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className={`group relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    rarityColors[caseItem.rarity]
                  } hover:shadow-2xl cursor-pointer`}
                  onClick={() => openCase(caseItem)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20" />
                  <div className="relative p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={rarityColors[caseItem.rarity]}>
                        {rarityLabels[caseItem.rarity]}
                      </Badge>
                      <div className="text-5xl animate-bounce-subtle">{caseItem.image}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{caseItem.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-2xl font-bold text-secondary">
                          <Icon name="Coins" size={24} />
                          {caseItem.price}
                        </div>
                        <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
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
                      <div className="text-2xl">🔫</div>
                    </div>
                    <h3 className="font-bold">{item.name}</h3>
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">
              {wonItem ? '🎉 Поздравляем!' : 'Открываем кейс...'}
            </DialogTitle>
            <DialogDescription className="text-center">
              {wonItem ? 'Вы выиграли:' : 'Ожидайте результат'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            {!wonItem ? (
              <>
                <div className="text-7xl animate-spin-slow">
                  {selectedCase?.image}
                </div>
                <div className="text-lg font-medium animate-pulse">
                  Вращаем барабан...
                </div>
              </>
            ) : (
              <>
                <div className="text-6xl animate-bounce-subtle">🔫</div>
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
  );
};

export default Index;