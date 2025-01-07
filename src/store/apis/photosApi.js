import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../thunks/fetchUsers";
import { faker } from "@faker-js/faker";

const photsApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      //REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removePhoto: builder.mutation({
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: "DELETE",
          };
        },
      }),
      addPhotos: builder.mutation({
        query: (album) => {
          return {
            url: "photos",
            method: "POST",
            body: {
              albumId: album.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchPhotos: builder.query({
        query: (album) => {
          return {
            url: "photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotosMutation,
  useRemovePhotoMutation,
} = photsApi;
export { photsApi };
