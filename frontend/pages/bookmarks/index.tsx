import { Container, Text } from "@mantine/core";
import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { CategoriesSearch } from "../../components/common/categories-search/CategoriesSearch";
import { mainContainerSx } from "../../components/common/styles";
import { SITE_NAME } from "../../config/config";
import { useAuth } from "../../contexts/AuthProvider";
import { useRedirectUnauthenticated } from "../../hooks/helpers/useRedirectUnauthenticated";
import { useBookmarksCategoriesSearch } from "../../zustand-store/bookmarks/useBookmarksCategoriesSearch";

const Bookmarks: NextPage = () => {
  useRedirectUnauthenticated("/");

  const { input, setInput, select, setSelect } = useBookmarksCategoriesSearch();
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>{SITE_NAME} | Bookmarks</title>
      </Head>

      <Container sx={mainContainerSx}>
        <CategoriesSearch inputValue={input} onChangeInput={setInput} selectValue={select} onChangeSelect={setSelect} />
        <Text component="h1">Bookmarks</Text>
      </Container>
    </>
  );
};

export default Bookmarks;
