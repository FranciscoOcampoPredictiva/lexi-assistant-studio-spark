
import { useAuth } from '@/hooks/useAuth';
import Auth from '@/components/Auth';
import Chat from '@/components/Chat';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }

  return user ? <Chat /> : <Auth />;
};

export default Index;
