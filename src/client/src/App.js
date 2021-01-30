import { useEffect, useState } from "react";
import Lobby from "./Components/Lobby";
import { getSocket } from './utils/socket';
import {ifDev} from "./utils/ifDev";

function App() {
  const [isConnected, setConnectedState] = useState(ifDev(true, false))
  
  const onSocketConnect = (...params) => {
    setConnectedState(true);
  }

  useEffect(() => {
    getSocket().on('connect', onSocketConnect)
    return () => {getSocket().off('connect', onSocketConnect)}
  })

  if (isConnected) {
    return (
      <div className='text-center'>
        <Lobby />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className=''>
        <div className="spinner-grow" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h6 className="mt-4">Connecting to server</h6>
      </div>
    )
  }
}

export default App;
