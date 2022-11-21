import { Route, Routes as Switch } from "react-router-dom";

import Layout from "../components/common/Layout";
import Posts from "../components/Posts";
import Post from "../components/Posts/Post";
import LoginForm from "../components/Users";
import { GlobalContextProvider } from "../context";

const AppRouter = () => {
  return (
    <GlobalContextProvider>
      <Layout>
        <Switch>
          <Route path="/posts">
            <Route index element={<Posts />} />
            <Route path=":id" element={<Post />} />
          </Route>
          <Route path="/signin" element={<LoginForm />} />
        </Switch>
      </Layout>
    </GlobalContextProvider>
  );
};

export default AppRouter;
