import Header from "../components/header";

export default {
  title: "Header",
  component: Header,
};

export const SignedIn = () => <Header currentUser={"dfdff"} />;
