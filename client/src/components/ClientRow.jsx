import { useMutation } from '@apollo/client';
import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENTS } from '../mutations/ClientMutations';
import { GET_CLIENTS } from '../queries/ClientQueries';
import { GET_PROJECTS } from '../queries/ProjectQueries';


export default function ClientRow({ client }) {
  // Delete specific Client row - args & on delete refetch
  const [deleteClient] = useMutation(DELETE_CLIENTS, {
    variables: { id: client.id },

    // If there are multiple requests that will occur updating the cache is the better approach
    refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],    // on client delete all associated projects are also removed, hence refetch to update
    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GET_CLIENTS });

    //   // Update the cache with clients apart from the one just deleted
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   });
    // },
  });

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className='btn btn-danger btn-sm' onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}