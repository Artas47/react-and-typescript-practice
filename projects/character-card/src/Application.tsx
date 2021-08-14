import React, { useEffect, useState } from 'react';

import { CharacterType, fetchCharacter } from './characters';

import { Loading } from './Loading';
import { CharacterInformation } from './CharacterInformation';

const Application = () => {
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await fetchCharacter();
      setCharacter(data);
      setLoading(false);
      console.log(`data`, data);
    };
    fetch();
  }, []);

  return (
    <main>
      {loading && <Loading />}
      {character && <CharacterInformation character={character} />}
    </main>
  );
};

export default Application;
