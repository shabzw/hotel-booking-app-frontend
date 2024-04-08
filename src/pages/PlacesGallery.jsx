import React from "react";
import { useState } from "react";
const PlacesGallery = ({ place }) => {
  const [showAllPhotos, setshowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-w-full min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div className="">
            <h2 className="mr-24 text-3xl">Photos of {place.title}</h2>
            <button
              onClick={() => setshowAllPhotos(false)}
              className="text-black fixed right-12 top-8 flex gap-1 py-1 px-2 rounded-2xl shadow shadow-black bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Close Photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={place.id}>
                <img src={photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-md overflow-hidden">
          <div className="">
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setshowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setshowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={place.photos[1]}
                alt=""
              />
            )}

            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setshowAllPhotos(true)}
                  className="aspect-square object-cover relative top-2 cursor-pointer"
                  src={place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setshowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 py-2 px-2 rounded-2xl bg-white shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
};

export default PlacesGallery;
