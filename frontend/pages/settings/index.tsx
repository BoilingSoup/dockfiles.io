import { Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dockfiles.io | Settings</title>
      </Head>

      <Text component="h1">Settings</Text>
    </>
  );
};

export default Settings;