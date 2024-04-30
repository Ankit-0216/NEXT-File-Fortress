"use client";

import React from "react";
import FileBrowser from "../_components/file-browser";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function FavoritesPage() {
  return (
    <div>
      <FileBrowser title="Favorites" favorites />
    </div>
  );
}
