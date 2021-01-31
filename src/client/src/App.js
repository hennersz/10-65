import { useEffect, useState } from "react";
import Lobby from "./Components/Lobby";
import { getSocket } from './utils/socket';
import {ifDev} from "./utils/ifDev";
import Loader from "./Components/Loader";

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
      <Loader label="Connecting to server" />
    )
  }
}

export default App;
