import { useEffect, useState } from "react";
import { Card, Container, Grid, Image, Text } from "@nextui-org/react";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { localFavorites } from "../../utils";
import { FavoritePokenons } from "../../components/pokemon";

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout title="Pokemones Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritePokenons pokemons={favoritePokemons} />
      )}
    </Layout>
  );
};

export default Favorites;
