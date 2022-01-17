import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './componets/MovieRow';
import FeaturedMovie from './componets/FeaturedMovie';
import Header from './componets/Header';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [featuredData, setFeaturedData] = useState (null);
  // eslint-disable-next-line no-unused-vars
  const [blackHeader, setBlackHeader] = useState(true);

  useEffect (()=>{
    const loadAll = async () => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter (i=>i.slug === 'trending');
      let randomChosen = Math.floor (Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo (chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
    const scrollListener = () =>{
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
 } 

 window.addEventListener ('scroll', scrollListener);
 return () => {
   window.removeEventListener ('scroll', scrollListener);
 }
}, []);

  useEffect (()=>{

  }, []);
  return (
    <div className='page'>

      <Header black={blackHeader} />

    {featuredData &&
    <FeaturedMovie item={featuredData} />
    }

      <section className="lists">
        {movieList.map((item,key)=>(
         <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>


      <footer>
        Feito com <span role="img" aria-label="coração">🤍</span> por Lucas Azevedo <br />
        Inspirado na Aula de Bonieky Lacerda <br />
        Direitos de imagem para Neflix <br />
        Dados pegos do site Themoviedb.org <br />
        obs: algumas imagens pegas do Themoviedb estão com problemas, então só atualizar a página
      </footer>

      {movieList.length <= 0 &&
      <div className='loading'>
       <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
      </div>
     }
    </div>
  );
}