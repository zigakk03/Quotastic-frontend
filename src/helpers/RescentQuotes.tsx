import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QuoteCard from './QuoteCard'

interface Quote {
    text: string;
    likes: number;
    username: string;
    avatar: string;
    id: string;
    liked: boolean;
  }

function RescentQuotes(props: any) {
  
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [lastPageErr, setLastPageErr] = useState(false)

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        await axios.get(`http://localhost:8080/quotes/date/${props.page}`,
        {
          withCredentials: true
        }
        ).then((response)=>{
          if (response.data.data.length <= 0) {
            setLastPageErr(true)
          } else {
          let allQuotes = []
          for (let i = 0; i < response.data.data.length; i++) {
              const element = {
                  text: response.data.data[i].quote.text,
                  likes: response.data.data[i].likes_number,
                  username: response.data.data[i].user.user_name,
                  avatar: response.data.data[i].user.avatar,
                  id: response.data.data[i].quote.id,
                  liked: response.data.data[i].activeUserLiked
              }
              allQuotes.push(element)
          }
          setQuotes(allQuotes)}
        })
      } catch (error) {
        await axios.get(`http://localhost:8080/quotes/date/${props.page}`,
        ).then((response)=>{
          if (response.data.data.length <= 0) {
            setLastPageErr(true)
          } else {
          let allQuotes = []
          for (let i = 0; i < response.data.data.length; i++) {
              const element = {
                  text: response.data.data[i].quote.text,
                  likes: response.data.data[i].likes_number,
                  username: response.data.data[i].user.user_name,
                  avatar: response.data.data[i].user.avatar,
                  id: response.data.data[i].quote.id,
                  liked: response.data.data[i].activeUserLiked
              }
              allQuotes.push(element)
          }
          setQuotes(allQuotes)
        }
        })
      }
    }

    fetchQuotes()
  }, [props.page])
  

  return (
    <>
    <div className='text-center'>
        <h4 style={{color: '#DE8667'}}>Most recent quotes</h4>
        <p>Recent quotes updates as soon user adds new quote. Go ahed show them that you seen the new quote and like the ones you like.</p>
    </div>
    <div className='container'>
        <div className="row">
            <div className="col-lg-4">
                {quotes.slice(0, 3).map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                ))}
            </div>
            <div className="col-lg-4">
                {quotes.slice(3, 6).map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                ))}
            </div>
            <div className="col-lg-4">
                {quotes.slice(6, 9).map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} />
                ))}
            </div>
        </div>
    </div>
    {lastPageErr && 
    <div className="alert alert-warning text-center" role="alert">
      There are no more quotes to show!
    </div>
    }
    </>
  )
}

export default RescentQuotes