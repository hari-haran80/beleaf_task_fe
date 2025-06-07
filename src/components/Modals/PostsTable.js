import DeleteConfirmation from '../../pages/Home Page/DeleteConfirmation/DeleteConfirmation';
import EditModal from '../../pages/Home Page/EditModal/EditModal';
import Spinner from '../spinners/Spinner';

const PostsTable = ({ 
  posts, 
  loading, 
  onEdit, 
  onDelete,
  editPost,
  setEditPost,
  deletingPost,
  setDeletingPost,
  handleUpdate,
  handleDelete
}) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-gradient-to-br from-blue-50 to-indigo-50">
        <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Body</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="3" className="py-12 text-center">
                <Spinner />
              </td>
            </tr>
          ) : posts.length === 0 ? (
            <tr>
              <td colSpan="3" className="py-8 text-center text-gray-500 text-lg">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No posts available
                </div>
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post._id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-800">{post.title}</td>
                <td className="py-3 px-4 text-gray-600">{post.body}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <button 
                      onClick={() => onEdit(post)}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md shadow-sm transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(post)}
                      className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-md shadow-sm transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {editPost && (
        <EditModal 
          post={editPost}
          onClose={() => setEditPost(null)}
          onSave={handleUpdate}
          onChange={setEditPost}
        />
      )}
      
      {deletingPost && (
        <DeleteConfirmation 
          post={deletingPost}
          onClose={() => setDeletingPost(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default PostsTable;