import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Novo repositório ${Date.now()}`,
      url: "http://github.com/rlindoso",
      techs: ["React.js", "Node.js"]
    }
    api.post('repositories', repository).then(response => {
      setRepositories([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const idx = repositories.findIndex(el => el.id === id);
    repositories.splice(idx, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
