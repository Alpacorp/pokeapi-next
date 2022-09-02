import { FC } from "react";
import Head from "next/head";
import { NavBar } from "../ui/";

interface Props {
  title?: string;
  children: React.ReactNode;
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Alejandro Palacios" />
        <meta name="description" content="Información de Pokemones" />
        <meta
          name="keywords"
          content="pokemon, pokemones, información, informacion, informacion de pokemones, informacion de pokemon"
        />
      </Head>
      <NavBar />
      <main style={{ padding: "0 20px" }}>{children}</main>
    </>
  );
};
