import { Blog } from "./components/Blog";
import { Calculator } from "./components/Calculator";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { FullImage } from "./components/FullImage";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { Process } from "./components/Process";
import { PSA } from "./components/PSA";
import { Reviews } from "./components/Reviews";
import { Services } from "./components/Services";
import { Team } from "./components/Team";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Intro />
      <PSA />
      <Process />
      <FullImage />
      <FAQ />
      <Calculator />
      <Team />
      <Reviews />
      <Blog />
      <Contact />
    </main>
  );
}
