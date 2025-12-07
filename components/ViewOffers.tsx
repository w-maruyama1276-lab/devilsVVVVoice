import React from 'react';
import { Offer } from '../types';
import { ChevronRight, Zap, Target, Box, Smartphone, Image as ImageIcon } from 'lucide-react';

interface Props {
  onSelectOffer: (offer: Offer) => void;
}

const OFFERS_DATA: Offer[] = [
  {
    id: '1',
    type: 'DESIGN',
    company: '某大手飲料メーカー',
    title: '新発売エナドリのデザイン検証',
    rewardLevel: 2,
    tags: ['#美大生視点', '#徹夜作業', '#パッケージ'],
    description: "新商品のパッケージデザイン案について。マーケティング部内では好評ですが、現場（徹夜作業中）の学生が手に取りたくなるか、忖度なしで評価してください。",
    placeholder: "「研究室の机に置いたとき、ダサいと感じるか？」という視点で、色使いやフォントについて具体的に...",
    imageUrl: "https://placehold.co/600x400/111/crimson?text=New+Energy+Drink+Design"
  },
  {
    id: '2',
    type: 'UX',
    company: 'NextGen Mobile',
    title: '格安プラン解約フローのストレス調査',
    rewardLevel: 1,
    tags: ['#iPhoneユーザー', '#UX改善', '#節約家'],
    description: "「解約しづらい」という声を受けています。実際に解約画面（ダミーサイト）まで進み、引き留め工作にどれだけ不快感を感じたか、率直な感情データを求めています。",
    placeholder: "「プリンターが紙詰まりした時」のようなイライラと比較してどうでしたか？どのボタンが一番誤解を招くか...",
    externalUrl: "https://example.com/dummy-cancellation"
  },
  {
    id: '3',
    type: 'PHYSICAL',
    company: '冷凍食品ベンチャー',
    title: '800円の高級冷凍パスタの価値',
    rewardLevel: 3,
    tags: ['#一人暮らし', '#グルメ', '#コスパ'],
    description: "学食2回分（800円）の価値がある商品か検証したいです。サンプルを送付しますので、実際に喫食し、学生の厳しい財布の紐を緩めるだけの「説得力」が味にあるかジャッジしてください。",
    placeholder: "丸亀製麺の釜揚げうどん（並）と比較して、この価格を出す価値はありますか？食感は...",
  }
];

const ViewOffers: React.FC<Props> = ({ onSelectOffer }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'PHYSICAL': return <Box size={14} />;
      case 'UX': return <Smartphone size={14} />;
      default: return <ImageIcon size={14} />;
    }
  };

  return (
    <div className="px-5 pt-8 pb-20">
      {/* Header Profile Summary */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">マッチング中の案件</h2>
          <p className="text-zinc-500 text-xs">あなたの属性と生活スタイルに基づくオファー</p>
        </div>
        <div className="flex -space-x-2">
           <div className="w-8 h-8 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-[10px] text-zinc-400">#芸</div>
           <div className="w-8 h-8 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-[10px] text-zinc-400">#節</div>
        </div>
      </div>

      {/* User Tags Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {['#京都芸術大', '#コスパ重視', '#辛口', '#iPhone', '#夜型'].map((tag) => (
          <span key={tag} className="flex-shrink-0 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] text-zinc-400 font-medium whitespace-nowrap">
            {tag}
          </span>
        ))}
      </div>

      {/* Offers Grid */}
      <div className="space-y-4">
        {OFFERS_DATA.map((offer) => (
          <div
            key={offer.id}
            onClick={() => onSelectOffer(offer)}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-red-900 hover:bg-zinc-900/80 transition-all cursor-pointer overflow-hidden"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/0 via-red-900/0 to-red-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-3 relative z-10">
              <div className="flex gap-2">
                <span className="text-[10px] font-bold text-red-500 tracking-wider flex items-center gap-1 bg-red-950/20 px-2 py-0.5 rounded border border-red-900/30">
                  {offer.rewardLevel === 3 ? <Zap size={10} fill="currentColor" /> : <Target size={10} />}
                  Lv.{offer.rewardLevel}
                </span>
                <span className="text-[10px] font-medium text-zinc-400 tracking-wider flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                  {getIcon(offer.type)}
                  {offer.type === 'PHYSICAL' ? '現物支給' : offer.type === 'UX' ? 'Web体験' : 'デザイン'}
                </span>
              </div>
              <span className="text-zinc-500 text-[10px]">{offer.company}</span>
            </div>

            <h3 className="text-lg font-bold text-zinc-100 mb-2 relative z-10 group-hover:text-white transition-colors">
              {offer.title}
            </h3>
            
            <p className="text-sm text-zinc-400 line-clamp-2 mb-4 relative z-10 leading-relaxed">
              {offer.description}
            </p>

            <div className="flex justify-between items-center relative z-10">
              <div className="flex gap-1 flex-wrap">
                {offer.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[10px] text-zinc-500 bg-black/50 px-2 py-1 rounded border border-zinc-800">
                     {tag}
                   </span>
                ))}
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-950 flex items-center justify-center text-zinc-500 group-hover:text-red-500 group-hover:border-red-900/30 border border-zinc-800 transition-all">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOffers;