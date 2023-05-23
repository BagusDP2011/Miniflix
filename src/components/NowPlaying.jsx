import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";


const NowPlaying = () => {
  const [movies, setMovies] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const API_KEY = "1c432c5fa9b3027b5273b22979750c77";
  const genresChoice = async () => {
    try {
      const dataMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      );
      setMovies(dataMovies.data.results);
      setIsloading(true);
    } catch (error) {
      console.log(error);
    }
  };

  // const urlDetail = async () => {
  //   const url = await axios.get()
  // }
  const renderNowPlaying = () => {
    return movies.map((data) => {
      return (
        <GridItem
        >
          <Box
            border={"1px solid black"}
            paddingY={"5px"}
            textAlign={"center"}
            height={"500px"}
          >
              <a href={'https://api.themoviedb.org/3/movie/'+ data.id }>
              <Image
                src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                height={"300px"}
              ></Image>
              <Text>
                <b>
                  {data.original_title.length > 20
                    ? data.original_title.substring(0, 20)
                    : data.original_title}
                </b>
              </Text>
              <Text fontSize={"10px"}>
              <i class="fa fa-ticket"/>
{data.release_date}<i class="fa fa-star-o"/>{data.vote_average}
              </Text>
            </a>
          </Box>
        </GridItem>
      );
    });
  };
  const renderNowPlayingCarousell = () => {
    return movies.map((data) => {
      return (
        <GridItem
        >
          <Box
            paddingY={"5px"}
            textAlign={"center"}
            height={"500px"}
          >
            <a href="/detail/{data.id}">
              <Image
                src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                height={"400px"}
              ></Image>
              <Text>
                <b>
                    {data.original_title}
                </b>
              </Text>
              <Text>
                {data.overview}
              </Text>
            </a>
          </Box>
        </GridItem>
      );
    });
  };

  useEffect(() => {
    genresChoice();
  }, []);
  return (
    <Box height={"500px"} marginLeft={"200px"}>
      <Grid marginTop={"50px"} gridTemplateRows={"1fr 5fr"} color={"black"}>
        <GridItem>
          <Grid>
            <Carousel autoPlay infiniteLoop interval="1000" showThumbs={false} i width={"900px"} height={"500px"}>
              {isLoading && renderNowPlayingCarousell()}
            </Carousel>
          </Grid>
          <Text fontWeight={"bold"} fontSize={"24px"}>
            Now Playing
          </Text>
          <Grid gridTemplateColumns={"repeat(10, 1fr)"} marginRight={"50px"}>
            {isLoading && renderNowPlaying()}
          </Grid>
        </GridItem>
        <GridItem></GridItem>
      </Grid>
    </Box>
  );
};

export default NowPlaying;
