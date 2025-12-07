
import React, { useState } from 'react';
import { User } from '../types';
import { Mic2, ArrowRight, ShieldCheck, FileText, Lock } from 'lucide-react';

interface Props {
  onLogin: (user: User) => void;
}

const ViewAuth: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [quizAnswer, setQuizAnswer] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Email Validation
    if (!email.endsWith('.ac.jp')) {
      setError('大学のメールアドレス（.ac.jp）のみ参加可能です。');
      return;
    }

    // 2. Trust Logic
    const lowAnswer = quizAnswer.trim();
    if (lowAnswer.length < 2) {
      setError('生活実感を伴う回答を入力してください。');
      return;
    }

    // 3. NDA Check
    if (!isAgreed) {
      setError('プロジェクトに参加するには、秘密保持契約への同意が必要です。');
      return;
    }

    // Success Mock
    onLogin({
      email,
      tags: ['#京都芸術大', '#コスパ重視', '#辛口レビュアー', '#iPhoneユーザー'],
      points: 1250,
      messages: [] // Initial empty messages, populated in App.tsx
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 pt-10 pb-20 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-black border border-zinc-700 shadow-[0_0_30px_rgba(239,68,68,0.1)] mb-6">
          <Mic2 className="text-red-500 w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-white mb-3">
          DEVIL’S <span className="text-red-500">VOICE</span>
        </h1>
        <p className="text-zinc-400 text-sm tracking-wide leading-relaxed">
          その「違和感」が、次の時代を創る。<br/>
          企業のための、愛ある批判的提言プラットフォーム。
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 pl-1">
            大学メールアドレス
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="s123456@st.kyoto-art.ac.jp"
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 p-4 rounded-xl focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-zinc-700 font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center pl-1">
             <label className="text-xs font-bold text-zinc-500">
              リアリティチェック（Bot対策）
            </label>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
              <ShieldCheck size={10} />
              <span>生活者認証</span>
            </div>
          </div>
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl mb-2">
            <p className="text-sm text-zinc-300">
              Q. 学食で正直「微妙」だと思うメニューは？
            </p>
          </div>
          <input
            type="text"
            value={quizAnswer}
            onChange={(e) => setQuizAnswer(e.target.value)}
            placeholder="例：〇〇ラーメンの麺が伸びすぎている..."
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 p-4 rounded-xl focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder-zinc-700"
          />
        </div>

        {/* NDA Section */}
        <div className="pt-2">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-4 mb-3">
             <div className="flex items-center gap-2 mb-2 text-red-400">
                <Lock size={14} />
                <span className="text-xs font-bold">秘密保持契約 (NDA)</span>
             </div>
             <p className="text-[10px] text-zinc-500 leading-relaxed h-16 overflow-y-auto pr-2 custom-scrollbar">
               本サービスで閲覧する案件情報（未発表の新商品、サービスUI、デザイン案等）は企業の機密情報を含みます。これらをSNS等で拡散・漏洩した場合、法的責任を問われる可能性があります。あなたの「本音」は、このプラットフォーム内でのみ企業に提供されることに同意します。
             </p>
          </div>
          
          <label className="flex items-center gap-3 cursor-pointer group p-1">
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isAgreed ? 'bg-red-600 border-red-600' : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500'}`}>
              {isAgreed && <ShieldCheck size={12} className="text-white" />}
            </div>
            <input 
              type="checkbox" 
              checked={isAgreed} 
              onChange={(e) => setIsAgreed(e.target.checked)} 
              className="hidden"
            />
            <span className={`text-xs transition-colors ${isAgreed ? 'text-zinc-200' : 'text-zinc-500'}`}>
              利用規約および秘密保持契約に同意する
            </span>
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/20 p-3 rounded-lg border border-red-900/50">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={!isAgreed}
          className={`group w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4 shadow-lg transition-all duration-300 ${
            isAgreed 
              ? 'bg-zinc-100 text-black hover:bg-red-600 hover:text-white shadow-zinc-900/50 cursor-pointer'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <span>プロジェクトに参加する</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-8 text-center border-t border-zinc-900 pt-6">
        <p className="text-[10px] text-zinc-600">
          私たちは、迎合的な意見を求めていません。<br/>
          あなたの主観こそが価値です。
        </p>
      </div>
    </div>
  );
};

export default ViewAuth;
