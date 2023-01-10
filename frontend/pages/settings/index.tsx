import { Accordion, Button, Center, Container, Group, Text, TextInput } from "@mantine/core";
import { IconChevronDown, IconPlus, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Divider } from "../../components/common/Divider";
import { mainContainerSx } from "../../components/common/styles";
import { Avatar } from "../../components/settings/Avatar";
import { formMaxWidth, formWidth, titleTextSx } from "../../components/settings/styles";
import { SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";

const Settings: NextPage = () => {
  useRedirectUnauthenticated("/");
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Settings</title>
      </Head>

      {user && (
        <Container sx={mainContainerSx}>
          <Center>
            <Text component="h1" sx={titleTextSx}>
              Account Settings
            </Text>
          </Center>
          <Center style={{ justifyContent: "space-around", flexDirection: "column" }}>
            <Avatar mt={50} />
            <div style={{ maxWidth: formMaxWidth, width: formWidth, margin: "auto", marginTop: "30px" }}>
              <TextInput mt="lg" label="Display Name" placeholder="Name" value={user.name} />
              <TextInput mt="lg" label="Email" placeholder="Email" />
              <Group mt="xl">
                <Button mt="lg">Resend Verification Email</Button>
                <Button mt="lg">Save Changes</Button>
              </Group>
            </div>
          </Center>
          <Divider mt={30} size="xl" />
          <Center style={{ alignItems: "center", maxWidth: formMaxWidth, width: formWidth, margin: "auto" }}>
            <Accordion
              variant="separated"
              chevron={<IconChevronDown size={16} />}
              styles={{
                chevron: {
                  "&[data-rotate]": {
                    transform: "rotate(180deg)",
                  },
                },
                label: {
                  maxWidth: formMaxWidth,
                  width: formWidth,
                },
                control: {
                  maxWidth: formMaxWidth,
                  width: formWidth,
                  color: "rgba(240, 13, 69, 0.8)",
                },
              }}
              mt={50}
            >
              <Accordion.Item value="customization">
                <Accordion.Control>Delete your account?</Accordion.Control>
                <Accordion.Panel>
                  This action can not be undone.
                  <Button color="red">Delete Account</Button>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Center>
        </Container>
      )}
    </>
  );
};

export default Settings;
