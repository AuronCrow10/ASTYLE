import { Box } from "../MUI/MuiBox";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/scss/searchAndCopy.scss";
import img2 from "../../assets/img2.png";
import img4 from "../../assets/img4.png";
import img5 from "../../assets/img5.png";
import { useTranslation } from "react-i18next";

export const SearchAndCopy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const elementRef = useRef(null);
  function redirect(url: string) {
    window.location.href = url;
  }

  const [animationPlayed, setAnimationPlayed] = useState<boolean>(false);
  useEffect(() => {
    const handleMouseMovement = (e: any) => {
      const rect = e.target.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      e.target.style.setProperty("--mouse-x", `${mouseX}deg`);
      e.target.style.setProperty("--mouse-y", `${mouseY}deg`);
    };
    const panel = document.querySelector("#search-and-copy-image");
    if (panel == null) return;

    panel.addEventListener("mousemove", handleMouseMovement);

    return () => {
      panel.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);
  useEffect(() => {
    console.log(animationPlayed);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          /**Make sure that the timeout time is equal to the animation time */
          console.log(entry.isIntersecting);
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains("appear-from-left")) {
              entry.target.classList.add("appear-from-left");
              setTimeout(() => {
                setAnimationPlayed(true);
              }, 2000);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [animationPlayed]);

  const [textAnimation, setTextAnimation] = useState<boolean>(false);
  const textContainerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          /**Make sure that the timeout time is equal to the animation time */
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains("appear-from-bottom")) {
              entry.target.classList.add("appear-from-bottom");
              setTimeout(() => {
                setTextAnimation(true);
              }, 2000);
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (textContainerRef.current) {
      observer.observe(textContainerRef.current);
    }

    return () => {
      if (textContainerRef.current) {
        observer.unobserve(textContainerRef.current);
      }
    };
  }, [textAnimation]);
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box
        sx={{
          background: "transparent",
          padding: window.innerWidth > 600 ? "16vh 0 2vh" : "8vh 16px 0",
          marginTop: -scrollY / 20,
          transition: "left 0.3s ease",
        }}
        id="first"
      >
        <Grid container spacing={0} sx={{}}>
          <Grid md={1} xs={12}></Grid>
          <Grid
            md={5}
            xs={12}
            className="container-search-and-copy-image"
            ref={elementRef}
            id="search-and-copy-image-container"
          >
            <img
              id="search-and-copy-image"
              className="search-and-copy-image"
              src={img5}
            ></img>
            <div id="search-and-copy-first-bubble-background"></div>
            <div id="search-and-copy-second-bubble-background"></div>
            <div id="search-and-copy-third-bubble-background"></div>
            <div id="search-and-copy-fourth-bubble-background"></div>
          </Grid>
          <Grid
            md={5}
            xs={12}
            id="search-and-copy-text-container"
            ref={textContainerRef}
          >
            <Typography
              variant="h2"
              align="left"
              sx={{
                fontFamily: "Work Sans !important",
                fontWeight: "600",
                fontSize: window.innerWidth < 600 ? "32px" : "48px",
                marginTop: window.innerWidth > 600 ? "8vh" : "0",
              }}
            >
              {t("landing.searcCopyTitle.text")}{" "}
              <span style={{ color: "#ffcd00" }}> A-STYLE </span>
            </Typography>
            <Typography
              mt={2}
              variant="h6"
              align="left"
              sx={{
                fontFamily: "Work Sans !important",
                fontWeight: "300",
                fontSize: window.innerWidth < 600 ? "16px" : "18px",
              }}
            >
              {t("landing.searcCopy.text")}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "none",
                margin: "24px 0 8px 0",
                fontWeight: "600",
                padding: "10px 60px",
                borderRadius: "100px",
                fontSize: "16px",
              }}
              onClick={() => {
                navigate("/presale");
              }}
            >
              {t("landing.gotoPresale")}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
