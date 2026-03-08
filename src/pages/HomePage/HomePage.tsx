import s from "./HomePage.module.scss"
import headerImg from "../../img/MainBack.png"
import { NavLink, useNavigate } from "react-router-dom"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { CircularProgressbar } from 'react-circular-progressbar';
import { getGames } from "../../api/games";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Game } from "../../types/api";
import PageTitle from "../../helper/PageTitle";


const SLIDE_WIDTH = 3 * 365 + 2 * 16; // 3 items + 2 gaps
const SLIDES_COUNT = 3; // 9 games / 3 per slide

function HomePage() {
    const listRef = useRef<HTMLUListElement>(null);
    const currentSlideRef = useRef(0);
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const navigate = useNavigate();
    
    currentSlideRef.current = currentSlideIndex;

    // Get Games/Loading
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setIsLoading(true);
                const games = await getGames();
                setGames(games);
            } catch (error) {
                console.error("Failed to load games", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGames();
    }, []);

    const displayGames = games.slice(0, 9);

    const scrollToSlide = useCallback((slideIndex: number) => {
        if (!listRef.current) return;
        const targetScroll = slideIndex * SLIDE_WIDTH;
        listRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
        setCurrentSlideIndex(slideIndex);
    }, []);

    const scrollRight = useCallback(() => {
        const nextIndex = (currentSlideRef.current + 1) % SLIDES_COUNT;
        scrollToSlide(nextIndex);
    }, [scrollToSlide]);

    const scrollLeft = useCallback(() => {
        const nextIndex = (currentSlideRef.current - 1 + SLIDES_COUNT) % SLIDES_COUNT;
        scrollToSlide(nextIndex);
    }, [scrollToSlide]);

    useEffect(() => {
        if (!isLoading && listRef.current && displayGames.length > 0) {
            listRef.current.scrollLeft = 0;
        }
    }, [isLoading, displayGames.length]);

    // Auto-scroll 
    useEffect(() => {
        if (isLoading || displayGames.length === 0) return;
        const interval = setInterval(scrollRight, 8000);
        return () => clearInterval(interval);
    }, [isLoading, displayGames.length, scrollRight]);



  return (
    <>  
        <PageTitle>Home</PageTitle>
        <section className={s.container}>
            <div className={s.header}>
                <div className={s.topImgCont}>
                    <img src={headerImg} alt="" />
                    <span className={s.shadow}></span>
                    <div className={s.headerContent }>
                        <p className={s.headerSubtitle}>Level Up Your Game</p>
                        <h1 className={s.headerTitle}>EVOLUTION</h1>
                        <p className={s.headerDescription}>Premium games, elite hardware, and expert reviews — everything a gamer needs under one roof.</p>
                        <ul className={s.headerButtons}>
                            <li><NavLink to="/games">BROWSE GAMES</NavLink></li>
                            <li><NavLink to="/hardware">EXPLORE HARDWARE</NavLink></li>
                        </ul>  
                    </div>
                </div>
            </div>
        </section>
        <section className={s.container}>
            <div className={s.gamesCollection}>
                <p>Collection</p>
                <h2>Games</h2>
                {isLoading ? <CircularProgressbar className={s.loader} value={65} /> : 
                    <div className={s.gameCollectionCont}>
                        <button onClick={scrollLeft} className={s.scrollBtn}><MdArrowBackIos /></button>
                        <ul ref={listRef} className={s.gameCollectionList} >
                            {displayGames.map((i, index) => (
                                <NavLink 
                                    to={`/game/${i._id}`}
                                    state={{game: i}}
                                    // state={{ game: i }}
                                    key={`${i._id}-${index}`} className={s.gameListItem} 
                                    onClick={() => navigate(`/thisGame?id=${i._id}`)}
                                >
                                    <img src={i.thumbnail} alt="game image" />
                                    <div>{i.title}</div>
                                    <div>{i.platform}</div>
                                    <div>{i.price}</div>
                                </NavLink>
                            ))}
                        </ul>
                        <button onClick={scrollRight} className={s.scrollBtn}><MdArrowForwardIos /></button>
                    </div>
                }
            </div>
        </section>
    </>
  )
}

export default HomePage