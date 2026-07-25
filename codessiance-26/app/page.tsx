import HeaderNav from "@/components/nav/HeaderNav";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Genres from "@/components/sections/Genres";
import Timeline from "@/components/sections/Timeline";
import TopArtist from "@/components/sections/TopArtist";
import InRotation from "@/components/sections/InRotation";
import Recap from "@/components/sections/Recap";
import Outro from "@/components/sections/Outro";
import Footer from "@/components/sections/Footer";
import Loader from "@/components/loader/Loader";

/**
 * Codessiance '26 — Main Page
 * Exact Spotify 2025 Wrapped Newsroom Layout
 */
export default function Home() {
  return (
    <>
      <Loader />
      <main>
        <Hero />
        <Intro />
        <Genres />
        <Timeline />
        <TopArtist />
        <InRotation />
        <Recap />
        <Outro />
        <Footer />
      </main>
    </>
  );
}
