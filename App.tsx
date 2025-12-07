
import React, { useState } from 'react';
import { AppView, User, Offer, Message } from './types';
import { List, Gift, UserCircle, Mail } from 'lucide-react';
import ViewAuth from './components/ViewAuth';
import ViewOffers from './components/ViewOffers';
import ViewReview from './components/ViewReview';
import ViewRewards from './components/ViewRewards';
import ViewProfile from './components/ViewProfile';
import ViewMessages from './components/ViewMessages';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.AUTH);
  const [user, setUser] = useState<User | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleLogin = (userProfile: User) => {
    // ログイン時にダミーメッセージを注入（Lvに応じた演出）
    const initialMessages: Message[] = [
      {
        id: '1',
        sender: 'Devil\'s Voice 運営事務局',
        title: 'プロジェクト参加ありがとうございます',
        body: 'あなたの「本音」が企業のサービスを変えます。まずは案件一覧から、気になるオファーを探してレビューを投稿してください。',
        date: '2024/05/20',
        isRead: false,
        type: 'SYSTEM'
      },
      {
        id: '2',
        sender: '株式会社NextGen',
        title: '【限定招待】製品開発会議へのオンライン参加について',
        body: '先日のUXレビューを拝見し、非常に鋭い視点に感銘を受けました。つきましては、次期プロダクトの仕様策定会議にオブザーバーとして参加いただけないでしょうか？謝礼もご用意しております。',
        date: '2024/05/22',
        isRead: false,
        type: 'INVITE'
      }
    ];

    setUser({ ...userProfile, messages: initialMessages });
    setCurrentView(AppView.OFFERS);
  };

  const handleSelectOffer = (offer: Offer) => {
    setSelectedOffer(offer);
    setCurrentView(AppView.REVIEW);
  };

  const handleReviewComplete = () => {
    if (user) {
      setUser({ ...user, points: user.points + 500 });
    }
    setCurrentView(AppView.REWARDS);
    setSelectedOffer(null);
  };

  const handleUpdateProfile = (updatedUser: User) => {
      setUser(updatedUser);
      setCurrentView(AppView.OFFERS); 
  };

  const NavButton = ({ view, icon: Icon, label, disabled = false, badge = 0 }: { view: AppView; icon: any; label: string, disabled?: boolean, badge?: number }) => (
    <button
      onClick={() => !disabled && setCurrentView(view)}
      disabled={disabled}
      className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
        currentView === view ? 'text-red-500' : disabled ? 'opacity-40 cursor-not-allowed text-zinc-600' : 'text-zinc-600 hover:text-zinc-400'
      }`}
    >
      <div className="relative">
        <Icon size={20} strokeWidth={currentView === view ? 2.5 : 2} />
        {badge > 0 && (
          <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[8px] w-3.5 h-3.5 flex items-center justify-center rounded-full border border-black">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] tracking-wider font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-black border-x border-zinc-900 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Background Ambience - 社会貢献感のある知的な青と情熱の赤 */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 relative z-10 scroll-smooth">
        {currentView === AppView.AUTH && <ViewAuth onLogin={handleLogin} />}
        
        {currentView === AppView.OFFERS && (
          <ViewOffers onSelectOffer={handleSelectOffer} />
        )}
        
        {currentView === AppView.REVIEW && selectedOffer && (
          <ViewReview 
            offer={selectedOffer} 
            user={user}
            onComplete={handleReviewComplete} 
            onCancel={() => setCurrentView(AppView.OFFERS)}
            onRequestProfileEdit={() => setCurrentView(AppView.PROFILE)}
          />
        )}

        {currentView === AppView.REWARDS && (
          <ViewRewards user={user} />
        )}

        {currentView === AppView.MESSAGES && user && (
          <ViewMessages user={user} />
        )}

        {currentView === AppView.PROFILE && user && (
            <ViewProfile user={user} onSave={handleUpdateProfile} />
        )}
      </main>

      {/* Sticky Navigation */}
      {currentView !== AppView.AUTH && (
        <nav className="fixed bottom-0 w-full max-w-md bg-black/90 backdrop-blur-xl border-t border-zinc-900 h-16 z-50">
          <div className="flex items-center justify-around h-full">
            <NavButton view={AppView.OFFERS} icon={List} label="案件一覧" />
            <NavButton view={AppView.REWARDS} icon={Gift} label="リワード" />
            
            <div className="w-px h-6 bg-zinc-800" />
            
            <NavButton 
              view={AppView.MESSAGES} 
              icon={Mail} 
              label="受信箱" 
              badge={user?.messages.filter(m => !m.isRead).length || 0}
            />
            <NavButton view={AppView.PROFILE} icon={UserCircle} label="マイページ" />
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
