import { createContext } from "react";

//Create a new context and assign its initial values, we would usually want these empty.
//Eventually, we would want to connect the context to a custom hook that will be able 
//to provide a "global" hook under all of the context provider's children.
const initialContext = {
    hookValue1: "value1",
    functionExample1: () => { },
    functionExample2: () => { },
}
export const ExampleContext = createContext(initialContext);

