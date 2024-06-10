import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import Navbar_user_page from '../components/Navbar-user_page';
import QuoteCard from '../helpers/QuoteCard';
import Footer from "../components/Footer";
import Cookies from "js-cookie";

interface Quote {
  text: string;
  likes: number;
  username: string;
  avatar: string;
  user_id: string;
  id: string;
  liked: boolean;
}

function UserPage(props: any) {

  const { user_id } = useParams();
  const [avatar, setAvatar] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [username, setUsername] = useState('');
  const [numOfQuotes, setNumOfQuotes] = useState(0);
  const [karma, setKarma] = useState(0);
  const [page, setPage] = useState(1);
  const [mostLikedQuotes, setMostLikedQuotes] = useState<Quote[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [likedQuotes, setLikedQuotes] = useState<Quote[]>([]);
  const [errorLoadingUser, setErrorLoadingUser] = useState(false);
  const [canEdit, setCanEdit] = useState(false);



  const paginatedUserInfo = async () => {
    // Fetch most liked quotes
    await axios
      .get(`http://localhost:8080/quotes/user/${user_id}/mostliked/${page}`,
          {
        withCredentials: true
      })
      .then((response) => {
        let tempMostLikedQuotes = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = {
              text: response.data.data[i].quote.text,
              likes: response.data.data[i].likes_number,
              username: response.data.data[i].user.user_name,
              avatar: response.data.data[i].user.avatar,
              user_id: response.data.data[i].user.user_id,
              id: response.data.data[i].quote.id,
              liked: response.data.data[i].activeUserLiked,
            };
            tempMostLikedQuotes.push(element);
          }
          setMostLikedQuotes(tempMostLikedQuotes);
      })
      .catch((error) => {
        setErrorLoadingUser(true);
        console.log(error);
      });

    // Fetch recent quotes
    await axios
      .get(`http://localhost:8080/quotes/user/${user_id}/rescent/${page}`,
          {
        withCredentials: true
      })
      .then((response) => {
          let tempRecentQuotes = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = {
              text: response.data.data[i].quote.text,
              likes: response.data.data[i].likes_number,
              username: response.data.data[i].user.user_name,
              avatar: response.data.data[i].user.avatar,
              user_id: response.data.data[i].user.user_id,
              id: response.data.data[i].quote.id,
              liked: response.data.data[i].activeUserLiked,
            };
            tempRecentQuotes.push(element);
          }
          setRecentQuotes(tempRecentQuotes);

      })
      .catch(() => {
        setErrorLoadingUser(true);
      });

    // Fetch liked quotes
    await axios
      .get(`http://localhost:8080/quotes/user/${user_id}/liked/${page}`,
          {
            withCredentials: true
          })
      .then((response) => {
          let tempLikedQuotes = [];
          for (let i = 0; i < response.data.data.length; i++) {
            const element = {
              text: response.data.data[i].quote.text,
              likes: response.data.data[i].likes_number,
              username: response.data.data[i].user.user_name,
              avatar: response.data.data[i].user.avatar,
              user_id: response.data.data[i].user.user_id,
              id: response.data.data[i].quote.id,
              liked: response.data.data[i].activeUserLiked,
            };
            tempLikedQuotes.push(element);
          }
          setLikedQuotes(tempLikedQuotes);
      })
      .catch(() => {
        setErrorLoadingUser(true);
      });
  }

  useEffect(() => {
    //get user info
    const fetchUserInfo = async () => {
      axios.get(`http://localhost:8080/me/${user_id}`).then(
        (response) => {
          if (response.data.user.avatar !== null || response.data.user.avatar !== '') {
            const img = new Image();
            img.src = `http://localhost:8080/files/${response.data.user.avatar}`;
        
            img.onload = () => {
              setIsImage(true);
              setAvatar(`http://localhost:8080/files/${response.data.user.avatar}`);
            };
        
            img.onerror = () => {
              setIsImage(false);
            };
          };

          if (response.data.user.first_name === '' || response.data.user.first_name === null || response.data.user.last_name === '' || response.data.user.last_name === null) {
            setUsername(response.data.user.email);
          } else {
            setUsername(`${response.data.user.first_name} ${response.data.user.last_name}`);
          }

          setNumOfQuotes(response.data.quotes);
          setKarma(response.data.carma);
        }
      ).catch(()=>{
        setErrorLoadingUser(true);
      })
      paginatedUserInfo();
    }
    fetchUserInfo();


    const user_cookie = Cookies.get('user_info')
    if (user_cookie) {
      const activeUserId = JSON.parse(user_cookie).id
      if (activeUserId === user_id){
        setCanEdit(true);
      } else {
        setCanEdit(false);
      }
    } else {
      setCanEdit(false);
    }
  }, [])

  const handleLoadMore = async () => {
    setPage(page+1);
    await paginatedUserInfo();
  }

  return (
      <>
        <div>
          <div className='d-flex flex-column align-items-center' style={{backgroundColor: '#DE8667'}}>
            <Navbar_user_page isImage={isImage} avatar={avatar} username={username}
                              userId={user_id}/>
            {errorLoadingUser ?
                <div className="alert alert-danger" role="alert">
                  Something went wrong! Try reloading the page.
                </div> : <></>
            }
            <div className='d-md-block d-none my-5 py-4'/>
            <div className='d-md-none d-block my-4'/>
            {
              isImage ?
                  <img src={avatar} alt="Avatar" className='rounded-circle me-1'
                       style={{width: '64px', height: '64px'}}/>
                  :
                  <img src={require('../assets/No_profile_picture.png')} alt="Avatar" className='rounded-circle me-1'
                       style={{width: '64px', height: '64px'}}/>
            }
            <h4 className='pt-3' style={{color: 'white'}}>{username}</h4>
            <div className='py-4'/>
          </div>
          <div className='d-flex justify-content-center' style={{marginTop: '-60px'}}>
            <div className='card border-0 rounded-4 my-4 px-5'
                 style={{boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)', width: 'min-content'}}>
              <div className='d-flex justify-content-center'>
                <div className='text-center p-3'>
                  <p className='p-0 m-0'>Quotes</p>
                  <h5 className='p-0 m-0' style={{color: '#DE8667'}}>{numOfQuotes}</h5>
                </div>
                <div className='text-center p-3' style={{minWidth: '153px'}}>
                  <p className='p-0 m-0'>Quotastic karma</p>
                  <h5 className='p-0 m-0'>{karma}</h5>
                </div>
              </div>
            </div>
          </div>

          <div className="container" style={{minHeight: 323}}>
            <div className="row">
              <div className="col">
                <h5 style={{color: '#DE8667'}}>Most liked quotes</h5>
                {mostLikedQuotes && mostLikedQuotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} edit={canEdit}/>
                ))}
              </div>
              <div className="col">
                <h5>Most recent</h5>
                {recentQuotes && recentQuotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote} edit={canEdit}/>
                ))}
              </div>
              <div className="col">
                <h5>Liked</h5>
                {likedQuotes && likedQuotes.map((quote) => (
                    <QuoteCard key={quote.id} quote={quote}/>
                ))}
              </div>
            </div>
          </div>

          <div className='d-flex justify-content-center pb-5 pt-2'>
            <a onClick={handleLoadMore} className='btn border-2 rounded-pill px-5 shadow-sm'
               style={{borderColor: '#EFB467', color: '#EFB467'}}>Load more</a>
          </div>
        </div>


        <Footer/>
      </>
  )
}

export default UserPage