const useLocalStorage = () => {
  const getAuth = () => window.localStorage.getItem("authToken");
  const setAuth = (token: string) =>
    window.localStorage.setItem("authToken", token);
  const delAuth = () => window.localStorage.removeItem("authToken");

  return { getAuth, setAuth, delAuth };
};

export default useLocalStorage;
