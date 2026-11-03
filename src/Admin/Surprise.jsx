
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AdminStyles/Surprise.css"


import myPhoto from "../AbtImg/img1.jpeg"
import specialPhoto from "../AbtImg/img2.jpeg";
import memoryVideo from "../AbtImg/vid1.mp4";
import song from "../AbtImg/boomer.mp3";
import image from '../AbtImg/img3.jpeg'

function Surprise() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeMemory, setActiveMemory] = useState(null);
  const [letterOpen, setLetterOpen] = useState(false);
  const [surpriseOpen, setSurpriseOpen] = useState(false);

  // Admin protection
  useEffect(() => {
    const adminGate = localStorage.getItem("AdminLogin");

    if (adminGate !== "true") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Music control
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicPlaying(true);
      } catch (error) {
        console.log("Music error:", error);
      }
    }
  };

  // Start experience
  const beginJourney = () => {
    setStarted(true);

    document.getElementById("beginning")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  // Memory data
  const memories = [
    {
      number: "01",
      title: "The First Chapter",
      subtitle: "Every beautiful story has a beginning.",
      description:
        "Sometimes we don't realize that an ordinary day is actually the beginning of something extraordinary. Looking back, I'm glad our paths crossed.",
      icon: "bi-stars",
    },
    {
      number: "02",
      title: "Little Moments",
      subtitle: "The smallest things become the biggest memories.",
      description:
        "The random conversations, the unexpected smiles, the silly moments and all those little things that made ordinary days special.",
      icon: "bi-heart",
    },
    {
      number: "03",
      title: "My Favourite Person",
      subtitle: "Some people simply feel different.",
      description:
        "There are people with whom you never have to pretend. You can simply be yourself. And that comfort is something truly special.",
      icon: "bi-moon-stars",
    },
    {
      number: "04",
      title: "Still My Favourite Story",
      subtitle: "Some memories never get old.",
      description:
        "Even if time moves forward, some moments will always remain beautiful. And some people will always have a special place in our memories.",
      icon: "bi-infinity",
    },
  ];

  const timeline = [
    {
      date: "THE BEGINNING",
      title: "The Day started in Chromepet",
      description: "A simple beginning that became a beautiful memory.",
    },
    {
      date: "A LITTLE LATER",
      title: "3 hrs later",
      description: "Those little moments that made the days better.",
    },
    {
      date: "SOMEWHERE ALONG THE WAY",
      title: "A Special Connection",
      description: "When someone slowly becomes an important part of life.",
    },
    {
      date: "TODAY & ALWAYS",
      title: "A Story Worth Keeping",
      description: "Some memories deserve to stay forever.",
    },
  ];

  return (
    <div className="midnight-page">

      <audio ref={audioRef} src={song} loop />

      {/* MUSIC BUTTON */}
      <button className="midnight-music" onClick={toggleMusic}>
        <i className={`bi ${musicPlaying ? "bi-pause-fill" : "bi-play-fill"}`}></i>
        {musicPlaying ? "Pause Music" : "Play Music"}
      </button>

      {/* BACK BUTTON */}
      <button
        className="midnight-back"
        onClick={() => navigate("/nutritionist")}
      >
        <i className="bi bi-arrow-left"></i>
        Back
      </button>

      {/* HERO */}
      <section className="midnight-hero">

        <div className="midnight-stars"></div>

        <div className="hero-content">
          <span className="hero-label">
            A LITTLE SOMETHING FOR YOU
          </span>

          <div className="hero-heart">
            <i className="bi bi-heart-fill"></i>
          </div>

          <h1>
            If I Could
            <br />
            <span>Relive It Again...</span>
          </h1>

          <p>
            Some moments become memories.
            <br />
            Some memories become feelings.
            <br />
            And some people become unforgettable.
          </p>

          <button className="journey-button" onClick={beginJourney}>
            Begin Our Story
            <i className="bi bi-arrow-down"></i>
          </button>

          <div className="hero-bottom">
            <span>MADE WITH A LITTLE EXTRA LOVE</span>
          </div>
        </div>

        <div className="hero-glow"></div>
      </section>

      {/* BEGINNING */}
      <section className="midnight-section beginning-section" id="beginning">

        <div className="midnight-heading">
          <span>01 — THE BEGINNING</span>

          <h2>
            Every story has
            <br />
            <span>a beautiful beginning.</span>
          </h2>

          <p>
            I don't know exactly when it happened,
            but somewhere along the way,
            you became someone special.
          </p>
        </div>

        <div className="beginning-photo">
          <img src={myPhoto} alt="A special memory" />

          <div className="photo-overlay">
            <span>A MOMENT TO REMEMBER</span>
            <h3>One beautiful chapter.</h3>
          </div>
        </div>

      </section>

      {/* MEMORIES */}
      <section className="midnight-section memories-section">

        <div className="midnight-heading">
          <span>02 — LITTLE THINGS</span>

          <h2>
            It's always the
            <br />
            <span>little things.</span>
          </h2>

          <p>
            Not every beautiful memory needs a special occasion.
            Sometimes the simplest moments mean the most.
          </p>
        </div>

        <div className="memory-grid">

          {memories.map((memory, index) => (
            <button
              className={`memory-card ${
                activeMemory === index ? "memory-active" : ""
              }`}
              key={memory.number}
              onClick={() =>
                setActiveMemory(
                  activeMemory === index ? null : index
                )
              }
            >
              <span className="memory-number">{memory.number}</span>

              <i className={`bi ${memory.icon}`}></i>

              <h3>{memory.title}</h3>

              <p>{memory.subtitle}</p>

              {activeMemory === index && (
                <div className="memory-details">
                  {memory.description}
                </div>
              )}

              <span className="memory-action">
                {activeMemory === index ? "CLOSE" : "DISCOVER"}
                <i className="bi bi-arrow-up-right"></i>
              </span>
            </button>
          ))}

        </div>

      </section>

      {/* TIMELINE */}
      <section className="midnight-section timeline-section">

        <div className="midnight-heading">
          <span>03 — OUR LITTLE TIMELINE</span>

          <h2>
            Time passes.
            <br />
            <span>Memories stay.</span>
          </h2>
        </div>

        <div className="memory-timeline">

          {timeline.map((item, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot">
                <i className="bi bi-heart-fill"></i>
              </div>

              <div className="timeline-content">
                <span>{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}

        </div>

      </section>

      {/* PHOTO MEMORY */}
      <section className="midnight-photo-section">

        <div className="midnight-photo-content">

          <span>04 — A FAVOURITE MEMORY</span>

          <h2>
            Some pictures
            <br />
            <span>hold a thousand feelings.</span>
          </h2>

          <div className="special-photo-frame">
            <img src={image} alt="Our special photograph" />
            <span>ONE FOR THE HEART.</span>
          </div>

          <p>
            If I could save one thing from time,
            it would be the moments that made me smile.
          </p>

        </div>

      </section>

      {/* VIDEO */}
      <section className="midnight-section video-section">

        <div className="midnight-heading">
          <span>05 — PLAY IT AGAIN</span>

          <h2>
            A moment worth
            <br />
            <span>watching forever.</span>
          </h2>
        </div>

        <div className="cinema-frame">
          <video controls playsInline preload="metadata">
            <source src={memoryVideo} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>

        <p className="video-caption">
          Some moments deserve more than one replay.
        </p>

      </section>

      {/* LETTER */}
      <section className="midnight-section letter-section">

        <div className="midnight-heading">
          <span>06 — THINGS I NEVER SAID</span>

          <h2>
            A few words
            <br />
            <span>from my heart.</span>
          </h2>

          <p>
            There are some feelings that are easier to write than say.
          </p>
        </div>

        <div className="letter-envelope">
          <div className="envelope-icon">
            <i className="bi bi-envelope-heart"></i>
          </div>

          <h3>A letter for you.</h3>

          <p>There is something I have been wanting to tell you...</p>

          <button
            className="letter-button"
            onClick={() => setLetterOpen(!letterOpen)}
          >
            {letterOpen ? "Close Letter" : "Open My Letter"}
            <i className="bi bi-arrow-up-right"></i>
          </button>

          {letterOpen && (
            <div className="letter-content">
              <span>DEAR SPECIAL PERSON,</span>

              <p>
                I may not always express everything perfectly,
                but I hope you know that you are someone
                truly special to me.
              </p>

              <p>
                Thank you for the smiles, the little moments,
                the memories and all the happiness you have
                brought into my life.
              </p>

              <p>
                I don't know what the future holds,
                but I know that the memories we create
                will always mean something to me.
              </p>

              <p className="letter-sign">
                With Boomer,
                <br />
                Someone who treasures you. ❤️
              </p>
            </div>
          )}
        </div>

      </section>

      {/* FINAL SURPRISE */}
      <section className="midnight-ending">

        {!surpriseOpen ? (

          <div className="surprise-intro">

            <span>07 — ONE LAST THING</span>

            <div className="surprise-heart">
              <i className="bi bi-gift"></i>
            </div>

            <h2>
              Wait...
              <br />
              <span>There is one more thing.</span>
            </h2>

            <p>
              Before you leave, I have something
              special I want you to see.
            </p>

            <button
              className="surprise-button"
              onClick={() => setSurpriseOpen(true)}
            >
              Reveal Your Surprise
              <i className="bi bi-stars"></i>
            </button>

          </div>

        ) : (

          <div className="surprise-reveal">

            <span>MY FAVOURITE PERSON</span>

            <div className="reveal-photo">
              <img src={specialPhoto} alt="My special person" />
            </div>

            <h2>
              If I could go back...
              <br />
              <span>I'd still choose this story.</span>
            </h2>

            <p>
              Among all the ordinary days,
              you became one of my favourite memories.
            </p>

            <div className="final-letter">
              <i className="bi bi-heart-fill"></i>

              <h3>One last thing...</h3>

              <p>
                You might never know how much
                the little moments mean to me.
                But I hope this little corner of the internet
                reminds you that you are special.
              </p>

              <span>FOREVER A BEAUTIFUL MEMORY. ❤️</span>
            </div>

          </div>

        )}

      </section>

      {/* FOOTER */}
      <footer className="midnight-footer">
        <i className="bi bi-heart-fill"></i>

        <h3>Some stories are worth keeping.</h3>

        <p>MADE WITH LOVE · 2026</p>

        <span>END OF OUR LITTLE JOURNEY.</span>
      </footer>

    </div>
  );
}

export default Surprise;
