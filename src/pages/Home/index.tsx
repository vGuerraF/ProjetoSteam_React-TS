import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Autoplay, EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import api from "../../api";
import ContentBox from "../../components/ContentBox";
import DefaultContainer from "../../components/DefaultContainer";
import Footer from "../../components/Footer";
import GameHomeCard from "../../components/GameHomeCard";
import HomeHeading from "../../components/HomeHeading";
import NavBar from "../../components/NavBar";
import NewRelease from "../../components/NewRelease";
import SwiperContainer from "../../components/SwiperContainer";
import { useAuth } from "../../contexts/auth";
import { useGames } from "../../contexts/games";
import { useGenres } from "../../contexts/genres";
import { useProfile } from "../../contexts/profile";
import Favorite from "../../types/favorite";
import Game from "../../types/game";
import ToastStyle from "../../types/toastStyle";

interface HomeProps {
  inLightMode: boolean;
}

const Home = ({ inLightMode }: HomeProps) => {
  const { games, getAllGames } = useGames();
  const { genres, getAllGenres } = useGenres();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const { logged } = useAuth();

  const { profile } = useProfile();

  const getProfileFavorites = async () => {
    if (!logged) return;

    const headers = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("steamProjectToken")}`,
      },
    };
    api
      .get(`/favorite/${profile.id}`, headers)
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("We couldn't load your favorite games", ToastStyle);
      });
  };

  useEffect(() => {
    getAllGenres();
    getAllGames();
    getProfileFavorites();
  }, []);

  return (
    <DefaultContainer light={inLightMode}>
      <NavBar
        currentPage={{
          admin: false,
          home: true,
          profiles: false,
          settings: false,
        }}
      />
      <ContentBox inLightMode={inLightMode}>
        <HomeHeading inLightMode={inLightMode}>New Release</HomeHeading>
        <NewRelease />

        <HomeHeading inLightMode={inLightMode}>All Games</HomeHeading>
        <SwiperContainer>
          <Swiper
            effect={"coverflow"}
            spaceBetween={0}
            slidesPerView={4}
            centeredSlides={true}
            rewind={true}
            modules={[Navigation, EffectCoverflow, Autoplay]}
            autoplay={{
              disableOnInteraction: false,
              delay: 8000,
              pauseOnMouseEnter: true,
              waitForTransition: false,
            }}
            navigation
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 70,
              modifier: 1,
              slideShadows: false,
            }}
          >
            {games
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((game) => {
                return (
                  <SwiperSlide key={game.id}>
                    <GameHomeCard
                      game={game}
                      getProfileFavorites={getProfileFavorites}
                      key={game.id}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </SwiperContainer>

        {logged && favorites.length >= 3 && (
          <>
            <HomeHeading inLightMode={inLightMode}>Favorite Games</HomeHeading>
            <SwiperContainer>
              <Swiper
                effect={"coverflow"}
                spaceBetween={0}
                slidesPerView={3}
                centeredSlides={true}
                rewind={true}
                modules={[Navigation, EffectCoverflow, Autoplay]}
                autoplay={{
                  disableOnInteraction: false,
                  delay: 8000,
                  pauseOnMouseEnter: true,
                  waitForTransition: false,
                }}
                navigation
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 70,
                  modifier: 1,
                  slideShadows: false,
                }}
              >
                {favorites
                  .sort((a, b) => a.game_title.localeCompare(b.game_title))
                  .map((favorite) => {
                    const game: Game | undefined = games.find(
                      (game) => game.title === favorite.game_title
                    );
                    return (
                      game && (
                        <SwiperSlide>
                          <GameHomeCard
                            getProfileFavorites={getProfileFavorites}
                            game={game}
                            favorited={favorite.id}
                          />
                        </SwiperSlide>
                      )
                    );
                  })}
              </Swiper>
            </SwiperContainer>
          </>
        )}

        {genres.map((genre) => {
          return (
            games.filter((game) =>
              game.genres.some(
                (genreObj) => genreObj.genre_title === genre.genre_title
              )
            ).length >= 3 && (
              <>
                <HomeHeading>{genre.genre_title}</HomeHeading>
                <SwiperContainer>
                  <Swiper
                    effect={"coverflow"}
                    spaceBetween={0}
                    slidesPerView={3}
                    centeredSlides={true}
                    rewind={true}
                    modules={[Navigation, EffectCoverflow, Autoplay]}
                    autoplay={{
                      disableOnInteraction: false,
                      delay: 8000,
                      pauseOnMouseEnter: true,
                      waitForTransition: false,
                    }}
                    navigation
                    coverflowEffect={{
                      rotate: 30,
                      stretch: 0,
                      depth: 70,
                      modifier: 1,
                      slideShadows: false,
                    }}
                  >
                    {games
                      .filter((game) =>
                        game.genres.some(
                          (genreObj) =>
                            genreObj.genre_title === genre.genre_title
                        )
                      )
                      .map((filteredGame) => {
                        return (
                          <SwiperSlide>
                            <GameHomeCard
                              getProfileFavorites={getProfileFavorites}
                              game={filteredGame}
                            />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </SwiperContainer>
              </>
            )
          );
        })}
      </ContentBox>

      <Footer />
    </DefaultContainer>
  );
};

export default Home;
