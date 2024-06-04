import React from "react";

const Call_Post_Api = async (body, token, id, link_url, method = "POST") => {
  // const url = "http://localhost:3056/v1/api";
  const url = process.env.REACT_APP_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    if (body === null) {
      body = {}; // Set a default value as an empty object
    }

    console.log(link_url);

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "x-client-id": id,
      authorization: token,
    };

    const options = {
      method: method.toUpperCase(),
      headers: headers,
    };

    if (options.method === "POST") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url + link_url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

export { Call_Post_Api };
