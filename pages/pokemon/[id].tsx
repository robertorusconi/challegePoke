import { Layout } from '../../components/layout';
import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { PokeApi } from '@component/api';
import { Pokemon } from '../../interfaces';
import { Grid, Card, Text } from '@nextui-org/react';

interface Props {
    id: string;
    data: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ id, data }) => {
    const router = useRouter();
    
    const abilitiesNames = data.abilities.map(a => a.ability.name);
    return (
        <Layout>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Body css={{ p: 1 }}>
                            <Card.Image src={data.sprites.other?.dream_world.front_default || 'no se encontro'} alt={data.name} width="100%" height={200} />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1>{data?.name}</Text>
                        </Card.Header>
                        <Card.Body css={{ p: 1 }}>
                            <Text>HP: {data.stats[0].base_stat}</Text>
                            <Text>Ataque: {data.stats[1].base_stat}</Text>
                            <Text>Defensa: {data.stats[2].base_stat}</Text>
                            <Text> Abilidad: {abilitiesNames.join(', ')}</Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async ctx => {
    const pokemons100 = [...Array(100)].map((value, index) => `${index + 1}`);
    return {
        paths: pokemons100.map(id => ({
            params: { id },
        })),
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const { data } = await PokeApi.get<Pokemon>(`/pokemon/${id}`);

    return {
        props: {
            id,
            data,
        },
    };
};
export default PokemonPage;
