import { Layout } from '../components/layout';
import { GetStaticProps, NextPage } from 'next';
import { PokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { Grid } from '@nextui-org/react';
import { PockemonCard } from '../components/pokemon';

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
    return (
        <Layout>
            <Grid.Container gap={2} justify="flex-start">
                {pokemons.map(pokemon => (
                    <PockemonCard key={pokemon?.id} pokemon={pokemon} />
                ))}
            </Grid.Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async ctx => {
    const { data } = await PokeApi.get<PokemonListResponse>('/pokemon?limit=100');
    const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
        ...poke,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`,
    }));

    return {
        props: {
            pokemons,
        },
    };
};

export default HomePage;
