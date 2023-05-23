import { Box, Button, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Modal from "react-modal";

const NowPlaying = () => {
  const [movies, setMovies] = useState({});
  const [detailMovies, setDetailMovies] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const renderNowPlaying = () => {
    return movies.map(async (data) => {
      try {
        const dataSpesifikMovies = await axios.get(
          `https://api.themoviedb.org/3/movie/` + data.id
        );
        setDetailMovies(dataSpesifikMovies.data);
        setIsloading(true);
      } catch (error) {
        console.log(error);
      }

      return (
        <GridItem>
          <Box
            border={"1px solid black"}
            paddingY={"5px"}
            textAlign={"center"}
            height={"500px"}
          >
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
              <i class="fa fa-ticket" />
              {data.release_date}
              <i class="fa fa-star-o" />
              {data.vote_average}
            </Text>
            <Button onClick={openModal}>Link to go</Button>
          </Box>
        </GridItem>
      );
    });
  };

  const renderDetail = () => {
    return detailMovies.map(async (data) => {
      return (
        <Text>helo</Text>
      )
    })}

  const renderNowPlayingCarousell = () => {
    return movies.map((data) => {
      return (
        <GridItem>
          <Box paddingY={"5px"} textAlign={"center"} height={"500px"}>
            <button onClick={openModal}>Open Modal</button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <Button onClick={closeModal} alignSelf={"right"}>Close</Button>
              <Grid gridTemplateColumns={"1fr 3fr"}>
                <GridItem>
                <Image
              src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
              height={"300px"}
            >{data.tagline}</Image>
                </GridItem>
                <GridItem>
                  {data.original_title} <br/>
                  <i class="fa fa-ticket" />
              {data.release_date}
              <i class="fa fa-star-o" />
              {data.vote_average}
              <i class="icon-money"/>
              {data.revenue}
                </GridItem>
              </Grid>
              <div>I am a modal</div>
              <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
              </form>
            </Modal>
            <a href="/detail/{data.id}">
              <Image
                src={"https://image.tmdb.org/t/p/original/" + data.poster_path}
                height={"400px"}
              ></Image>
              <Text>
                <b>{data.original_title}</b>
              </Text>
              <Text>{data.overview}</Text>
            </a>
          </Box>
        </GridItem>
      );
    });
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    genresChoice();
    renderNowPlaying();
  }, []);
  return (
    <Box height={"500px"} marginLeft={"200px"}>
      <Grid marginTop={"50px"} gridTemplateRows={"1fr 5fr"} color={"black"}>
        <GridItem>
          <Grid>
            <Carousel
              autoPlay
              infiniteLoop
              interval="1000"
              width={"900px"}
              height={"500px"}
            >
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
