// baseQuery.ts

import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
    baseUrl: "https://clubhubb-backend.vercel.app/",
}); // Replace with your actual base URL
