import { Box } from "../MUI/MuiBox";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "../../styles/scss/certifiedHistory.scss";
import img4 from "../../assets/img4.png";
import img2 from "../../assets/img2.png";
import { useTranslation } from "react-i18next";
import { useTranslationProvider } from "../../providers/TranslationProvider";
import { useNavigate } from "react-router-dom";

export const TheBrand = () => {
  const { t } = useTranslation();
  const { language } = useTranslationProvider();
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
    const panel = document.querySelector("#certified-history-image");
    if (panel == null) return;

    panel.addEventListener("mousemove", handleMouseMovement);

    return () => {
      panel.removeEventListener("mousemove", handleMouseMovement);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!entry.target.classList.contains("appear-from-right")) {
              entry.target.classList.add("appear-from-right");
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

  return (
    <>
      <Box
        sx={{
          background: "transparent",
          padding: window.innerWidth > 600 ? "16vh 0 16vh" : "2vh 16px 8vh",
        }}
        id="third"
      >
        <Grid
          container
          spacing={0}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
          <Grid md={1} xs={12}></Grid>
          <Grid
            md={5}
            xs={12}
            id="certified-history-text-container"
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
              {t("brandTitle.1")} <span style={{ color: "#ffcd00" }}> A-STYLE </span> {t("brandTitle.2")}
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
              {t("brandText")} <br></br> 
              {t("brandText.1")}
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

          <Grid
            md={5}
            xs={12}
            className="container-certified-history-image"
            ref={elementRef}
            id="certified-history-image-container"
          >
            <img
              id="certified-history-image"
              className="certified-history-image"
              src={img2}
            ></img>
            <div id="certified-history-first-bubble-background"></div>
            <div id="certified-history-second-bubble-background"></div>
            <div id="certified-history-third-bubble-background"></div>
            <div id="certified-history-fourth-bubble-background"></div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
