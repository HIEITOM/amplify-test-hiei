import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import ConsultationForm from './pages/ConsultationForm';
import ConsultationList from './pages/ConsultationList';
import AdminDashboard from './pages/AdminDashboard';
import Navigation from './components/Navigation';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <div className="App">
            <Navigation signOut={signOut} user={user} />
            <main style={{ padding: '20px' }}>
              <Routes>
                <Route path="/" element={<ConsultationForm />} />
                <Route path="/consultations" element={<ConsultationList />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
          </div>
        </Router>
      )}
    </Authenticator>
  );
}

export default App;