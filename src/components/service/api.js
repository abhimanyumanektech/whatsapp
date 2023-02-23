import axios from "axios";

const url = "https://whatsapp-backend-lilac.vercel.app";

export const addUser = async (data) => {
  try {
    await axios.post(`${url}/add`, data);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    let res = await axios.get(`${url}/users`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const setConversations = async (data) => {
  try {
    let response = await axios.post(`${url}/conversation/add`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getConversation = async (data) => {
//   try {
//     let resp = await axios.post(`${url}/conversation/get`, data);
//     return resp.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const newMessage = async (data) => {
  try {
    const resp = await axios.post(`${url}/message/add`, data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMessages = async (id) => {
  try {
    let resp = await axios.get(`${url}/message/get/${id}`);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};
