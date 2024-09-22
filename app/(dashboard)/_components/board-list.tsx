"use client";

import Image from "next/image";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyBoard } from "./empty-board";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export default function BoardList({ orgId, query }: BoardListProps) {
  const data = [];

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoard />;
  }

  return <div>{JSON.stringify({ query })}</div>;
}
