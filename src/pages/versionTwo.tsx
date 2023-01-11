import {useEffect, useState } from 'react';

interface Repo {
  name: string;
  description: string;
}
 // sempre que o usuario mudar o valor de search a lista deverá ser atualizada, usando useEffect vou disparar uma função sempre que a variavel mudar, mas neste caso a pagina ira ser renderizada desnecessariamente

function VersionTwo() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');

console.log('Renderizou')

// ligação a api
  useEffect(()=> {
    fetch('https://api.github.com/users/debslorena/repos')
    .then(response => response.json())
    .then(data => setRepos(data))
  }, [])

//filtro 
// altere useEffect para const
const filteredRepos = search.length > 0 
? repos.filter(repo => repo.name.includes(search))
: [];

  return (
    <div>
      <input name="search" 
      type="text" 
      placeholder='Buscar...'
      onChange={e => setSearch(e.target.value)}
      value={search}
      />
      {search.length > 0 ? (
        <ul>
          {filteredRepos.map(repo => {
            return (
              <li key={repo.name}>
                {repo.name}
              </li>
            )
          })}
        </ul>
        ) : (
          <ul>
          {repos.map(repo => {
            return (
              <li key={repo.name}>
                {repo.name}
              </li>
            )
          })}
        </ul>
        )}
    </div>
  )
}

export default VersionTwo;
