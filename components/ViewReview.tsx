
import React, { useState, useEffect } from 'react';
import { Offer, User } from '../types';
import { X, Send, Sparkles, ExternalLink, Package, Truck, CheckCircle2, AlertCircle, Star } from 'lucide-react';

interface Props {
  offer: Offer;
  user: User | null;
  onComplete: () => void;
  onCancel: () => void;
  onRequestProfileEdit: () => void;
}

type Step = 'BRIEF' | 'SHIPPING' | 'REVIEW';

const ViewReview: React.FC<Props> = ({ offer, user, onComplete, onCancel, onRequestProfileEdit }) => {
  const [step, setStep] = useState<Step>(offer.type === 'PHYSICAL' ? 'BRIEF' : 'REVIEW');
  const [text, setText] = useState('');
  const [isAiDetected, setIsAiDetected] = useState(false);
  const [shippingStatus, setShippingStatus] = useState<'NONE' | 'REQUESTED' | 'DELIVERED'>('NONE');
  const [reliability, setReliability] = useState(0);

  // Simple heuristic for "AI-sounding" text or clichés
  useEffect(() => {
    const aiTriggers = ['考えられます', '包括的', 'ユーザー体験', 'インターフェース', '結論として', '非常に', '最適化'];
    const detected = aiTriggers.some(trigger => text.includes(trigger));
    setIsAiDetected(detected);
  }, [text]);

  const handleRequestSample = () => {
    if (!user?.address) {
      alert("サンプルを受け取るには、マイページで住所を登録する必要があります。");
      onRequestProfileEdit();
      return;
    }
    setShippingStatus('REQUESTED');
    setStep('SHIPPING');
  };

  const handleSimulateDelivery = () => {
    setShippingStatus('DELIVERED');
    setTimeout(() => {
        setStep('REVIEW');
    }, 800);
  };

  // ----------------------------------------------------
  // RENDER: Shipping / Physical Goods Flow
  // ----------------------------------------------------
  if (step === 'BRIEF' && offer.type === 'PHYSICAL') {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-zinc-900">
          <button onClick={onCancel} className="p-2 text-zinc-500 hover:text-white"><X size={24} /></button>
          <span className="text-xs font-bold text-zinc-400">サンプル請求</span>
          <div className="w-10" />
        </div>
        
        <div className="p-8 flex flex-col items-center justify-center flex-1 text-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 border border-zinc-800">
                <Package className="text-zinc-400" size={40} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{offer.title}</h2>
            <p className="text-sm text-zinc-400 mb-8 max-w-xs leading-relaxed">
                この案件は実際に商品を試用・試食する必要があります。<br/>
                登録済み住所へサンプルを発送します。
            </p>

            <div className="w-full max-w-xs bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 mb-8 text-left">
                <p className="text-[10px] text-zinc-500 mb-1">配送先 (マイページで変更可)</p>
                {user?.address ? (
                    <p className="text-sm text-zinc-200">{user.address}</p>
                ) : (
                    <div className="flex items-center gap-2 text-red-400 text-xs">
                        <AlertCircle size={14} />
                        <span>住所が未登録です</span>
                    </div>
                )}
            </div>

            <button 
                onClick={handleRequestSample}
                className="w-full max-w-xs bg-zinc-100 text-black font-bold py-4 rounded-xl hover:bg-white transition-all mb-4"
            >
                サンプルを請求する
            </button>
            {!user?.address && (
                <button onClick={onRequestProfileEdit} className="text-xs text-red-500 underline underline-offset-4">
                    住所を登録する
                </button>
            )}
        </div>
      </div>
    );
  }

  if (step === 'SHIPPING') {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col animate-fade-in">
             <div className="flex items-center justify-between p-4 border-b border-zinc-900">
                <button onClick={onCancel} className="p-2 text-zinc-500 hover:text-white"><X size={24} /></button>
                <span className="text-xs font-bold text-zinc-400">配送状況</span>
                <div className="w-10" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                    <Truck size={64} className="relative z-10 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">発送手続き完了</h2>
                    <p className="text-zinc-500 text-sm">商品は通常2-3日で到着します。<br/>到着後、試用してからレビューを行ってください。</p>
                </div>

                <div className="p-4 border border-zinc-800 bg-zinc-900/50 rounded-lg max-w-xs w-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-xs text-zinc-300">発送済み (本日 14:00)</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-50">
                        <div className="w-2 h-2 bg-zinc-700 rounded-full" />
                        <span className="text-xs text-zinc-500">配送中</span>
                    </div>
                </div>
                
                {/* Prototype Hack */}
                <button 
                    onClick={handleSimulateDelivery}
                    className="mt-8 px-6 py-2 border border-zinc-700 rounded-full text-[10px] text-zinc-500 hover:text-white hover:border-zinc-500 transition-colors"
                >
                    [デバッグ] 3日経過したことにして受取る
                </button>
            </div>
        </div>
    )
  }

  // ----------------------------------------------------
  // RENDER: Main Review Interface
  // ----------------------------------------------------
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-900 bg-black/80 backdrop-blur z-20">
        <button onClick={onCancel} className="p-2 text-zinc-500 hover:text-white">
          <X size={24} />
        </button>
        <span className="text-xs font-bold text-zinc-400">
            {offer.type === 'PHYSICAL' ? '試用後レビュー' : 'N=1 の生活実感'}
        </span>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Visual / Context Area */}
        <div className="p-6 bg-zinc-900/30 border-b border-zinc-900">
            <div className="mb-4">
                <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-1 rounded border border-red-900/50 mb-2 inline-block">
                    Review Target
                </span>
                <h2 className="text-lg font-bold text-white mb-1">{offer.title}</h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">{offer.description}</p>
            </div>

            {/* Media Content */}
            {offer.type === 'DESIGN' && offer.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden border border-zinc-800 relative group">
                    <img src={offer.imageUrl} alt="Target" className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded backdrop-blur">
                        検証用画像
                    </div>
                </div>
            )}

            {offer.type === 'UX' && offer.externalUrl && (
                <div className="mb-4 p-4 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between group cursor-pointer hover:border-zinc-600 transition-colors">
                    <div>
                        <p className="text-xs text-zinc-500 font-bold mb-1">検証用ダミーサイト</p>
                        <p className="text-sm text-blue-400 underline truncate max-w-[200px]">{offer.externalUrl}</p>
                    </div>
                    <a href={offer.externalUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-800 rounded-full group-hover:bg-zinc-700 text-white">
                        <ExternalLink size={16} />
                    </a>
                </div>
            )}

            {offer.type === 'PHYSICAL' && (
                <div className="mb-4 p-3 bg-green-900/20 border border-green-900/50 rounded-lg flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-xs text-green-200">サンプル受取済み</span>
                </div>
            )}
        </div>

        {/* Input Area */}
        <div className="p-6 min-h-[300px] relative flex flex-col">
            <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={offer.placeholder}
            className="flex-1 w-full bg-transparent text-zinc-100 text-base placeholder-zinc-700 resize-none focus:outline-none leading-relaxed font-light mb-6"
            autoFocus
            />

            {/* Reliability Rating */}
            <div className="mb-2 p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
                <div className="flex items-center justify-between mb-3">
                    <label className="text-[10px] font-bold text-zinc-500 flex items-center gap-1">
                        <Star size={10} /> レビューの確信度 (任意)
                    </label>
                    <span className={`text-[10px] font-medium ${reliability > 0 ? 'text-amber-500' : 'text-zinc-700'}`}>
                        {reliability === 0 ? '未選択' : reliability === 3 ? '★ 絶対の自信あり' : reliability === 2 ? '★ まあまあ自信あり' : '★ 自信なし'}
                    </span>
                </div>
                <div className="flex gap-2 justify-center">
                    {[1, 2, 3].map((val) => (
                        <button
                            key={val}
                            onClick={() => setReliability(val)}
                            className="group p-2 focus:outline-none"
                        >
                            <Star 
                                size={28} 
                                fill={reliability >= val ? "#f59e0b" : "none"} 
                                className={`transition-all duration-300 ${
                                    reliability >= val 
                                        ? 'text-amber-500 scale-110' 
                                        : 'text-zinc-700 group-hover:text-zinc-500'
                                }`}
                                strokeWidth={reliability >= val ? 0 : 1.5}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* AI Warning Pop-up */}
            <div className={`transition-all duration-500 transform ${isAiDetected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className="bg-blue-900/20 backdrop-blur text-blue-200 text-xs px-4 py-3 rounded-lg flex items-center gap-3 border border-blue-500/30 mb-2">
                <Sparkles size={16} className="text-blue-400" />
                <span>
                    一般的で綺麗な言葉になっていませんか？<br/>
                    <span className="font-bold">あなたの主観的な感情と言葉</span>で語ってください。
                </span>
            </div>
            </div>
        </div>
      </div>

      {/* Footer / Submit */}
      <div className="p-4 border-t border-zinc-900 bg-black pb-8 relative z-20">
        <div className="flex justify-between items-center mb-4 px-2">
           <span className={`text-[10px] font-bold transition-colors ${text.length > 50 ? 'text-green-500' : 'text-zinc-600'}`}>
             現在 {text.length} 文字
           </span>
           <span className="text-[10px] text-zinc-600">
             最低 50 文字必要
           </span>
        </div>
        <button
          onClick={onComplete}
          disabled={text.length < 50}
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
            text.length >= 50 
              ? 'bg-zinc-100 text-black hover:bg-red-600 hover:text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
              : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
          }`}
        >
          <span>レビューを送信</span>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ViewReview;
