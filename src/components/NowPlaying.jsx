import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Modal from "react-modal";

const NowPlaying = () => {
  const [movies, setMovies] = useState({});
  const [moviesData, setMoviesData] = useState({});
  const [spesifikMovies, setSpesifikMovies] = useState({});
  const [modalID, setModalID] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isloadingData, setIsloadingData] = useState(false);

  const API_KEY = "1c432c5fa9b3027b5273b22979750c77";
  const genresChoice = async () => {
    try {
      const dataMovies = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
      );
      setMovies(dataMovies.data.results);
      setMoviesData(dataMovies.data.results);
      setIsloading(true);
    } catch (error) {
      console.log(error);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
    return moviesData.map((data) => {
      return (
        <GridItem>
          <Box
            // border={"1px solid black"}
            paddingY={"5px"}
            textAlign={"center"}
            height={"450px"}
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
            {/* </a> */}
            <Button
              onClick={() => {
                setModalID(data.id);
                detailMovie(data.id);
                console.log("ini dihomepage", data.id);
                openModal();
              }}
            >
              Link to trailer
            </Button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <Grid gridTemplateColumns={"1fr 3fr"} gap="50px">
                <GridItem>
                  <Image
                    src={
                      "https://image.tmdb.org/t/p/original/" +
                      spesifikMovies.poster_path
                    }
                    height={"300px"}
                  ></Image>
                  {spesifikMovies.tagline}
                </GridItem>
                <GridItem>
                  <Text fontSize={"30px"} fontWeight={"bold"}>
                    {spesifikMovies.original_title}
                  </Text>{" "}
                  <br />
                  <Button marginRight={"10px"} isDisabled>
                    <i class="fa fa-ticket" />
                    {spesifikMovies.release_date}
                  </Button>
                  <Button marginRight={"10px"} isDisabled>
                    <i class="fa fa-star-o" />
                    {spesifikMovies.vote_average}
                  </Button>
                  <Button marginRight={"10px"} isDisabled>
                    <i class="fa fa-money" />
                    {spesifikMovies?.revenue?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    <br />
                  </Button>
                  <Text>
                    {spesifikMovies?.genres?.map((arr) => {
                      return arr.name + " | ";
                    })}
                  </Text>
                  <Text width="500px" textAlign={"justify"}>
                    {spesifikMovies.overview}
                  </Text>
                  <HStack
                    justifyContent={"right"}
                    textAlign={"right"}
                    alignSelf={"right"}
                    justifySelf={"right"}
                  >
                    <Button onClick={closeModal}>Close</Button>
                  </HStack>
                </GridItem>
              </Grid>
            </Modal>
          </Box>
        </GridItem>
      );
    });
  };
  const renderNowPlayingCarousell = () => {
    return movies.map((data) => {
      return (
        <GridItem>
          <Box paddingY={"5px"} textAlign={"center"} height={"500px"}>
            <a
              href={
                "https://api.themoviedb.org/3/movie/" +
                data.id +
                "?api_key=" +
                API_KEY
              }
            >
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

  const detailMovie = async (id) => {
    try {
      const dataMovies = await axios.get(
        "https://api.themoviedb.org/3/movie/" + modalID + "?api_key=" + API_KEY
      );
      setSpesifikMovies(dataMovies.data);
      console.log(spesifikMovies);
      console.log(modalID);
      console.log(spesifikMovies.id);
      setIsloadingData(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    genresChoice();
  }, [isloadingData]);
  return (
    <Box height={"500px"} marginLeft={"200px"}>
      <Grid marginTop={"50px"} gridTemplateRows={"1fr 5fr"} color={"black"}>
        <GridItem>
          <Grid>
            <Carousel
              autoPlay
              infiniteLoop
              interval="1000"
              showThumbs={false}
              i
              // width={{lg: "1280px", md:"720px", sm:"480px", base:"100px"}}
              width={"1080px"}
              height={"720px"}
              marginRight={"25px"}
            >
              {isLoading && renderNowPlayingCarousell()}
            </Carousel>
          </Grid>
          <Text fontWeight={"bold"} fontSize={"24px"}>
            Now Playing
          </Text>
          <Grid
            gridTemplateColumns={"repeat(5, 1fr)"}
            marginRight={"50px"}
            textAlign={"center"}
            justifyContent={"center"}
            alignSelf={"center"}
            justifySelf={"center"}
            justifyItems={"center"}
          >
            {isLoading && renderNowPlaying()}
          </Grid>
        </GridItem>
        <GridItem></GridItem>
      </Grid>
    </Box>
  );
};

export default NowPlaying;
