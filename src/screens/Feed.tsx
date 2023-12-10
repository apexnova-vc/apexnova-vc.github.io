import React, {useState, FormEvent} from 'react';
import {useQuery, gql} from '@apollo/client';
import {GetQuestions} from '../generated/GetQuestions';

// Define the GraphQL query
const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      title
      content
      author {
        id
        name
        email
      }
    }
  }
`;

const App: React.FC = () => {
  const [ newItem, setNewItem ] = useState<string>('');
  const [ error, setError ] = useState<string | null>(null);

  // Use the useQuery hook to fetch the questions with types
  const {loading, data} = useQuery<GetQuestions>(GET_QUESTIONS, {
    fetchPolicy: 'network-only',
    onError: (err) => setError(err.message)  // Set error if the query fails
  });

  // Handle loading from Apollo
  if (loading) return <p>Loading...</p>;

  const handleSubmitNewItem = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Logic to add a new question
    // On failure, you would setError with an appropriate message
  };

  // Render your component
  return (
    <div style={styles.container}>
      {error && <div style={styles.errorMessage}>{error}</div>}
      <form style={styles.form} onSubmit={handleSubmitNewItem}>
        <input
          title="New Question"
          style={styles.input}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Add Item
        </button>
      </form>
      <ul style={styles.list}>
        {data && data.questions && data.questions.map(question => question && (
          <li key={question.id} style={styles.listItem}>
            <p>{question.title}</p>
            <p>{question.content}</p>
            <p>Author: {question.author ? question.author.name : 'Unknown'}</p>
            {/* Add your buttons for editing and deleting here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '5px',
    padding: '8px',
    border: '1px solid #ccc',
  },
  button: {
    marginRight: '5px',
    padding: '5px 10px',
    backgroundColor: '#1da1f2',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
};

export default App;
