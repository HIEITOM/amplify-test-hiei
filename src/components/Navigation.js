import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ signOut, user }) => {
  const isAdmin = user?.signInUserSession?.accessToken?.payload['cognito:groups']?.includes('admin');

  return (
    <nav style={{ 
      padding: '10px 20px', 
      backgroundColor: '#f5f5f5', 
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none' }}>
          相談フォーム
        </Link>
        <Link to="/consultations" style={{ marginRight: '20px', textDecoration: 'none' }}>
          相談履歴
        </Link>
        {isAdmin && (
          <Link to="/admin" style={{ marginRight: '20px', textDecoration: 'none' }}>
            管理者ダッシュボード
          </Link>
        )}
      </div>
      <div>
        <span style={{ marginRight: '10px' }}>こんにちは、{user.username}さん</span>
        <button onClick={signOut}>ログアウト</button>
      </div>
    </nav>
  );
};

export default Navigation;