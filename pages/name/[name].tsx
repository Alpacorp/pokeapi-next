import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { pokeApi } from "../../api";

interface Props {
  pokemon: Pokemon;
}

export const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  console.log("pokemon", pokemon);

  return (
    <Layout>
      <div>
        <h1>por nombre</h1>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pokemonsNames151 = [...Array(151)].map(
    (value, index) => `${index + 1}`
  );

  return {
    paths: pokemonsNames151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);

  return {
    props: {
      pokemon: data,
    },
  };
};
