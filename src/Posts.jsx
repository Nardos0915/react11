import React, { useEffect,useState } from 'react'

const Posts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response=>response.json())
        .then(data=>{
            setData(data)
            setLoading(false)
            console.log(data)
        })
        .catch(err=>{
            setLoading(false)
            setError("Please Try Agin!")
            console.log(err)
        })

    },[])


    if (loading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div>Error: {error}</div>;
      }

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map(post=>(
           <div>
             <h1>{post.title}</h1>
             <p>{post.body}</p>

           </div>
        ))}
      </ul>
    </div>
  )
}

export default Posts
