import React, { FunctionComponent, useEffect, useState } from "react";
import { wsURL } from "../utils/API";

function isArray(data: Array<any> | string): data is Array<any> {
  return (data as Array<any>).map !== undefined;
}

export const SocketDispatchContext = React.createContext<
  | {
      setConn: React.Dispatch<React.SetStateAction<WebSocket>>;
      setPdfData: React.Dispatch<React.SetStateAction<any>>;
    }
  | undefined
>(undefined);

export const SocketDataContext = React.createContext<{
  conn: WebSocket | undefined;
  pdfData: any[] | undefined;
}>({ conn: undefined, pdfData: undefined });

const SocketProvider: FunctionComponent = ({ children }) => {
  const [conn, setConn] = useState<WebSocket | undefined>(undefined);
  const [pdfData, setPdfData] = useState<any>(undefined);

  useEffect(() => {
    setConn((prev) => {
      const socket = new WebSocket(wsURL + "start");

      socket.onopen = function (event) {
        console.log("Socket has been opened!");
      };

      socket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        console.log(event);

        if (isArray(data)) {
          console.log(data);
          setPdfData(data);
        }
      };

      socket.onclose = function (event) {
        console.log("Socket has been closed!");
      };

      return socket;
    });
  }, []);

  return (
    <SocketDataContext.Provider value={{ conn, pdfData }}>
      <SocketDispatchContext.Provider value={{ setConn, setPdfData }}>
        {children}
      </SocketDispatchContext.Provider>
    </SocketDataContext.Provider>
  );
};

export default SocketProvider;
