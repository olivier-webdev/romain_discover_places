const API_PROP = "/api/testprop"

export async function CreateProp(prop) {
  console.log(prop);
    const data = new FormData();
    if (prop.file) {
      data.append("image", prop.file);
    }
    data.append("values", JSON.stringify(prop));
    console.log(data);
    const response = await fetch(`${API_PROP}/create`, {
      method: "POST",
      body: data,
    });
    const backResponse = await response.json();
    if (response.ok) {
      return backResponse;
    } else {
      if (backResponse) {
        throw backResponse;
      } else {
        throw new Error("Error api");
      }
    }
  }