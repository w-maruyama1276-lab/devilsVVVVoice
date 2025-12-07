import React from 'react';
import { User, Reward } from '../types';
import { Gift, Lock, Truck, Car, CreditCard } from 'lucide-react';

interface Props {
  user: User | null;
}

const REWARDS_DATA: Reward[] = [
  { id: '1', title: 'Amazonギフト券 (¥500)', cost: 500, level: 1, icon: 'card' },
  { id: '2', title: 'デジタル耳栓（作業用）', cost: 1500, level: 2, icon: 'gift' },
  { id: '3', title: 'HHKB Professional HYBRID', cost: 5000, level: 2, icon: 'truck' },
  { id: '4', title: '経営者との1on1移動権', cost: 99999, level: 3, icon: 'car' },
];

const ViewRewards: React.FC<Props> = ({ user }) => {
  const points = user?.points || 0;
  // Calculate level progress (mock)
  const progressPercent = Math.min((points / 5000) * 100, 100);

  const renderIcon = (type: string) => {
    switch (type) {
      case 'card': return <CreditCard size={20} />;
      case 'car': return <Car size={20} />;
      case 'truck': return <Truck size={20} />;
      default: return <Gift size={20} />;
    }
  };

  return (
    <div className="px-5 pt-8 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">獲得リワード</h2>

      {/* Points Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 relative overflow-hidden group">
        <div className="relative z-10">
          <p className="text-zinc-500 text-xs font-bold mb-1">現在の貢献ポイント</p>
          <div className="text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
            {points.toLocaleString()} <span className="text-sm font-normal text-red-500">PTS</span>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-[10px] text-zinc-500 mb-2 font-medium">
              <span>Lv.1 レビュアー</span>
              <span>Lv.3 パートナー</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-1000" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Background deco */}
        <div className="absolute right-[-20px] top-[-20px] text-zinc-800 opacity-30 rotate-12 transition-transform group-hover:rotate-6 group-hover:scale-110">
          <Gift size={120} />
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-3">
        {REWARDS_DATA.map((reward) => {
          const isLocked = points < reward.cost;
          return (
            <div 
              key={reward.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                isLocked 
                  ? 'bg-black border-zinc-900 opacity-60' 
                  : 'bg-zinc-900 border-zinc-700 hover:border-red-500/30 cursor-pointer hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isLocked ? 'bg-zinc-900 text-zinc-700' : 'bg-blue-900/20 text-blue-400'
                }`}>
                  {isLocked ? <Lock size={16} /> : renderIcon(reward.icon)}
                </div>
                <div>
                  <h4 className={`font-bold text-sm ${isLocked ? 'text-zinc-600' : 'text-zinc-200'}`}>
                    {reward.title}
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-medium bg-zinc-950 px-2 py-0.5 rounded inline-block mt-1">
                    Lv.{reward.level} 必要
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-sm font-mono font-bold ${
                  isLocked ? 'text-zinc-700' : 'text-zinc-300'
                }`}>
                  {reward.cost}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewRewards;