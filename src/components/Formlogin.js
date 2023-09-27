import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Formauth.module.scss";
import { NavLink, Navigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthContext } from "../context";

const schema = z.object({
  email: z.string().email("L'adresse email n'est pas valide"),
  password: z.string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(50, "le mot de passe ne doit pas dépasser 50 caractères")
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Min. 1 majuscule, 1 chiffre et 1 caractère spécial")
})


const Formlogin = () => {
  const { signin, user } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    password:'',
  })

  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) })

  // axios.defaults.withCredentials = true;
  const submit = handleSubmit(async (values) => {
    try {
      clearErrors();
      await signin(values);
    } catch (error) {
      setFormError(error.message);
    }
    });

  //   e.preventDefault();
  //   axios.post('http://localhost:8080/login', values)
  //   .then(res => {
  //     if(res.data.Status === "Success") {
  //       navigate('/')
  //     } else {
  //       alert(res.data.Message)
  //     }
  //   })
  //   .catch(err => console.log(err));    
  // }

  return (
    <>
    {user ? (
      <Navigate to="/profil" />
    ) : (
<div className={`d-flex ffcn aic ${styles.logContainer}`}>
      <form
        onSubmit={submit}
        className="d-flex ffcn aic"
      >
        <div className={`d-flex ffcn jcc aic ${styles.formlogin}`}>
        <div className={`${styles.iconeglobe}`}><i className="fa-solid fa-right-to-bracket"></i></div>
          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="text"
              placeholder="e-mail"
              id="email"
              name="email"
              onChange={e => setValues({...values, email: e.target.value})}
              {...register("email")}
            />
          {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className={`d-flex ffcn ${styles.entree}`}>
            <input
              type="password"
              placeholder="mot de passe"
              id="password"
              name="password"
              onChange={e => setValues({...values, password: e.target.value})}
              {...register("password")}
            />
            {errors.password && <span><i className="mr5 fa-solid fa-triangle-exclamation"></i>{errors.password.message}</span>}
          </div>
          {formError && <span>{formError}</span>}
        </div>
        <button disabled={isSubmitting} className="btn1" type="submit">LOGIN</button>
      </form>
      <p className="ffpoppins mt20">pas de compte ?</p>
      <NavLink to="/register">
        <p className="toregister">inscris-toi</p>
      </NavLink>
    </div>
    )}
    </>
  );
};

export default Formlogin;
