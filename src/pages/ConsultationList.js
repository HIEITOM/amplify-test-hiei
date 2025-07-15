import React, { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { listConsultations } from '../graphql/queries';

const client = generateClient();

const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const result = await client.graphql({
        query: listConsultations
      });
      setConsultations(result.data.listConsultations.items);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: '対応待ち',
      in_progress: '対応中',
      resolved: '解決済み'
    };
    return statusMap[status] || status;
  };

  if (loading) return <div>読み込み中...</div>;

  return (
    <div>
      <h2>相談履歴</h2>
      {consultations.length === 0 ? (
        <p>相談履歴がありません。</p>
      ) : (
        <div>
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
              <h3>{consultation.title}</h3>
              <p><strong>ステータス:</strong> {getStatusText(consultation.status)}</p>
              <p><strong>作成日:</strong> {new Date(consultation.createdAt).toLocaleDateString('ja-JP')}</p>
              <p><strong>内容:</strong> {consultation.content}</p>
              {consultation.attachedFileUrl && (
                <p><strong>添付ファイル:</strong> あり</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConsultationList;