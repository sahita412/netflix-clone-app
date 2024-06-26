import React, { useEffect, useState } from 'react'
import "./Home.scss"
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai'

const apiKey = "bfc35ebf4b198b49d153994fe12b2e04";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";

const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";



const Card = ({img}) => {
  return (
      <img className="card" src={img} alt="" />
  )
}

const Row = ({title, arr=[]}) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {
          arr.map((item,index)=>(
            <Card key={index} img = {`${imgUrl}/${item.poster_path}`}/>
          ))
        }
      </div>
    </div>
  )
}



const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(()=>{
     const fetchUpcoming = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      // console.log(results);
      setUpcomingMovies(results);
     };
     const fetchNowPlaying = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      // console.log(results);
      setNowPlayingMovies(results);
     };
     const fetchPopular = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      // console.log(results);
      setPopularMovies(results);
     };
     const fetchTopRated = async()=>{
      const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      // console.log(results);
      setTopRatedMovies(results);
     };
     const getAllGenre = async ()=>{
      const {data:{genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
      console.log(genres);
     };

     getAllGenre();
     fetchUpcoming();
     fetchNowPlaying();
     fetchPopular();
     fetchTopRated();
  },[]);

  return (
    <section className='home'>
      <div className='banner' style={
        {backgroundImage: popularMovies[0]?`url(${imgUrl}/${popularMovies[0].poster_path})`:'none'}
        }>
        {
          popularMovies[0] && (
            <h1>{popularMovies[0].original_title}</h1>
          )
        }
        {
          popularMovies[0] && (
            <p>{popularMovies[0].overview}</p>
          )
        }
        <div>
          <button><BiPlay/> Play </button>
          <button><AiOutlinePlus /> My List </button>
        </div>
        </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowPlayingMovies}/>
      <Row title={"Popular"} arr={popularMovies}/>
      <Row title={"Top Rated"} arr={topRatedMovies}/>

      <div className="genreBox">
        {
          genre.map((g) => (
            <Link key={g.id} to={`/genre/${g.id}`}>{g.name}</Link>
          ))
        }
      </div>
    </section>
  )
}

export default Home