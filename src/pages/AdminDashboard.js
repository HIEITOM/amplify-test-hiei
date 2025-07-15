import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import type { Schema } from '../../amplify/data/resource';

const client = generateClient<Schema>();

const AdminDashboard = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [actionComment, setActionComment] = useState('');

  useEffect(() => {
    fetchAllConsultations();
  }, []);

  const fetchAllConsultations = async () => {
    try {
      const { data: consultations } = await client.models.Consultation.list();
      setConsultations(consultations);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (consultationId, newStatus) => {
    try {
      await client.models.Consultation.update({
        id: consultationId,
        status: newStatus
      });
      
      await client.models.Action.create({
        consultationId,
        actionType: 'status_update',
        comment: `ステータスを${newStatus}に変更`
      });

      fetchAllConsultations();
      alert('ステータスを更新しました');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('更新に失敗しました');
    }
  };

  const addComment = async () => {
    if (!selectedConsultation || !actionComment.trim()) return;

    try {
      await client.models.Action.create({
        consultationId: selectedConsultation.id,
        actionType: 'comment',
        comment: actionComment
      });

      setActionComment('');
      setSelectedConsultation(null);
      alert('コメントを追加しました');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('コメント追加に失敗しました');
    }
  };

  const getStatusStats = () => {
    const stats = consultations.reduce((acc, consultation) => {
      acc[consultation.status] = (acc[consultation.status] || 0) + 1;
      return acc;
    }, {});
    return stats;
  };

  if (loading) return <div>読み込み中...</div>;

  const stats = getStatusStats();

  return (
    <div>
      <h2>管理者ダッシュボード</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3>統計</h3>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <strong>対応待ち:</strong> {stats.pending || 0}
          </div>
          <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <strong>対応中:</strong> {stats.in_progress || 0}
          </div>
          <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <strong>解決済み:</strong> {stats.resolved || 0}
          </div>
        </div>
      </div>

      <h3>全相談一覧</h3>
      {consultations.map((consultation) => (
        <div 
          key={consultation.id} 
          style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            marginBottom: '10px',
            borderRadius: '5px'
          }}
        >
          <h4>{consultation.title}</h4>
          <p><strong>ユーザー:</strong> {consultation.owner}</p>
          <p><strong>ステータス:</strong> {consultation.status}</p>
          <p><strong>作成日:</strong> {new Date(consultation.createdAt).toLocaleDateString('ja-JP')}</p>
          <p><strong>内容:</strong> {consultation.content}</p>
          
          <div style={{ marginTop: '10px' }}>
            <button 
              onClick={() => updateStatus(consultation.id, 'in_progress')}
              style={{ marginRight: '10px', padding: '5px 10px' }}
            >
              対応中にする
            </button>
            <button 
              onClick={() => updateStatus(consultation.id, 'resolved')}
              style={{ marginRight: '10px', padding: '5px 10px' }}
            >
              解決済みにする
            </button>
            <button 
              onClick={() => setSelectedConsultation(consultation)}
              style={{ padding: '5px 10px' }}
            >
              コメント追加
            </button>
          </div>
        </div>
      ))}

      {selectedConsultation && (
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h4>コメント追加</h4>
          <textarea
            value={actionComment}
            onChange={(e) => setActionComment(e.target.value)}
            rows="4"
            style={{ width: '300px', padding: '8px' }}
            placeholder="対応内容を入力してください"
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={addComment} style={{ marginRight: '10px' }}>
              追加
            </button>
            <button onClick={() => setSelectedConsultation(null)}>
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;