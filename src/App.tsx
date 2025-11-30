import { useLanguage } from './contexts/LanguageContext';
import { useAuth } from './contexts/AuthContext';
import { MainLayout } from './components/MainLayout';
import { MarketplacePage } from './pages/MarketplacePage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { AIQualityPage } from './pages/AIQualityPage';

function App() {
  const { currentLanguage, switchLanguage } = useLanguage();
  const { user } = useAuth();

  return (
    <MainLayout
      language={currentLanguage}
      onLanguageChange={switchLanguage}
      userName={user?.name}
    >
      <div className="grid gap-6">
        <MarketplacePage />
        <DashboardPage />
        <AdminPanelPage />
        <AIQualityPage />
      </div>
    </MainLayout>
  );
}

export default App;
