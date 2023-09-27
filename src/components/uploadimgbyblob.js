import React, { useContext, useState } from 'react';
import { AuthContext } from '../context';

const uploadimgbyblob = () => {
  const { user } = useContext(AuthContext);
  
  const [nomlieu, setNomlieu] = useState("");
  const [nompays, setNompays] = useState("");

  const [selectedfile, setSelectedfile] = useState(null);
  const [previewimage, setPreviewimage] = useState(null);
  const [images, setImages] = useState([]);

  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit2 = async (event) => {
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

      // const obj = { value: base64 };

      const obj = {
        nomlieu: nomlieu,
        nompays: nompays,
        image: base64
      }

    //   fetch(`http://localhost:3000/apis`, {
    //   method: "POST",
    //   body: JSON.stringify(obj),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     alert("Proposition soumise avec succès!");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

      try {
        await sendProp(obj);
        alert("Proposition soumise avec succès!");
      } catch (error) {
        console.error(error);
      }
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
        <div className={`d-flex ffcn jcc aic ${styles.historic}`}>
            <h5 className="mb20">Propose-nous <strong>un lieu insolite</strong></h5>
            <form
            onSubmit={handleSubmit2}
            className={`d-flex ffcn mt20`}
          >
            <div className="d-flex ffcn">
              <label htmlFor="nomlieu">Nom du lieu</label>
              <input
                onChange={(e) => setNomlieu(e.target.value)}
                type="text"
                id="nomlieu"
                name="nomlieu"
              />
            </div>
            <div className="mt15 d-flex ffcn">
              <label htmlFor="name">Pays du lieu</label>
              <input
                onChange={(e) => setNompays(e.target.value)}
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="mt15 d-flex ffcn">
              <label>Avez-vous des photos ?</label>
              <div className={`d-flex ffrn ${styles.uploadimg}`}>
              <input
                // onChange={(e) => setEmail(e.target.value)}
                type="file"
                onChange={handleFileChange}
                multiple
              />
              {previewimage && (
                <img src={previewimage} alt="image preview" />
              )}
              </div>
            </div>
            {/* <Uploadimg setImages={setImages} /> */}
            <button type="submit" className="mt30" disabled={submitting}>
              Proposer
            </button>
          </form>
        </div>
    );
};

export default uploadimgbyblob;