import Hero from "@/components/sections/Hero";
import Genres from "@/components/sections/Genres";
import Artists from "@/components/sections/Artists";
import Timeline from "@/components/sections/Timeline";
import TopArtist from "@/components/sections/TopArtist";
import InRotation from "@/components/sections/InRotation";
import Recap from "@/components/sections/Recap";
import Outro from "@/components/sections/Outro";
import PlayerBar from "@/components/player/PlayerBar";
import Loader from "@/components/loader/Loader";

/**
 * Codessiance '26 — Main Page
 * Sections ordered to mirror Spotify Wrapped narrative arc:
 * Identity → Genres → Artists → Minutes → Top Artist → Recap → Share
 */
export default function Home() {
  return (
    <>
      <Loader />
      <main className="pb-20">
        {/* pb-20 clears the fixed player bar */}
        <Hero />
        <Genres />
        <Artists />
        <Timeline />
        <TopArtist />
        <InRotation />
        <Recap />
        <Outro />
      </main>
      <PlayerBar />
    </>
  );
}
