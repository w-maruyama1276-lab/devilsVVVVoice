import React, { useState } from 'react';
import { User } from '../types';
import { Save, User as UserIcon, MapPin, AtSign } from 'lucide-react';

interface Props {
  user: User;
  onSave: (user: User) => void;
}

const ViewProfile: React.FC<Props> = ({ user, onSave }) => {
  const [name, setName] = useState(user.name || '');
  const [address, setAddress] = useState(user.address || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...user,
      name,
      address
    });
  };

  return (
    <div className="px-5 pt-8 pb-20">
      <h2 className="text-2xl font-bold text-white mb-6">マイページ設定</h2>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-8 text-center">
         <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-4 flex items-center justify-center border border-zinc-700">
             <UserIcon size={40} className="text-zinc-500" />
         </div>
         <p className="text-zinc-200 font-bold">{user.email}</p>
         <p className="text-xs text-zinc-500 mt-1">認証済みユーザー</p>
         
         <div className="flex justify-center gap-2 mt-4">
             {user.tags.map(tag => (
                 <span key={tag} className="text-[10px] bg-black border border-zinc-800 px-2 py-1 rounded text-zinc-400">
                     {tag}
                 </span>
             ))}
         </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 pl-1 flex items-center gap-2">
                <AtSign size={12} />
                ニックネーム
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="表示名を入力"
                className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 p-4 rounded-xl focus:outline-none focus:border-red-500/50 transition-all placeholder-zinc-700 text-sm"
            />
        </div>

        <div className="space-y-2">
            <div className="flex justify-between items-center pl-1">
                <label className="text-xs font-bold text-zinc-500 flex items-center gap-2">
                    <MapPin size={12} />
                    配送先住所
                </label>
                <span className="text-[10px] text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-900/50">
                    現物支給案件に必須
                </span>
            </div>
            <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="〒606-8271 京都府京都市左京区北白川..."
                className="w-full h-24 bg-zinc-900 border border-zinc-800 text-zinc-100 p-4 rounded-xl focus:outline-none focus:border-red-500/50 transition-all placeholder-zinc-700 text-sm resize-none"
            />
            <p className="text-[10px] text-zinc-600 pl-1">
                ※ サンプル品やリワードの発送に使用されます。
            </p>
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-100 text-black font-bold py-4 rounded-xl hover:bg-zinc-300 transition-all flex items-center justify-center gap-2 mt-8 shadow-lg shadow-zinc-900/50"
        >
          <Save size={18} />
          <span>情報を更新する</span>
        </button>
      </form>
    </div>
  );
};

export default ViewProfile;