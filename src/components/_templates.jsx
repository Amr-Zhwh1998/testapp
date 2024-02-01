import { useState, useCallback, Component, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

//These are general templates for FC/CC.

function FunctionalComponentTemplate({ propName1, propName2 }) 
{
    const [hookValue, setHookValue] = useState();

    useEffect(() =>
    {
        return () =>
        {
        }
    }, [])

    useFocusEffect(
        useCallback(() =>
        {
            return () =>
            {
            };
        }, [])
    );

    return (
        <></>
    );
}


class ClassComponent extends Component
{
    constructor(props)
    {
        super(props);

        this.state = {
        };
    }

    changeThisOrThat(someValue)
    {
        this.setState({

        });
    }

    componentDidMount()
    {
    }

    componentDidUpdate(prevProps, prevState)
    {
    }

    componentWillUnmount()
    {
    }
    render()
    {
        return (
            <></>
        );
    }
}

//This is a functional component example, you would usually settle for this in 
function FunctionalComponentTemplateExample({ propName1, propName2 }) //for clean code. function FunctionalComponentTemplateExample(props) is also possible.
{
    //This is a hook - whenever it is changed with setHookValue, its value will be rerendered where hookValue is used.
    //Note that re-rendering works only for hooks, decalring variables is not enough.
    /**
     * IMPORTANT: Using the set function will not let you see its new value within the same function that is updating it,
     * so it's possible for a hook to update while the value still shows its previous state, it's possible to use useEffect
     * with triggers to print its contents for debug purposes, or just use the inserted value in order to debug.
    **/
    const [hookValue, setHookValue] = useState( /*InitialHookValue*/);


    //The following functions describe the lifecycle of a FC. Note that sometimes you may not need these at all:

    /**
     * IMPORTANT: If used as a screen in navigation it does not neccessarily mean
     * it will be loaded/unloaded while using the navigation function, there are some
     * factors to consider (type of navigator, history, cache).
    **/
    useEffect(() =>
    {
        //What to do on initial component load.

        return () =>
        {
            //What to do when component is unloaded. 
        }
    }, [/*Hook/Props array*/]) //These are any hooks or props that should trigger the initial loading part upon change.


    /** 
     * This also uses the same life cycle of useEffect, but it is always triggered when screen is 
     * focused/unfocused, useful for screens that are in the background during navigation but need 
     * to update upon focus.
    **/
    useFocusEffect(
        useCallback(() =>
        {
            //What to do on initial component load.

            return () =>
            {
                //What to do when component is unloaded. 
            };
        }, [/*Hook/Props array*/])
    );

    //Rendering
    return (
        <></> //This is an example for an empty component (can wrap anything), but here go your React Components.
    );
}

//This is a class component, which is used for more complex screens and operations
//We will not explain much here, for more reading: https://react.dev/reference/react/Component#adding-lifecycle-methods-to-a-class-component
class ClassComponentExample extends Component
{
    constructor(props)
    {
        super(props);
        /*
        JS object of the class component's state, this is the "hook" of a class component
        this.state should only be used within the constructor and will not re-render any values (constructor
        is loaded before componentDidMount and should never have a rendering function used within it)
        */
        this.state = {
            param1: 1,
            param2: "text",
        };
    }

    //An example of a public method to change the component's state, making it re-render to current values
    changeThisOrThat(someValue)
    {
        this.setState({

        });
    }

    componentDidMount()
    {
        //What to do when the component loads.
    }

    componentDidUpdate(prevProps, prevState)
    {
        //What to do when the component receives new props.
    }

    componentWillUnmount()
    {
        //What to do when the component unloads.
    }

    //If you need focusEffect in class component: https://reactnavigation.org/docs/use-focus-effect/#using-with-class-component


    //Here is the render function of the class component.
    render()
    {
        //Some possible code
        return (
            <></>
        );
    }
}