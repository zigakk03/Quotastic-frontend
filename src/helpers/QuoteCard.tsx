import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditQuote from "../components/EditQuote";
import DeleteQuote from "../components/DeleteQuote";

function QuoteCard(props: any) {

  const [avatar, setAvatar] = useState('')
  const [isImage, setIsImage] = useState(false)
  const [isLiked, setIsLiked] = useState<boolean | null>(props.quote.liked)
  const [quoteId] = useState(props.quote.id)
  const [critErr, setCritErr] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const [numLikes, setNumLikes] = useState<number>(props.quote.likes)
  const canEdit = props.edit;
  const userUrl = `/user/${props.quote.user_id}`;
  const [showEditQuote, setShowEditQuote] = useState(false);
  const [showDelQuote, setShowDelQuote] = useState(false);

  const handleUpvote = async () => {    
    await axios.put(
      `http://localhost:8080/quotes/${quoteId}/upvote`, 
      undefined, 
      {withCredentials: true}
      ).then((response) => {
        var updLikes = numLikes;
        if (response.data.liked === true && isLiked === false) {
          updLikes++;
          updLikes++;
          //setNumLikes(numLikes+2)
        } else if (response.data.liked === null) {
          updLikes--;
          //setNumLikes(numLikes-1)
        } else {
          updLikes++;
          //setNumLikes(numLikes+1)
        }
        setNumLikes(updLikes);
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
          var updLikes = numLikes;
          if (response.data.liked === false && isLiked === true) {
            updLikes -= 2;
            //setNumLikes(numLikes-2)
          } else if (response.data.liked === null) {
            updLikes++;
            //setNumLikes(numLikes+1)
          } else {
            updLikes--;
            //setNumLikes(numLikes-1)
          }
          setNumLikes(updLikes);
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

  const handleRefresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

  //edit quote
  const openEditQuote = () => {
    setShowEditQuote(true)
  }

  const closeEditQuote = () => {
    setShowEditQuote(false);
    handleRefresh();
  }
  const cancelEditQuote = () => {
    setShowEditQuote(false);
  }


  //delete quote
  const openDelQuote = () => {
    setShowDelQuote(true)
  }

  const closeDelQuote = () => {
    setShowDelQuote(false);
    handleRefresh();
  }
  const cancelDelQuote = () => {
    setShowDelQuote(false);
  }

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
        <p style={{minHeight: '50px'}}>{props.quote.text}</p>
        <Link onClick={handleRefresh} to={userUrl} style={{textDecoration: 'none', color: 'black'}}>
        <div className='d-flex'>
        {
          isImage ?
          <img src={avatar} alt="Avatar" className='rounded-circle me-1' style={{width: '24px', height: '24px'}} />
          :
          <img src={require('../assets/No_profile_picture.png')} alt="Avatar" className='rounded-circle me-1' style={{width: '24px', height: '24px'}} />
        }
        <p className='small pt-1' >{props.quote.username}</p>
        </div>
        </Link>
        </div>
          {canEdit?
              <>
                <div style={{marginLeft: "auto"}} className='d-flex flex-column text-center justify-content-center pe-3'>
                  <button className='btn' onClick={openEditQuote}>
                  <svg color='#DE8667'
                       xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                  </svg>
                  </button>
                  <button className='btn' onClick={openDelQuote}>
                  <svg color='#DE8667'
                       xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M6 18 17.94 6M18 18 6.06 6"/>
                  </svg>
                  </button>
                </div>
              </>
              :
              <></>
          }
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
      <EditQuote show={showEditQuote} onClose={closeEditQuote} onCancel={cancelEditQuote} text={props.quote.text} qId={quoteId} />
      <DeleteQuote show={showDelQuote} onClose={closeDelQuote} onCancel={cancelDelQuote} qId={quoteId} />
    </>
  )
}

export default QuoteCard