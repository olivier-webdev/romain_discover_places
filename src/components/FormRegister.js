import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styles from "./Formauth.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUser } from "../apis/users";
import { useNavigate } from "react-router-dom";

const Formregister = () => {
  const navigate = useNavigate();

  const schema = z.object({
    nom: z
      .string()
      .min(4, "Le nom doit contenir au moins 4 caractères")
      .max(20, "Le nom doit contenir au maximum 20 caractères"),
    prenom: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .max(20, "Le prénom doit contenir au maximum 20 caractères"),
    pseudo: z
      .string()
      .min(4, "Le pseudo doit contenir au moins 4 caractères")
      .max(20, "Le pseudo doit contenir au maximum 20 caractères"),
    email: z.string().email("L'adresse email n'est pas valide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(50, "Le mot de passe ne doit pas dépasser 50 caractères")
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Min. 1 majuscule, 1 chiffre et 1 caractère spécial."
      ),
    confirmPassword: z.string().min(8).max(50),
  });

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setFormError("");
    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }
      const emailDispo = await createUser(data);
      if (emailDispo) {
        navigate("/login");
      } else {
        setFormError("L'email est déjà utilisé");
      }
      // await createUser(data);

      // navigate('/login');
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`d-flex ffcn ${styles.logContainer}`}>
      <form
        className="d-flex ffcn aic"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={`d-flex ffcn jcc aic ${styles.formregister}`}>
          <div className={`${styles.iconeglobe}`}>
            <i className="fa-regular fa-address-card"></i>
          </div>

          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Nom"
              id="nom"
              name="nom"
              {...register("nom")}
            />
            {errors.nom && <span>{errors.nom.message}</span>}
          </div>

          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Prénom"
              id="prenom"
              name="prenom"
              {...register("prenom")}
            />
            {errors.prenom && <span>{errors.prenom.message}</span>}
          </div>

          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Pseudo"
              id="pseudo"
              name="pseudo"
              {...register("pseudo")}
            />
            {errors.pseudo && <span>{errors.pseudo.message}</span>}
          </div>

          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="text"
              autoComplete="off"
              placeholder="E-mail"
              id="email"
              name="email"
              {...register("email")}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="password"
              autoComplete="off"
              placeholder="Mot de passe"
              id="password"
              name="password"
              {...register("password")}
            />
            <p id="progress-bar"></p>
            {errors.password && (
              <span>
                <i className="mr5 fa-solid fa-triangle-exclamation"></i>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="password"
              autoComplete="off"
              placeholder="Confirmation mdp"
              id="confirm"
              name="confirmPassword"
              {...register("confirmPassword")}
            />
            {/* {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>} */}
          </div>
          {formError && <span>{formError}</span>}
        </div>

        <button className="btn1" type="submit" disabled={submitting}>
          REGISTER
        </button>
      </form>
    </div>
  );
};

export default Formregister;
