import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Quote_card from './Quote_card'

interface Quote {
    text: string;
    likes: number;
    username: string;
    avatar: string;
    id: string;
    liked: boolean;
  }

function Upvoted_quotes(props: any) {
  
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        await axios.get(`http://localhost:8080/quotes/${props.page}`,
        {
          withCredentials: true
        }
        ).then((response)=>{
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
        })
      } catch (error) {
        await axios.get(`http://localhost:8080/quotes/${props.page}`,
        ).then((response)=>{
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
        })
      }
    }

    fetchQuotes()
  }, [])
  

  return (
    <>
    <div className='text-center'>
        <h4 style={{color: '#DE8667'}}>Most upvoted quotes</h4>
        <p>Most upvoted quotes on the platform. Sign up or login to like the quotes and keep them saved in your profile</p>
    </div>
    <div className='container'>
        <div className="row">
            <div className="col-lg-4">
                {quotes.slice(0, 3).map((quote) => (
                    <Quote_card key={quote.id} quote={quote} />
                ))}
            </div>
            <div className="col-lg-4">
                {quotes.slice(3, 6).map((quote) => (
                    <Quote_card key={quote.id} quote={quote} />
                ))}
            </div>
            <div className="col-lg-4">
                {quotes.slice(6, 9).map((quote) => (
                    <Quote_card key={quote.id} quote={quote} />
                ))}
            </div>
        </div>
    </div>
    </>
  )
}

export default Upvoted_quotes