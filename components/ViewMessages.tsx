
import React from 'react';
import { User, Message } from '../types';
import { Mail, Star, Building2, ChevronRight, User as UserIcon } from 'lucide-react';

interface Props {
  user: User;
}

const ViewMessages: React.FC<Props> = ({ user }) => {
  const messages = user.messages || [];

  return (
    <div className="px-5 pt-8 pb-20">
      <div className="flex justify-between items-end mb-6">
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">受信トレイ</h2>
            <p className="text-zinc-500 text-xs">企業からの特別招待・スカウト</p>
        </div>
        <div className="relative">
            <Mail size={24} className="text-zinc-400" />
            {messages.some(m => !m.isRead) && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
            <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800 border-dashed">
                <p className="text-zinc-500 text-sm">現在メッセージはありません</p>
            </div>
        ) : (
            messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className={`relative p-5 rounded-xl border transition-all cursor-pointer group ${
                        !msg.isRead 
                        ? 'bg-zinc-900 border-red-900/50' 
                        : 'bg-black border-zinc-900 opacity-80'
                    }`}
                >
                    {!msg.isRead && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full" />
                    )}

                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                            msg.type === 'VIP' ? 'bg-amber-900/20 border-amber-500/30 text-amber-500' :
                            msg.type === 'INVITE' ? 'bg-blue-900/20 border-blue-500/30 text-blue-500' :
                            'bg-zinc-800 border-zinc-700 text-zinc-400'
                        }`}>
                            {msg.type === 'VIP' ? <Star size={14} fill="currentColor" /> : 
                             msg.type === 'INVITE' ? <Building2 size={14} /> : 
                             <UserIcon size={14} />}
                        </div>
                        <div>
                            <p className="text-[10px] text-zinc-500 font-medium">{msg.sender}</p>
                            <p className="text-[10px] text-zinc-600">{msg.date}</p>
                        </div>
                    </div>

                    <h3 className={`text-sm font-bold mb-2 ${!msg.isRead ? 'text-zinc-100' : 'text-zinc-400'}`}>
                        {msg.title}
                    </h3>
                    
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-3">
                        {msg.body}
                    </p>

                    <div className="flex justify-end">
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1 group-hover:text-red-500 transition-colors">
                            詳細を見る <ChevronRight size={12} />
                        </span>
                    </div>
                </div>
            ))
        )}
      </div>

      <div className="mt-8 p-4 bg-zinc-900/30 rounded-xl border border-zinc-800 text-center">
        <p className="text-[10px] text-zinc-500 leading-relaxed">
            <span className="text-red-500 font-bold">Level 2</span> 以上で企業からの直接スカウト、<br/>
            <span className="text-red-500 font-bold">Level 3</span> 以上で経営者からの食事会招待が届きます。
        </p>
      </div>
    </div>
  );
};

export default ViewMessages;
