import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import axios from 'axios';

interface Item {
  _id: string;
  data: string;
}

const API_BASE_URL = 'http://localhost:3005';

const App: React.FC = () => {
  const [ items, setItems ] = useState<Item[]>([]);
  const [ newItem, setNewItem ] = useState<string>('');
  const [ error, setError ] = useState<string>('');
  const [ editItemId, setEditItemId ] = useState<string | null>(null);
  const [ editText, setEditText ] = useState<string>('');

  useEffect(() => {
    axios.get<Item[]>(`${API_BASE_URL}/questions`)
      .then(response => setItems(response.data))
      .catch(() => setError('Error fetching data'));
  }, []);

  const handleSubmitNewItem = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (newItem.trim() !== '') {
      // const newItemObj = {data: newItem};
      axios.post<Item>(`${API_BASE_URL}/question`, {"title": "How do I log in to our password store?", "content": "My desktop password did not work"})
        .then(response => {
          setItems(prevItems => [ ...prevItems, response.data ]);
          setNewItem('');
        })
        .catch(() => setError('Error adding item'));
    }
  };

  const deleteItem = (id: string): void => {
    axios.delete(`${API_BASE_URL}/data/${id}`)
      .then(() => setItems(items.filter(item => item._id !== id)))
      .catch(() => setError('Error deleting item'));
  };

  const startEditing = (item: Item): void => {
    setEditItemId(item._id);
    setEditText(item.data);
  };

  const cancelEditing = (): void => {
    setEditItemId(null);
    setEditText('');
  };

  const saveItem = (id: string): void => {
    if (editText.trim() !== '') {
      axios.put<Item>(`${API_BASE_URL}/data/${id}`, {data: editText})
        .then(response => {
          setItems(items.map(item => item._id === id ? response.data : item));
          cancelEditing();
        })
        .catch(() => setError('Error updating item'));
    }
  };

  const handleNewItemChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewItem(event.target.value);
  };

  const handleEditChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditText(event.target.value);
  };

  return (
    <div style={styles.container}>
      {error && <div style={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmitNewItem} style={styles.form}>
        <label htmlFor="newItem" style={styles.label}>New Item:</label>
        <input
          id="newItem"
          type="text"
          value={newItem}
          onChange={handleNewItemChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Item</button>
      </form>

      <ul style={styles.list}>
        {items.map(item => (
          <li key={item._id} style={styles.listItem}>
            {editItemId === item._id ? (
              <form key="form" onSubmit={() => saveItem(item._id)} style={styles.form}>
                <input
                  title="content"
                  value={editText}
                  onChange={handleEditChange}
                  style={styles.input}
                />
                <button type="submit" style={styles.button}>Save</button>
                <button type="button" onClick={cancelEditing} style={styles.button}>Cancel</button>
              </form>
            ) : (
              <>
                {item.data}
                <button key="b1" type="button" onClick={() => startEditing(item)} style={styles.button}>Edit</button>
                <button key="b2" type="button" onClick={() => deleteItem(item._id)} style={styles.button}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px'
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px'
  },
  form: {
    marginBottom: '20px'
  },
  label: {
    marginRight: '10px',
  },
  input: {
    marginRight: '5px',
  },
  button: {
    marginRight: '5px',
    padding: '5px 10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  listItem: {
    marginBottom: '10px'
  }
};

export default App;
