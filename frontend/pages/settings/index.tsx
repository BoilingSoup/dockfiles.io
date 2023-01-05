import { Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { SITE_NAME } from "../../config/config";

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>{SITE_NAME} | Settings</title>
      </Head>

      <Text component="h1">Settings</Text>
    </>
  );
};

export default Settings;
