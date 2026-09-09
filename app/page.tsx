import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import About from "@/components/About";
import Story from "@/components/Story";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/*
 * Orden de la página (decidido con Alberto): portada → sobre mí → mi
 * historia (desplegable) → stack → proyectos → contacto.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Capabilities />
        <About />
        <Story />
        <Stack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
