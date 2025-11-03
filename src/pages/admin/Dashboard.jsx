import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Alert from '../../components/common/Alert';
import ProfileEditor from '../../components/admin/ProfileEditor';
import ProjectsManager from '../../components/admin/ProjectsManager';
import SkillsManager from '../../components/admin/SkillsManager';
import ExperienceManager from '../../components/admin/ExperienceManager';
import { useAuth } from '../../hooks/useApi';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showAlert, setShowAlert] = useState(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Experience', icon: '📚' },
  ];

  const handleLogout = async () => {
    await logout();
    setShowAlert({ type: 'success', message: 'Logged out successfully!' });
    setTimeout(() => navigate('/'), 1500);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileEditor onSuccess={() => setShowAlert({ type: 'success', message: 'Profile updated!' })} />;
      case 'projects':
        return <ProjectsManager onSuccess={() => setShowAlert({ type: 'success', message: 'Project saved!' })} />;
      case 'skills':
        return <SkillsManager onSuccess={() => setShowAlert({ type: 'success', message: 'Skill saved!' })} />;
      case 'experience':
        return <ExperienceManager onSuccess={() => setShowAlert({ type: 'success', message: 'Experience saved!' })} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-night via-night/95 to-ocean/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-sand mb-2">Admin Dashboard</h1>
            <p className="text-mist/80">Manage your portfolio content</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="hover:bg-danger/10 hover:text-danger transition-colors"
          >
            Logout
          </Button>
        </motion.div>

        {/* Alert Messages */}
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6"
          >
            <Alert
              type={showAlert.type}
              onClose={() => setShowAlert(null)}
            >
              {showAlert.message}
            </Alert>
          </motion.div>
        )}

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-2 backdrop-blur-md bg-night/50 border border-mist/10">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all duration-300
                    flex items-center gap-2 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'bg-linear-to-r from-ocean to-mist text-sand shadow-lg shadow-ocean/30'
                        : 'text-mist/60 hover:text-sand hover:bg-ocean/10'
                    }
                  `}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Profile', icon: '👤', color: 'from-ocean' },
            { label: 'Projects', icon: '💼', color: 'from-mist' },
            { label: 'Skills', icon: '⚡', color: 'from-sand' },
            { label: 'Experience', icon: '📚', color: 'from-ocean' },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="p-4 backdrop-blur-md bg-night/50 border border-mist/10 hover:border-ocean/30 transition-all duration-300"
            >
              <div className={`text-3xl mb-2 bg-linear-to-r ${stat.color} to-transparent bg-clip-text`}>
                {stat.icon}
              </div>
              <p className="text-sm text-mist/60">{stat.label}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard
