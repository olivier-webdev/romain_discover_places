import { useEffect, useState } from "react";
import { DataContext } from "../../context";

import { getUsers, updateRole as newUpdateUser, unbanUsers as newUnbanUser, banUsers as newBanUser, suppUser as newSuppUser } from "../../apisadmin/viewusers";

export default function DataProvider({ children }) {
  // État local pour stocker les utilisateurs
  const [usersave, setUsersave] = useState([]);

  useEffect(() => {
    // Utilisation de useEffect pour exécuter une action au chargement du composant
    async function fetchUsers() {
      try {
        // Appel à l'API pour récupérer les utilisateurs
        const response = await getUsers({});
        // Mise à jour de l'état avec les utilisateurs récupérés
        setUsersave(response);
      } catch (error) {
        console.error(error);
      }
    }
    // Appel de la fonction fetchUsers au chargement initial du composant (tableau de dépendances vide)
    fetchUsers();
  }, []);

  // Fonction de mise à jour d'un utilisateur
  function updateUser(newUser) {
    console.log(usersave);
    console.log(newUser);
    // Mise à jour de l'état en remplaçant l'utilisateur correspondant
    setUsersave(
      usersave.map((u) =>
        u.idUser === newUser.idUser ? newUser : u
      )
    );
  }

  async function UpdateUser(values) {
    // Appel à la fonction d'API pour mettre à jour l'utilisateur
    await newUpdateUser(values);
    try {
      // Mise à jour de l'état local après la mise à jour réussie
      updateUser(values);
    } catch (error) {
      throw error;
    }
  }

  function deleteUser(user) {
    setUsersave(usersave.filter((u) => u.idUser !== user.idUser));
  }

  async function DeleteUser(values) {
    await newSuppUser(values);
    try {
      deleteUser(values);
    } catch (error) {
      throw error;
    }
  }

  function banUser(user) {
    setUsersave(
      usersave.map((u) => {
        if (u.idUser === user.idUser) {
          return { ...u, banned: 1 };
        } else {
          return u;
        }
      })
    );
  }

  async function BanUser(values) {
    await newBanUser(values);
    try {
      banUser(values);
    } catch (error) {
      throw error;
    }
  }

  function unbanUser(user) {
    setUsersave(
        usersave.map((u) => {
            if (u.idUser === user.idUser) {
                return { ...u, banned: 0 };
            } else {
                return u;
            }
        })
    )
  }

  async function UnbanUser(values) {
    await newUnbanUser(values);
    try {
        unbanUser(values);
    } catch (error) {
        throw error;
    }
  }

  // Rendu du composant avec le contexte DataContext fournissant les valeurs usersave et UpdateUser aux composants enfants
  return (
    <DataContext.Provider value={{ usersave, UpdateUser, UnbanUser, BanUser, DeleteUser }}>
      {children}
    </DataContext.Provider>
  );
}