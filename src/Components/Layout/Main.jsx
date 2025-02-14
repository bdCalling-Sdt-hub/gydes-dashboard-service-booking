import { ConfigProvider } from "antd";
import { mainTheme } from "../../theme";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import router from "../../Routes/Routes";
import { Toaster } from "sonner";

const Main = () => {
  return (
    <div className="">
      <ConfigProvider theme={mainTheme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster richColors position={"top-center"} />
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </div>
  );
};

export default Main;
