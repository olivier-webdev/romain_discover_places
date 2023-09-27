import { PropContext } from "../../context/PropContext";
import { CreateProp } from "../../apis/testprop";

export default function CreatePropProvider({ children }) {
  async function formprop(values) {
    // if (values.images.length !== 0) {
    //   return true;
    // }
    console.log(values);
    return await CreateProp(values);
    // await CreateProp(prop);
    // return true;
  }

  return (
    <PropContext.Provider value={{ formprop }}>{children}</PropContext.Provider>
  );
}
