import { Button, Card, Container, Grid, Text } from "@nextui-org/react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { useState } from "react";
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { localFavorites } from "../../utils";

import confetti from "canvas-confetti";

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  const onToogleFavorite = () => {
    localFavorites.toogleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;
    confetti({
      particleCount: 100,
      spread: 160,
      angle: -100,
      zIndex: 999,
      origin: {
        x: 1,
        y: 0.5,
      },
    });
  };

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={2} sm={4}>
          <Card isHoverable css={{ padding: "2px" }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.home.front_default || "no-image.png"
                }
                alt={pokemon.name}
                width="600px"
                height="200px"
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={20} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToogleFavorite}
              >
                {isInFavorites ? "En favoritos" : "Agregar a favoritos"}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction="row" display="flex" gap={2}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    // paths: [
    //   {
    //     params: { id: "1" },
    //   },
    //   {
    //     params: { id: "2" },
    //   },
    //   {
    //     params: { id: "3" },
    //   },
    // ],
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
