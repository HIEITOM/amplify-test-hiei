import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/api';
import { uploadData } from 'aws-amplify/storage';
import { createConsultation } from '../graphql/mutations';

const client = generateClient();

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'pending'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = null;
      
      if (file) {
        const result = await uploadData({
          key: `consultations/${Date.now()}-${file.name}`,
          data: file
        }).result;
        fileUrl = result.key;
      }

      await client.graphql({
        query: createConsultation,
        variables: {
          input: {
            ...formData,
            attachedFileUrl: fileUrl
          }
        }
      });

      alert('相談を送信しました');
      setFormData({ title: '', content: '', status: 'pending' });
      setFile(null);
    } catch (error) {
      console.error('Error:', error);
      alert('送信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>パワハラ相談フォーム</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>タイトル:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>相談内容:</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows="6"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>添付ファイル:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: '5px' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '送信中...' : '相談を送信'}
        </button>
      </form>
    </div>
  );
};

export default ConsultationForm;