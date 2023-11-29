"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation/Navigation";
import Logo from "@/components/Logo/Logo";
import ImageFormLink from "@/components/ImageFormLink/ImageFormLink";
import Rank from "@/components/Rank/Rank";
import FaceRecognition from "@/components/FaceRecognition/FaceRecognition";
import Particles from "react-tsparticles";
import particlesOptions from "@/config/particles";
import Signin from "@/Forms/Signin/Signin";
import Register from "@/Forms/Register/Register";
import { jwtDecode } from "jwt-decode";
import { loadFull } from "tsparticles";
import styles from "./page.module.css";

function Home() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const tsparticlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const gettingUserToken = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsSignedIn(true);
      onRouteChange("home");
      const decodedUser = jwtDecode(token);
      fetch(`/api/profile/${decodedUser.id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          const { user } = response;
          loadUser(user);
        });
    }
  };

  console.log("usersaqwe :", user);

  useEffect(() => {
    gettingUserToken();
  }, []);

  const calculateFaceLocation = (data, width, height) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageError(false);
    setImageUrl(input);

    const raw = JSON.stringify({
      user_app_id: {
        user_id: "728q8cbd1vq6",
        app_id: "86835993baa44eada3aa248ff5e6e273",
      },
      inputs: [
        {
          data: {
            image: {
              url: input,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key 5d7f0c820a5a43a2a3db4029a226e448",
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/face-detection/versions/45fb9a671625463fa646c3523a3087d5/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        const image = document.getElementById("inputImage");
        const width = image.width;
        const height = image.height;

        if (width && height) {
          fetch("/api/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((response) => {
              const { count } = response;
              setUser({
                ...user,
                entries: count,
              });
            })
            .catch((err) => console.log(err));

          displayBox(calculateFaceLocation(result, width, height));
        } else {
          setImageError(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    if (route === "home") {
      setIsSignedIn(true);
    } else if (route !== "home") {
      setIsSignedIn(false);
    }

    setRoute(route);
  };

  const loadUser = (data) => {
    console.log("userr: ", data);
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    };
    
    setUser(user);
  };

  return (
    <div className={styles.App}>
      <Navigation
        setImageUrl={setImageUrl}
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageFormLink
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition
            imageError={imageError}
            box={box}
            imageUrl={imageUrl}
          />
        </>
      ) : (
        <>
          {route === "signin" ? (
            <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
          ) : (
            <Register loadUser={loadUser} onRouteChange={onRouteChange} />
          )}
        </>
      )}

      <Particles
        className={styles.particles}
        id="tsparticles"
        init={tsparticlesInit}
        options={particlesOptions}
      />
    </div>
  );
}

export default Home;
