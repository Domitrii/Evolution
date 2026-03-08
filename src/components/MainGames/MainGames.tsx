import s from "./MainGames.module.scss"
import { NavLink } from "react-router-dom"
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getGames } from "../../api/games";
import { useState, useEffect, useRef, useCallback } from "react";
import type { Game } from "../../types/api";


const SLIDE_WIDTH = 3 * 365 + 2 * 16; 
const SLIDES_COUNT = 3; 



function MainGames() {

const listRef = useRef<HTMLUListElement>(null);
    const currentSlideRef = useRef(0);
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState<Game[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    
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
    <section className={s.container}>
            <div className={s.gamesCollection}>
                <p>Collection</p>
                <h2>Games</h2>
                {isLoading ? <CircularProgressbar className={s.loader} value={65} strokeWidth={10} /> : 
                    <div className={s.gameCollectionCont}>
                        <button onClick={scrollLeft} className={s.scrollBtn}><MdArrowBackIos /></button>
                        <ul ref={listRef} className={s.gameCollectionList} >
                            {displayGames.map((i, index) => (
                                <NavLink 
                                    to={`/game/${i._id}`}
                                    state={{game: i}}
                                    key={`${i._id}-${index}`} className={s.gameListItem}
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
  )
}

export default MainGames