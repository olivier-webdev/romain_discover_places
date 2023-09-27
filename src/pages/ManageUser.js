import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderAdmin from "../components/headers/HeaderAdmin";
import styles from "./ManageUser.module.scss";
import Popupban from "../components/popups/Popupban";
import { DataContext } from "../context";

const ManageUser = () => {

  // const { user } = useContext(AuthContext);
  const { usersave, UpdateUser, UnbanUser } = useContext(DataContext)

  const [editedUserId, setEditedUserId] = useState(null);
  const [cancel, setCancel] = useState("");
  const [popupban, setPopupban] = useState(false);
  const [userselected, setUserselected] = useState(0);
  const [selectedRole, setSelectedRole] = useState("user");

  // useEffect(() => {
  //   async function fetchUsers() {
  //     try {
  //       const response = await getUsers({});
  //       setUsersave(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchUsers();
  // }, []);

  const handleEdit = (userId) => {
    if (userId === editedUserId && cancel === "save") {
      setCancel("cancel");
    } else {
      setEditedUserId(userId);
      setCancel("save");
    }
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
  };

  const handleBan = () => {
    setPopupban(!popupban);
  };

  
    async function unban(user) {
      console.log(user);
      try {
        await UnbanUser(user);
      } catch (error) {
        console.error(error);
      }
    };

  async function update(User) {
    console.log(User);
    User.role = selectedRole;
    console.log(User);
    try {
      await UpdateUser(User);
      handleEdit();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  }

  const handleSave = async (userId) => {
    await update(userId);
  };

  return (
    <div>
      <HeaderAdmin />
      <div className={`${styles.manageContainer}`}>
        <nav>
          <ul>
            <NavLink className="pr40" to="/manageuser">Gérer les utilisateurs</NavLink>
            <NavLink to="/admin">
              Gérer les formulaires
            </NavLink>
          </ul>
        </nav>
        <div className={`${styles.manageUsers} d-flex jcsb`}>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Rôle</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersave.map((u) => (
                <tr key={u.idUser}>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.pseudo}</td>
                  <td>{u.email}</td>
                  {editedUserId === u.idUser && cancel === "save" ? (
                    <td>
                      <select
                        className={`${styles.select}`}
                        value={selectedRole}
                        name=""
                        id=""
                        onChange={handleRoleChange}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  ) : (
                    <td className="w12">{u.role}</td>
                  )}
                  <td className="d-flex ffrn aic">
                    {editedUserId === u.idUser && cancel === "save" ? (
                      <React.Fragment>
                        <button
                          onClick={() => handleSave(u)}
                          className={`${styles.check} mr10`}
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                        <button
                          onClick={() => handleEdit(u.idUser)}
                          className={`${styles.cancel} d-flex mr30`}
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </React.Fragment>
                    ) : (
                      <button
                        onClick={() => handleEdit(u.idUser)}
                        className={`${styles.modif} mr30`}
                      >
                        Modifier
                      </button>
                    )}
                    {u.banned === 1 ? (
                      <button onClick={() => unban(u)}>
                        Débannir
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleBan();
                          setUserselected(u.idUser);
                        }}
                        className={`${styles.ban}`}
                      >
                        Exclure
                      </button>
                    )}
                    {userselected === u.idUser && popupban && (
                      <Popupban u={u} close={handleBan} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
