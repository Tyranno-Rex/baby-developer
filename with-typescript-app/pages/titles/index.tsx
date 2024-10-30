
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Title } from '../../interfaces';
import { sampleTitleData } from '../../utils/sample-data';
import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import List from '../../components/List';

type Props = {
  items: Title[];
};



const WithStaticProps = ({ items }: Props) => {
  const [titleList, setTitleList] = useState(items);
  const [newTitle, setNewTitle] = useState('');
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    // 최초 로드 시 API로부터 최신 데이터 가져오기
    const fetchData = async () => {
      const response = await fetch('/api/titles');
      const data = await response.json();
      setTitleList(data);
    };
    fetchData();
  }, []);

  const handleAddTitle = async () => {
    const response = await fetch('/api/titles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTitle }),
    });
    const newTitleItem = await response.json();
    setTitleList([...titleList, newTitleItem]);
    setNewTitle('');
  };

  const handleEditTitle = (id: number) => {
    setIsEditing(id);
    const title = titleList.find((item) => item.id === id)?.name || '';
    setEditTitle(title);
  };

  const handleSaveEdit = async (id: number) => {
    await fetch('/api/titles', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name: editTitle }),
    });
    setTitleList(titleList.map((item) => (item.id === id ? { ...item, name: editTitle } : item)));
    setIsEditing(null);
    setEditTitle('');
  };

  const handleDeleteTitle = async (id: number) => {
    await fetch('/api/titles', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setTitleList(titleList.filter((item) => item.id !== id));
  };

  return (
    <Layout title="Titles List | Next.js + TypeScript Example">
      <h1>Titles List</h1>
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new title"
        />
        <button onClick={handleAddTitle}>Add Title</button>
      </div>
      <ul>
        {titleList.map((item) => (
          <li key={item.id}>
            {isEditing === item.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{item.name}</span>
                <button onClick={() => handleEditTitle(item.id)}>Edit</button>
                <button onClick={() => handleDeleteTitle(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/titles');
  const items: Title[] = await response.json();
  return { props: { items } };
};

export default WithStaticProps;