import { Suspense } from "react";
import DetailPost from "../../components/DetailPost";
import DetailPostSuspense from "../DetailPostSuspense";



export default async function page(searchParams: { params: { id: string; }; }) {
const postId = searchParams.params.id


  return (
    <Suspense fallback={<DetailPostSuspense/>}>
       <DetailPost postId={postId}/>
    </Suspense>
  )
}
