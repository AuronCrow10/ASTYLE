import "./styles/App.css";
import Root from "./root";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./providers/Providers";

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider>
          <>
            <Root />
          </>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
