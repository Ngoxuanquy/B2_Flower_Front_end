import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import DefaultLayout from "./Layouts/DefaultLayout/DefaultLayout";
import { publicRoute } from "../Routes";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {
            publicRoute.map((route, index) => {
              let Page = route.component
              return (
                <Route key={index} path={route.path} element={
                  <DefaultLayout>
                    {Page}
                  </DefaultLayout>
                }/>
              )
            })
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
