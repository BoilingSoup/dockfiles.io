import type { NextPage } from "next";
import { AppShell, MediaQuery, Aside, Text, NavLink } from "@mantine/core";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { Navbar } from "../components/layout/Navbar";
import Head from "next/head";
import { colorSchemeHandler } from "../theme/color-scheme-handler";

const Home: NextPage = () => {
  const [opened, setOpened] = useState(false);

  const navbarToggle = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Home - Dockfiles.io</title>
      </Head>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={<Navbar opened={opened} />}
        header={
          <Header
            links={[]}
            onHamburgerClick={navbarToggle}
          />
        }
        aside={
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
              <Text>Application sidebar</Text>
            </Aside>
          </MediaQuery>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: colorSchemeHandler(theme.colorScheme, {
              light: theme.colors.blue[0],
              dark: theme.colors.slate[9],
            }),
          },
        })}
      >
        {/* <Button onClick={() => toggleColorScheme()}>toggle</Button> */}
      </AppShell>
    </>
  );
};

export default Home;
