import * as React from 'react';
import { fetchDogFacts, DogFactType } from './dog-facts';

type FormProps = {
  onSubmit: (n: number) => void;
};

const Form = ({ onSubmit }: FormProps) => {
  const [number, setNumber] = React.useState<number>(0);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(+e.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(number);
      }}
    >
      <div className="fact-input">
        <label htmlFor="number-of-facts">Number of Dog Facts</label>
        <input
          type="number"
          value={number}
          onChange={handleNumberChange}
          min="1"
          max="10"
          id="number-of-facts"
        />
      </div>
      <input disabled={!number} type="submit" value="Fetch Dog Facts" />
    </form>
  );
};

const Fact = ({ fact }: { fact: string }) => {
  return (
    <article className="dog-fact">
      <h3>Dog Fact</h3>
      <p>{fact}</p>
    </article>
  );
};

const Application = () => {
  const [dogFacts, setDogFacts] = React.useState<DogFactType[]>([]);

  const onSubmit = async (n: number) => {
    const res = await fetchDogFacts(n);
    setDogFacts(res);
  };

  return (
    <main>
      <Form onSubmit={onSubmit} />
      <section>
        {!!dogFacts.length &&
          dogFacts.map((fact) => {
            return <Fact fact={fact.fact} />;
          })}
      </section>
    </main>
  );
};

export default Application;
