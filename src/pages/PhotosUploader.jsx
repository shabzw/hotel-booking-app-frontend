import React from "react";
import { useState } from "react";

const PhotosUploader = (props) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [photoLink, setPhotoLink] = useState("");

  // Uploading files in local "uploads" folder inside "api" directory
  async function addPhotoByLink(ev) {
    ev.preventDefault();
    fetch(`${API_BASE_URL}/api/account/upload-from-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ link: photoLink }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const filename = data.imageUrl;
        props.setAddedPhotos((prev) => {
          return [...prev, filename];
        });
        setPhotoLink("");
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  }
  // ==================================================
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    fetch(`${API_BASE_URL}/api/account/upload`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: data,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        const filenames = data.filenames;
        props.setAddedPhotos((prev) => [...prev, ...filenames]);
      })
      .catch((error) => {
        console.error("There was a problem with the upload operation:", error);
      });
  }
  // ==================================================
  function removePhoto(filename) {
    props.setAddedPhotos([
      ...props.addedPhotos.filter((photo) => photo !== filename),
    ]);
  }

  // adding the favourate photo in the index of 0 of the array
  function selectAsMainPhoto(filename) {
    const addedPhotosWithoutSelected = props.addedPhotos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    props.setAddedPhotos(newAddedPhotos);
  }

  return (
    <>
      <div className="flex">
        <input
          className="m-2"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder={"Add using a link....jpeg"}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-transparent bg-gray-600 text-white rounded-xl px-4 h-10"
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="gap-2 mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {/* setting the state of addedphotos with the photos we uploaded by storing in local and using to display in webpage */}
        {props.addedPhotos.length > 0 &&
          props.addedPhotos.map((link) => (
            <div className="h-32 flex relative" key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={link}
                alt="Photo"
              />
              <button
                onClick={() => removePhoto(link)}
                className="absolute bottom-1 left-1 cursor-pointer text-white bg-black p-1 rounded-xl px-1 py-1 bg-opacity-50"
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              {/* selectAsMainPhoto will shift the photo to the start of the array. We send the filename as the argument in selectAsMainPhoto */}
              <button
                onClick={() => selectAsMainPhoto(link)}
                className="absolute bottom-1 right-1 cursor-pointer text-white bg-black p-1 rounded-xl px-1 py-1 bg-opacity-50"
              >
                {/* If the photo/filename is in the beginning of array then display below icon */}
                {link === props.addedPhotos[0] && (
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                )}
                {link !== props.addedPhotos[0] && (
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
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        <label className="h-32 cursor-pointer flex items-center justify-center border rounded-2xl bg-transparent p-6 text-xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
