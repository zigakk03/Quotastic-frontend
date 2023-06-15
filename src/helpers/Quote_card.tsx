import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Quote_card(props: any) {

  const [avatar, setAvatar] = useState('')
  const [isImage, setIsImage] = useState(false)
  const [isLiked, setIsLiked] = useState<boolean | null>(props.quote.liked)
  const [quoteId] = useState(props.quote.id)
  const [critErr, setCritErr] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const [numLikes, setNumLikes] = useState(props.quote.likes)

  const handleUpvote = async () => {    
    await axios.put(
      `http://localhost:8080/quotes/${quoteId}/upvote`, 
      undefined, 
      {withCredentials: true}
      ).then((response) => {
        if (response.data.liked === true && isLiked === false) {
          setNumLikes(numLikes+2)
        } else if (response.data.liked === null) {
          setNumLikes(numLikes-1)
        } else {
          setNumLikes(+1)
        }
        setIsLiked(response.data.liked);
      }).catch((response) => {
        if (response.response.status === 403) {
          setLoginErr(true)
          setTimeout(() => {
            setLoginErr(false)
          }, 5000);
        } else {
          setCritErr(true)
          setTimeout(() => {
            setCritErr(false)
          }, 5000);
        }
      })
    
  }
  
  const handleDownvote = async () => {
      await axios.put(
        `http://localhost:8080/quotes/${quoteId}/downvote`, 
        undefined, 
        {withCredentials: true}
        ).then((response) => {
          if (response.data.liked === false && isLiked === true) {
            setNumLikes(numLikes-2)
          } else if (response.data.liked === null) {
            setNumLikes(numLikes+1)
          } else {
            setNumLikes(-1)
          }
          setIsLiked(response.data.liked)
        }).catch((response) => {
          if (response.response.status === 403) {
            setLoginErr(true)
            setTimeout(() => {
              setLoginErr(false)
            }, 5000);
          } else {
            setCritErr(true)
            setTimeout(() => {
              setCritErr(false)
            }, 5000);
          }
        })
  }

  useEffect(() => {
    const fetchAvatar = async () => {
    if (props.quote.avatar !== null || props.quote.avatar !== '') {
      const img = new Image();
      img.src = `http://localhost:8080/files/${props.quote.avatar}`;
  
      img.onload = () => {
        setIsImage(true);
        setAvatar(`http://localhost:8080/files/${props.quote.avatar}`);
      };
  
      img.onerror = () => {
        setIsImage(false);
      };
    };
  }
  
  fetchAvatar();
  }, [])
  

  return (
    <>
    <div className='card border-0 rounded-3 my-4' style={{boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)'}}>
      <div className="card-body">
        <div className='d-flex'>
        <div className='d-flex flex-column text-center justify-content-center pe-3'>
          <button className='btn' onClick={handleUpvote}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
              {
              isLiked === true ? 
              <path color='#DE8667' fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
              :
              <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
              }
            </svg>
          </button>
          {numLikes}
          <button className='btn' onClick={handleDownvote}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
              {
              isLiked === false ? 
              <path color='#DE8667' fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              :
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              }
            </svg>
          </button>
        </div>
        <div>
        <p>{props.quote.text}</p>
        <div className='d-flex'>
        {
          isImage ?
          <img src={avatar} alt="Avatar" className='rounded-circle me-1' style={{width: '24px', height: '24px'}} />
          :
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle me-1" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        }
        <p className='small pt-1'>{props.quote.username}</p>
        </div>
        </div>
        </div>
      </div>
    </div>
    {loginErr && 
      <div className="alert alert-warning" role="alert" style={{marginTop: '-21px'}}>
        You need to be signed in to upvote and downvote.
      </div>
      }
      {
      critErr &&
      <div className="alert alert-danger" role="alert" style={{marginTop: '-21px'}}>
        Something went wrong!
      </div>
      }
    </>
  )
}

export default Quote_card