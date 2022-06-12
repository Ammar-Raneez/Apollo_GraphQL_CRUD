import { FaTrash } from 'react-icons/fa';

export default function DeleteProjectButton({ projectId }) {
  return (
    <div className='d-flex mt-5 ms-auto'>
      <button className='btn btn-danger m-2'>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  );
}