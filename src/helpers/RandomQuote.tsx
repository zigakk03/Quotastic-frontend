import React, { useEffect, useState } from 'react'
import QuoteCard from './QuoteCard'
import axios from 'axios';

interface Quote {
    text: string;
    likes: number;
    username: string;
    avatar: string;
    user_id: string;
    id: string;
    liked: boolean;
  }

function RandomQuote() {
    const [quote, setQuote] = useState<Quote>()
    const [critErr, setCritErr] = useState(false)

    useEffect(() => {
      const FetchRandomQuote =  async () => {
        
            axios.get(
                'http://localhost:8080/quotes/random',
                {withCredentials: true}).then((response) =>
                {
                    console.log(response);
                    
                    const randomQuote = {
                        text: response.data.quote.text,
                        likes: response.data.likes_number,
                        username: response.data.user.user_name,
                        avatar: response.data.user.avatar,
                        user_id: response.data.user.user_id,
                        id: response.data.quote.id,
                        liked: response.data.activeUserLiked
                    }
                    setQuote(randomQuote)
                }
                ).catch(()=>{
                  FetchRandomQuoteWithoutCredentials()
                })
      }

      const FetchRandomQuoteWithoutCredentials = async () => {
        axios.get(
          'http://localhost:8080/quotes/random'
          ).then((response) =>
          {
              const randomQuote = {
                  text: response.data.quote.text,
                  likes: response.data.likes_number,
                  username: response.data.user.user_name,
                  avatar: response.data.user.avatar,
                  user_id: response.data.user.user_id,
                  id: response.data.quote.id,
                  liked: response.data.activeUserLiked
              }
              setQuote(randomQuote)
          }
          ).catch(() => {
            setCritErr(true)
          })
      }

      // noinspection JSIgnoredPromiseFromCall
        FetchRandomQuote()
    }, [])
    

  return (
    <>
    <div className='text-center mt-5'>
        <h4 style={{color: '#DE8667'}}>Quote of the day</h4>
        <p>Quote of the day is randomly choosen quote.</p>
    </div>
    <div className='d-flex justify-content-center'>
        <div style={{maxWidth: '420px', width: '100%'}}>
            {quote && <QuoteCard quote={quote} />}
        </div>
    </div>
    {critErr && 
      <div className="alert alert-danger" role="alert">
        Something went wrong!
      </div>
    
    }
    </>
  )
}

export default RandomQuote