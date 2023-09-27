const API_VIEWUSERS = "http://localhost:8080/apiadmin/viewusers";

export async function getUsers() {
    const response = await fetch(API_VIEWUSERS);
      const responseFromBE = await response.json();
      if (response.ok) {
        return responseFromBE;
      } else {
        if (responseFromBE) {
          throw responseFromBE;
        } else {
          throw new Error("Error Api Lieux");
        }
      }
}

const API_BANUSERS = "http://localhost:8080/apiadmin/banuser"

export async function banUsers(userBanned) {
  console.log(userBanned);
  const response = await fetch(`${API_BANUSERS}/banuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userBanned),
  });
    const responseFromBE = await response.json();
    if (response.ok) {
      return responseFromBE;
    } else {
      if (responseFromBE) {
        throw responseFromBE;
      } else {
        throw new Error("Failed to ban user");
      }
    }
}

const API_UNBANUSERS = "http://localhost:8080/apiadmin/banuser"

export async function unbanUsers(userUnbanned) {
  console.log(userUnbanned);
  const response = await fetch(`${API_UNBANUSERS}/unbanuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userUnbanned),
  });
    const responseFromBE = await response.json();
    if (response.ok) {
      return responseFromBE;
    } else {
      if (responseFromBE) {
        throw responseFromBE;
      } else {
        throw new Error("Failed to unban user");
      }
    }
}

const API_SUPPUSERS = "http://localhost:8080/apiadmin/suppuser"

export async function suppUser(userSupp) {
  console.log(userSupp);
  const response = await fetch(`${API_SUPPUSERS}/suppuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userSupp),
  });
    const responseFromBE = await response.json();
    if (response.ok) {
      return responseFromBE;
    } else {
      if (responseFromBE) {
        throw responseFromBE;
      } else {
        throw new Error("Failed to supp user");
      }
    }
}

const API_UPDATEROLE = "http://localhost:8080/apiadmin/viewusers"

export async function updateRole(roleupdated) {
  console.log(roleupdated);
  const response = await fetch(`${API_UPDATEROLE}/updaterole`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleupdated),
  });
    const responseFromBE = await response.json();
    if (response.ok) {
      return responseFromBE;
    } else {
      if (responseFromBE) {
        throw responseFromBE;
      } else {
        throw new Error("Failed to update role");
      }
    }
}

