import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import EditPost from './postMenu/EditPost';
import { redirect } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
}

const CreatedPosts = () => {
  const [createdPosts, setCreatedPosts] = useState<Post[]>([]);
  const { data: session } = useSession();
  if(!session){
    redirect('/conectar')
  }
  useEffect(() => {
    const fetchCreatedPosts = async () => {
      try {
        const userId = session?.user?.id;
        if (!userId) {
          console.error('No se pudo obtener el ID del usuario');
          return;
        }
        
        const response = await fetch(`/api/user-created-posts/${userId}`)
        if (response.ok) {
          const data = await response.json();
          setCreatedPosts(data.posts);
          
        } else {
          console.error('Error fetching favorite posts:', response);
        }
      } catch (error) {
        console.error('Error fetching favorite posts:', error);
      }
    };

    fetchCreatedPosts();
  }, [session]);

  return (
    <div>
      <h2>Posts Creados</h2>
      <ul>
        {createdPosts.map((post) => (
          <li key={post.id}>
            {post.title}
            {post.content}
            <EditPost postId={post.id}/>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatedPosts;
