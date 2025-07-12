
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { createViewerToken } from '@/action/tokens/token-action'
import { toast } from 'sonner'
function userviewertoken(hostIdentity) {

    const [identity, setIdentity]=useState("")
    const[token, setToken]=useState("")
    const[name, setName]=useState("")
    const[imageurl, setImageUrl]=useState("")

    useEffect(() => {
      
      async function createToken(hostId) {
        try {
          const viewerToken = await createViewerToken(hostId);
         
          setToken(viewerToken);

          const decodedToken=jwtDecode(viewerToken)
          const name=decodedToken?.name
          const identity=decodedToken.sub
          
let imageurl = "";
if (decodedToken?.metadata) {
  try {
    const meta = JSON.parse(decodedToken.metadata);
    imageurl = meta.imageurl;
  } catch (err) {
    console.error("Invalid metadata format", err);
  }
}
          
          if (identity) {
            setIdentity(identity);
          }
          
          if (name) {
            setName(name);
          }
          if(imageurl){
            setImageUrl(imageurl)
          }
        
  
    } catch (error) {
console.error(error)

       toast.error("Something went wrong");
    }
      }
   
     createToken(hostIdentity);

    },[hostIdentity]
    )


  return{
    token,
    name,
    identity,
    imageurl
  };
}

export default userviewertoken
