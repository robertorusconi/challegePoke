import { Button, Input, Spacer, Text } from '@nextui-org/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import { ContextData } from '../context/TodoContext';

export const Navbar = () => {
    const { data } = useContext(ContextData);
    const [search, setSearch] = useState('');
    const isDisabled = useMemo(() => !data.some(pokemon => pokemon.name === search), [search]);
    const router = useRouter();
    const handleSearch = () => {
        const pokemonId = data.find(pokemon => pokemon.name === search)?.id;
        router.push(`/pokemon/${pokemonId}`);
    };
    console.log({ data });

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '50px',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                padding: '0px 20px',
                backgroundColor: 'red',
            }}
        >
            <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="imagen" width={90} height={90} />
            <Text color="white" h2>
                P
            </Text>
            <Text color="white" h3>
                okémon
            </Text>
            <Spacer css={{ flex: 1 }} />
            <Input
                onChange={e => {
                    setSearch(e.target.value);
                }}
                list="pokemons-list"
                css={{ width: '20%' }}
                type="search"
                labelPlaceholder="Search"
            />
            <datalist id="pokemons-list">
                {data.map(pokemon => (
                    <option key={pokemon?.id} value={pokemon.name}></option>
                ))}
            </datalist>
            <Button onClick={handleSearch} disabled={isDisabled}>
                buscar
            </Button>
        </div>
    );
};
