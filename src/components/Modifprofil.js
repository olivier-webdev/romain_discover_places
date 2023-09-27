import React, { useContext, useRef, useState } from "react";
import styles from "./Modifprofil.module.scss";
import { AuthContext } from "../context";
import { modifProfil } from "../apis/users";
import { sendProp } from "../apis/prop";

const Modifyprofil = () => {
  const { user } = useContext(AuthContext);

  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const formRef = useRef(null);

  const [email, setEmail] = useState(user.email);
  const [prenom, setPrenom] = useState(user.prenom);
  const [nom, setNom] = useState(user.nom);

  const [nomlieu, setNomlieu] = useState("");
  const [nompays, setNompays] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [filename, setFilename] = useState("");

  async function modif() {
    try {
      const newUserInfo = {
        nom,
        prenom,
        email,
        idUser: user.idUser,
      };
      await modifProfil(newUserInfo);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    modif();
  };

  const onImageChange = (e) => {
    if (e.target.files.length > 1) {
      setImages(e.target.files);
      setImage(null);
      setImageFile(null); // Réinitialiser l'aperçu de l'image
    } else if (e.target.files.length === 1) {
      // setImage(e.target.files[0]);
      const file = e.target.files[0];
      setImage(file);
      setImages(null);

      const reader = new FileReader();
      reader.onload = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmitImage(e, responseFromBE) {
    console.log(responseFromBE);
    e.preventDefault();
    const data = new FormData(); // Crée une instance de FormData pour stocker les données du formulaire
    console.log(data);
    if (image === null) {
      // Si l'image est nulle, cela signifie qu'il y a plusieurs images sélectionnées
      for (let i = 0; i < images.length; i++) {
        data.append("image", images[i]); // Ajoute chaque image au FormData en utilisant la clé "image"
      }
      // ajout de append(values(formulaire voir provider create event andrew et step4))

      // Envoie la requête POST pour télécharger les images
      fetch("http://localhost:8080/api/imgupload/images", {
        method: "POST",
        body: {
          data,
        },
      }).then(() => {
        setImages(null); // Réinitialise l'état des images à null
        formRef.current.reset(); // Réinitialise le formulaire
      });
    } else {
      // Sinon, il y a une seule image sélectionnée
      data.append("image", image); // Ajoute l'image au FormData

      // Envoie la requête POST pour télécharger l'image
      fetch("http://localhost:8080/api/imgupload/image", {
        method: "POST",
        body: 
          data,
          responseFromBE,
      })
        .then((res) => res.json()) // Analyse la réponse JSON renvoyée par le serveur
        .then((json) => {
          // Effectue une requête GET pour récupérer l'URL de l'image téléchargée
          fetch(
            `http://localhost:8080/api/imgupload/image/${json.filename}`
          ).then((res) => {
            setImageFile(res.url); // Met à jour l'URL de l'image dans l'état de l'application
            setImage(null); // Réinitialise l'image sélectionnée à null
            formRef.current.reset();
          });
        });
    }
  }

  const onSubmitProp = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const currentDate = new Date().toLocaleDateString("fr-FR");
      const newProp = {
        nomlieu: nomlieu,
        nompays: nompays,
        comment: comment,
        idUser: user.idUser,
        dateprop: currentDate,
      };
      const responseFromBE = await sendProp(newProp);
      console.log(responseFromBE);
      await onSubmitImage(e, responseFromBE);
      formRef.current.reset();
    } catch (error) {
      console.error("Failed to submit proposal:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // const onSubmitProp = async (e) => {
  //   e.preventDefault();
  //   setSubmitting(true);
  //   try {
  //     await onSubmitImage(e);
  //     const newProp = {
  //       nomlieu: nomlieu,
  //       nompays: nompays,
  //     };
  //     console.log(newProp);
  //     await sendProp(newProp);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setSubmitting(false)
  //   }
  // }

  let firstLetterPrenom = prenom.charAt(0);
  let firstLetterNom = nom.charAt(0);

  return (
    <div className="d-flex ffrn jcc ">
      <div className={`${styles.profilContainer}`}>
        <div className={`d-flex ffcn aic ${styles.modifprofil}`}>
          <span className="d-flex ffrn jcc aic">
            {firstLetterPrenom + firstLetterNom}
          </span>
          {user && (
            <p className="mt20">
              Bonjour,{" "}
              <b>
                {prenom} {nom}
              </b>
            </p>
          )}
          <p className="mt20">Mes Informations</p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className={`d-flex ffcn mt20 ${styles.modifInfos}`}
          >
            <div className="d-flex ffcn">
              <label htmlFor="prenom">Prénom</label>
              <input
                defaultValue={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                type="text"
                id="prenom"
                name="prenom"
              />
            </div>
            <div className="mt15 d-flex ffcn">
              <label htmlFor="name">Nom de famille</label>
              <input
                defaultValue={nom}
                onChange={(e) => setNom(e.target.value)}
                type="text"
                id="name"
                name="name"
              />
            </div>
            <div className="mt15 d-flex ffcn">
              <label htmlFor="email">Adresse E-mail</label>
              <input
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
              />
            </div>
            <button type="submit" className="mt30 mb30">
              Sauvegarder
            </button>
          </form>
        </div>
        {user.role === "" && (
          <div className={`d-flex ffcn jcc aic ${styles.historic}`}>
            <h5 className="mb10 mt30">
              Propose-nous <b>un lieu insolite</b>
            </h5>
            <form
              ref={formRef}
              className={`d-flex ffcn mt20`}
              onSubmit={onSubmitProp}
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
                <label htmlFor="nompays">Pays du lieu</label>
                <input
                  onChange={(e) => setNompays(e.target.value)}
                  type="text"
                  id="nompays"
                  name="nompays"
                />
              </div>
              <div className="mt15 d-flex ffcn">
                <label htmlFor="comment">
                  Dîtes-nous en plus sur l'endroit (500 c)
                </label>
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  id="comment"
                  name="comment"
                />
              </div>
              <div className="mt15 d-flex ffcn">
                <div onSubmit={onSubmitImage}>
                  <label htmlFor="image">Avez-vous des photos ? (max 10)</label>
                  <div className={`d-flex ffcn aic ${styles.uploadimg}`}>
                    <input
                      className=""
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={onImageChange}
                      multiple
                    />
                    {images && (
                      <div className={`d-flex ffcn ${styles.imguplds}`}>
                        <div className={`d-flex ffrw jcc mb10`}>
                          {Array.from(images).map((image, index) => (
                            <img
                              key={index}
                              src={URL.createObjectURL(image)}
                              alt=""
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setImage(null);
                            setImages(null);
                            setImageFile(null);
                          }}
                        >
                          Annuler la sélection
                        </button>
                      </div>
                    )}
                    {imageFile && <img src={imageFile} alt="" />}
                    <button
                      className="w20 mt20 mb30"
                      type="submit"
                      disabled={submitting}
                    >
                      Proposer
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modifyprofil;
