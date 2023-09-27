import React, { useEffect, useState } from "react";

const Uploadimg = () => {
  const [selectedfile, setSelectedfile] = useState(null);
  const [previewimage, setPreviewimage] = useState(null);

  useEffect(() => {
    async function getImage() {
      const response = await fetch("http://localhost:3000/apis");
      const imgFromBackEnd = await response.json();

      const uint8Array = new Uint8Array(imgFromBackEnd.blobby.data);
      console.log({ uint8Array });
      const blob = new Blob([uint8Array]);
      console.log({ blob });
      const urlImage = URL.createObjectURL(blob);
      console.log({ urlImage });
      fetch(urlImage)
        .then((response) => response.text())
        .then((text) => {
          console.log({ text });
          setPreviewimage(text);
        })
        .catch((error) => console.log(error));
    }
    getImage();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedfile) {
      alert("Veuillez sélectionner un fichier.");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedfile);
    fileReader.onload = async () => {
      const buffer = fileReader.result;
      const blob = new Blob([buffer], { type: selectedfile.type });
      console.log(selectedfile.type);

      const base64 = await convertBlobToBase64(blob);
      console.log({ base64 });

      const obj = { value: base64 };

      fetch(`http://localhost:3003/apis`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedfile(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setPreviewimage(fileReader.result);
      };
    } else {
      setPreviewimage(null);
    }
  };

//   const handleFileChange = (event) => {
//   const files = Array.from(event.target.files);
//   setSelectedfile(files[0]);
//   if (files.length > 0) {
//     const fileReaders = files.map((file) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         setPreviewimage(fileReader.result);
//       };
//       return fileReader;
//     });

//     Promise.all(fileReaders)
//       .then((results) => {
//         const imageBase64s = results.map((result) => result.result);
//         setImages(imageBase64s);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } else {
//     setPreviewimage(null);
//     setImages([]);
//   }
// };

  const convertBlobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(blob);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Avez-vous des photos ?
          <input type="file" onChange={handleFileChange} multiple />
        </label>
        {/* <button type="submit">Valider</button> */}
        {previewimage && (
          <img
            src={previewimage}
            alt="Image preview"
            style={{ width: "40px", height: "40px" }}
          />
        )}
      </form>
    </div>
  );
};

export default Uploadimg;
