import { useState } from "react";


//This is a custom hook that will return re-rederable values instead of rendering components.
export const useExample = () =>
{
    const [hookValue1, setHookValue1] = useState();

    const functionExample1 = (someValue) =>
    {
        setHookValue1(someValue);
    }

    function functionExample2()
    {

    }

    return { hookValue1, functionExample1, functionExample2}; //These will re-render globally if used in a context.
}