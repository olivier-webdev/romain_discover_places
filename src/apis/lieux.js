const API_LIEUX = "/api/lieux";

export async function getLieu(lieu) {
  const response = await fetch(API_LIEUX, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lieu),
  });
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

export async function getLieuxbyCountry(id) {
  // const encodedId = encodeURIComponent(idPays);
  const response = await fetch(`${API_LIEUX}/getlieux?id=${id}`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to get lieux");
  }
}

export async function getOnlyLieubyId(id) {
  // const encodedId = encodeURIComponent(idPays);
  const response = await fetch(`${API_LIEUX}/getlieu?id=${id}`);
  if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
          return data[0];
      } else {
          throw new Error("No lieu found")
      }
  } else {
      throw new Error("Failed to get lieu")
  }
}

export async function getLieuxMoment() {
  const response = await fetch(`${API_LIEUX}/getlieumoment`);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to get lieudumoment")
  }
}


