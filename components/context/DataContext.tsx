import { PokeApi } from '@component/api';
import { PokemonListResponse, SmallPokemon } from '@component/interfaces';
import { useEffect, useState } from 'react';
import { ContextData } from './TodoContext';

export const DataContext = ({ children }: { children: React.ReactNode }) => {
    const [data, setData] = useState<SmallPokemon[]>([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await PokeApi.get<PokemonListResponse>('/pokemon?limit=100');
            const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
                ...poke,
                id: i + 1,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`,
            }));
            setData(pokemons);
        };
        getData();
    }, []);

    return <ContextData.Provider value={{ data }}>{children}</ContextData.Provider>;
};
