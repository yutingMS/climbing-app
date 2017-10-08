import { graphql } from "react-apollo";
import createUserMutation from "./createUserMutation.graphql";
import userQuery from "./userQuery.graphql";

  export default graphql(createUserMutation, {
    options: {
      fetchPolicy: "network-only",
    update: (proxy, { data: { createUser } }) => {
      proxy.writeQuery({ query: userQuery, data: createUser });
    }
  },
  props: ({ mutate }) => ({
    createUser: (idToken, pseudo) =>
      mutate({ variables: { idToken, pseudo } })
  })
});
