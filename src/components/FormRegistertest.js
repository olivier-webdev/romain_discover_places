import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Formauth.module.scss";

const Formregister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  function submit(values) {
    console.log(values);
  }

  return (
    <div className={`d-flex ffcn ${styles.logContainer}`}>
      <form className="d-flex ffcn aic"
        action=""
        onSubmit={handleSubmit(submit)}>
      <div className={`d-flex ffcn jcc aic ${styles.formregister}`}>
      <div className={`${styles.iconeglobe}`}><i className="fa-regular fa-address-card"></i></div>
        <div>
          <input type="text" placeholder="Nom" id="nom" name="nom" />
        </div>
        <div>
          <input type="text" placeholder="Nom" id="prenom" name="prenom" />
        </div>
        <div>
          <input
            type="email"
            placeholder="e-mail"
            id="email"
            {...register("email", {
              minLength: {
                value: 3,
                message: "Au minimum 3 caractères",
              },
              required: {
                value: true,
                message: "ce champ doit être rempli",
              },
            })}
          />
        </div>
        {errors?.email && <p>{errors.email.message}</p>}
        <div>
          {/* <i class="fa-solid fa-user"></i> */}
          <input
            type="password"
            placeholder="mot de passe"
            id="password"
            name="password"
            {...register("password", {
              required: {
                value: true,
                message: "Ce champ doit être rempli",
              },
            })}
          />
        </div>
        {errors?.password && <p>{errors.password.message}</p>}
        <div>
          {/* <i class="fa-solid fa-user"></i> */}
          <input
            type="password"
            placeholder="Confirmation mdp"
            id="confPassword"
            name="confPassword"
            {...register("confPassword", {
              required: {
                value: true,
                message: "Ce champ doit être rempli",
              },
            })}
          />
        </div>
        {errors?.password && <p>{errors.password.message}</p>}
      </div>
      <button>REGISTER</button>
      </form>
    </div>
  );
};

export default Formregister;
