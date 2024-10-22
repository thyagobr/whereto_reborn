const fetcher = async ({ url, params }, data?) => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  // const token = localStorage.getItem("token");

  let body;
  const headers = {
    // Authorization: `Bearer ${token}`,
    // "ngrok-skip-browser-warning": "1337420"
    "Content-Type": "application/json"
  } as any;

  // const containsFile = data?.arg ? Object.values(data?.arg).some(value => value instanceof File) : false;
  // if (data?.arg && containsFile) {
  //   const formData = new FormData();
  //   Object.keys(data.arg).forEach(key => {
  //     formData.append(key, data.arg[key]);
  //   });
  //   body = formData;
  body = data ? JSON.stringify(data?.arg) : null;
  headers["Content-Type"] = "application/json";

  if (fullUrl.includes("undefined")) return null;

  const response = await fetch(fullUrl, {
    ...params,
    body,
    headers,
  });

  // if (response.status === 403) {
  //   toast.error("Você não tem permissão para acessar essa página ou realizar essa ação.");
  // }

  // if (response.status === 401) {
  //   signOut();
  // }

  if (response.status === 204) {
    return null;
  }

  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData;
    throw error;
  }

  return responseData;
};

export default fetcher;
