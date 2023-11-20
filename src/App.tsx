import React, {useEffect, useState, ChangeEvent} from 'react';
import axios from 'axios';

interface Item {
  _id: string;
  data: string;
}

const App: React.FC = () => {
  const [ items, setItems ] = useState<Item[]>([]);
  const [ newItem, setNewItem ] = useState<string>('');

  useEffect(() => {
    axios.get<Item[]>('http://localhost:3000/data')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addNewItem = (): void => {
    if (newItem.trim() !== '') {
      axios.post<Item>('http://localhost:3000/data', {data: newItem})
        .then(response => {
          setItems([ ...items, response.data ]);
          setNewItem('');
        })
        .catch(error => console.error('Error adding item:', error));
    }
  };

  const deleteItem = (id: string): void => {
    axios.delete(`http://localhost:3000/data/${id}`)
      .then(() => {
        setItems(items.filter(item => item._id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const updateItem = (id: string, newData: string): void => {
    axios.put<Item>(`http://localhost:3000/data/${id}`, {data: newData})
      .then(response => {
        setItems(items.map(item => item._id === id ? response.data : item));
      })
      .catch(error => console.error('Error updating item:', error));
  };

  const handleNewItemChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewItem(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        aria-label="New Item"
        value={newItem}
        onChange={handleNewItemChange}
      />
      <button type="button" onClick={addNewItem}>Add Item</button>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.data}
            <button type="button" onClick={() => deleteItem(item._id)}>Delete</button>
            <button type="button" onClick={() => updateItem(item._id, prompt('New Data:', item.data) || item.data)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
