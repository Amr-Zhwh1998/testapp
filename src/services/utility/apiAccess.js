import axios from "axios";

const apiAdress = process.env.EXPO_PUBLIC_API_ADDRESS;

export const APIRoutes = {
    lifeCheck:`/`,
    auth:{
        authRoute1:`/auth/doAuth`
    },
    user:{
        postRoute1:`/somepath/postthis`,
        getRoute3:`/someotherpath/getthat`,
    },
};


export const lifeAxios = (jwt,route="") => {
    return axios.create({
      baseURL: apiAdress+route,
      headers: { authorization: `Bearer ${jwt}` },
    });
  };


