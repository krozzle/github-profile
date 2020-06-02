import Head from 'next/head';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
const client = new ApolloClient({
  uri: 'https://www.graphqlhub.com/graphql',
});
const githubQuery = gql`
  {
    github {
      user(username: "krozzle") {
        id
        avatar_url
        repos {
          name
        }
      }
    }
  }
`;
const Profile = () => {
  const { loading, error, data } = useQuery(githubQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops, something went wrong</p>;
  return (
    <div>
      <img src={data.github.user.avatar_url} />
    </div>
  );
};
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <div className='container'>
        <Head>
          <title>graphQL sesh w/ nikGraf</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>Hello</h1>
        <Profile />
      </div>
    </ApolloProvider>
  );
}
