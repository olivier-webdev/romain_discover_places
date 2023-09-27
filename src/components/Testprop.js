import React, { useContext, useRef, useState } from "react";
import styles from "./Modifprofil.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { PropContext } from "../context/PropContext";


const TestProp = () => {
    // const [prop, setProp] = useState(null);

  const [img, setImg] = useState();
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const formRef = useRef(null);

  const { formprop } = useContext(PropContext)

  // const [nomlieu, setNomlieu] = useState("");
  // const [nompays, setNompays] = useState("");
  // const [comment, setComment] = useState("");

  const validationSchema = yup.object({
    nomlieu: yup.string().required(),
    nompays: yup.string().required(),
    comment: yup.string().required(),
  })

  const initialValues = {
    nomlieu: "",
    nompays: "",
    comment: "",
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ initialValues, resolver: yupResolver(validationSchema)})

  const submit = handleSubmit(async (values) => {
    try {
      console.log(values);
      await formprop({ values });
      clearErrors();
    } catch (message) {
      setError("generic", { type: "generic", message})
    }
  })

  const displayImage = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
      var reader = new FileReader();
      reader.onload = function (e) {
        document.querySelector("#img").setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

    return (
        <div>
            <form
              ref={formRef}
              className={`d-flex ffcn mt20`}
              onSubmit={submit}
            >
              <div className="d-flex ffcn">
                <label htmlFor="nomlieu">Nom du lieu</label>
                <input
                  // onChange={(e) => setNomlieu(e.target.value)}
                  type="text"
                  id="nomlieu"
                  name="nomlieu"
                  {...register("nomlieu")}
                />
                {errors.nomlieu && <span>{errors.nomlieu.message}</span>}
              </div>
              <div className="mt15 d-flex ffcn">
                <label htmlFor="nompays">Pays du lieu</label>
                <input
                  // onChange={(e) => setNompays(e.target.value)}
                  type="text"
                  id="nompays"
                  name="nompays"
                  {...register("nompays")}
                />
                {errors.nompays && <span>{errors.nompays.message}</span>}
              </div>
              <div className="mt15 d-flex ffcn">
                <label htmlFor="comment">
                  Dîtes-nous en plus sur l'endroit (500 c)
                </label>
                <textarea
                  // onChange={(e) => setComment(e.target.value)}
                  type="text"
                  id="comment"
                  name="comment"
                  {...register("comment")}
                />
                {errors.comment && <span>{errors.comment.message}</span>}
              </div>
              <div className="mt15 d-flex ffcn">
                  <label htmlFor="image">Avez-vous des photos ? (max 10)</label>
                  <div className={`d-flex ffcn aic ${styles.uploadimg}`}>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={displayImage}
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
                      // type="submit"
                      disabled={isSubmitting}
                    >
                      Proposer
                    </button>
                  </div>
                </div>
            </form>
        </div>
    );
};

export default TestProp;