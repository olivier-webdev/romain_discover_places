const API_USERS = "/api/users";

export async function createUser(newUser) {
    const response = await fetch(API_USERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
    })
    const responseFromBE = await response.json();
    if (response.ok) {
        return responseFromBE;
    } else {
        if (responseFromBE) {
            throw responseFromBE
        } else {
            throw new Error("Error Api CreateUser")
        }
    }
}

export async function modifProfil(newUserInfo) {
    const response = await fetch(`${API_USERS}/modifprofil`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserInfo), 
    });
    const responseFromBE = await response.json();
  if (response.ok) {
    return responseFromBE;
  } else {
    if (responseFromBE) {
      throw responseFromBE;
    } else {
      throw new Error("Failed to update user");
    }
  }
}