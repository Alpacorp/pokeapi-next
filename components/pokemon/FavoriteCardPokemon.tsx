import { Card, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";

interface Props {
  pokemonId: number;
}

export const FavoriteCardPokemon: React.FC<Props> = ({ pokemonId }) => {
  const router = useRouter();

  const onFavoriteClicked = () => {
    router.push(`/pokemon/${pokemonId}`);
  };

  return (
    <Grid
      onClick={onFavoriteClicked}
      xs={6}
      sm={3}
      md={2}
      xl={1}
      key={pokemonId}
    >
      <Card isPressable css={{ padding: 10, cursor: "pointer" }}>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          alt={`Pokemon ${pokemonId}`}
          width={250}
          height={250}
        />
      </Card>
    </Grid>
  );
};
