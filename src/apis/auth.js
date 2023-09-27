const API_USERS = "/api/auth";

export async function signin(credentials) {
  const response = await fetch(API_USERS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const responseFromBE = await response.json();
  if (response.ok) {
    return responseFromBE;
  } else {
    if (responseFromBE) {
      throw responseFromBE;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}

export async function getCurrentUser() {
  const response = await fetch(`${API_USERS}/current`);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    throw new Error("Failed to get current user");
  }
}

export async function signout() {
  await fetch(API_USERS, {
    method: "DELETE",
  });
}
