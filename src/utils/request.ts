export const request = async (
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
  body?: any
) => {
  try {
    var BACKEND_URL = "https://cerulean-marlin-wig.cyclic.app";
    // var BACKEND_URL =
    // "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/";
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(`${method} ${path}`, response);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response; //.json();
  } catch (e) {
    console.log(e);
    return e;
  }
};
