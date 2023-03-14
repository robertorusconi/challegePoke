import { SmallPokemon } from '@component/interfaces';
import { createContext } from 'react';

type TPokemonContext = {
    data: SmallPokemon[];
};

export const ContextData = createContext<TPokemonContext>({ data: [] });
