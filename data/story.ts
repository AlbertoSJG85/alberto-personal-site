import { useLocale, type Locale } from "@/components/LanguageProvider";

/**
 * "Mi historia" — texto personal de Alberto. El español es verbatim de
 * `MI_HISTORIA_LANDING.md` (raíz del proyecto): si Alberto trae una versión
 * nueva de ese archivo, `storyContent.es` es lo único que hay que
 * actualizar para reflejarla. El inglés es una traducción fiel, no
 * literal palabra por palabra, hecha para esta landing.
 *
 * Estructura: un subtítulo, una serie de bloques (cada uno con su propio
 * titular en negrita y uno o varios párrafos) y un cierre. Los `**texto**`
 * dentro de heading/paragraphs se resaltan en pantalla — ver
 * `components/InlineEmphasis.tsx`.
 */

export interface StoryBeat {
  heading: string;
  paragraphs: string[];
}

export interface StoryContent {
  eyebrow: string;
  beats: StoryBeat[];
  closing: string;
}

export const storyContent: Record<Locale, StoryContent> = {
  es: {
    eyebrow: "Por qué empecé — y hasta dónde me llevó",
    beats: [
      {
        heading: "Siempre he tenido más ideas de las que sabía construir.",
        paragraphs: [
          "Durante años he querido **crear cosas, probar negocios, mejorar procesos** o simplemente hacer realidad alguna idea que se me había metido en la cabeza. Y demasiadas veces acababa encontrándome con el mismo límite: **había una parte tecnológica que no sabía resolver**.",
          "Había aprendido cosas por mi cuenta, buscando, probando y desmontando todo lo que caía en mis manos. Pero llegó un momento en el que entendí que, si realmente quería dejar de depender de ese límite, tenía que aprenderlo de verdad.",
          "**Y decidí estudiarlo formalmente.**",
        ],
      },
      {
        heading: "Aprender era una cosa. Sentir que realmente sabía construir algo era otra.",
        paragraphs: [
          "Al principio tenía **muchas dudas sobre mis propias capacidades**. Podía estudiar, hacer ejercicios y entender conceptos, pero necesitaba saber si sería capaz de coger **un problema real** y convertirlo en algo que funcionara fuera de una práctica o un tutorial.",
          "Por eso empecé por lo que mejor conocía.",
        ],
      },
      {
        heading: "RentOS y PilotOS fueron, en cierta manera, una prueba que me puse a mí mismo.",
        paragraphs: [
          "**RentOS** nació de las necesidades que tenía gestionando mis alojamientos. **PilotOS**, de todo lo que conocía después de años trabajando con un taxi.",
          "Eran **problemas reales, míos**, y no había ningún enunciado diciéndome qué tenía que hacer ni cuál era la respuesta correcta.",
          "**Tenía que descubrirla.**",
          "Y cuando empezaron a funcionar ocurrió algo importante:",
          "**dejé de preguntarme si sería capaz de construir algo de verdad.**",
          "Empecé a pensar en qué más podía construir...",
        ],
      },
      {
        heading: "Y entonces apareció NexOS.",
        paragraphs: [
          "Porque entendí algo bastante natural: si aquellas herramientas estaban consiguiendo **ahorrarme tiempo, quitarme trabajo y resolver problemas** que me acompañaban todos los días, seguramente yo no era la única persona que los tenía.",
          "Ahí empezó a cambiar todo.",
          "Ya no se trataba únicamente de hacer herramientas para mí, sino de **convertir esos aprendizajes en soluciones que pudieran ayudar también a otras personas**.",
        ],
      },
      {
        heading: "Desde entonces, cada proyecto ha sido también una forma de aprender.",
        paragraphs: [
          "Algunos han crecido, otros han cambiado por completo y muchos me han obligado a **replantear decisiones que estaba convencido de haber tomado bien**.",
          "Y creo que precisamente ahí es donde más he aprendido: **cuando algo no salía como esperaba y tenía que volver a entender el problema desde el principio**.",
          "Pero todos han reforzado la misma forma de trabajar:",
          "**entender primero el problema, construir una solución y comprobar después si realmente mejora algo.**",
        ],
      },
      {
        heading:
          "Lo que más me engancha sigue siendo ver cómo una idea deja de estar en mi cabeza y empieza a funcionar de verdad.",
        paragraphs: [
          "Hay algo difícil de explicar en ese momento.",
          "Ver cómo **un proceso ocurre solo**, cómo desaparece una tarea que antes te quitaba tiempo o cómo alguien utiliza algo que nació simplemente como una idea.",
          "Probablemente esa sensación sea una de las razones por las que sigo construyendo.",
        ],
      },
      {
        heading:
          "Hoy NexOS reúne productos, automatizaciones y agentes que han ido creciendo alrededor de esa misma idea. Y yo estoy en otro punto también.",
        paragraphs: [
          "He aprendido muchísimo **construyendo solo, tomando decisiones, equivocándome y buscando la manera de sacar cada proyecto adelante**.",
          "Pero precisamente por eso siento que ha llegado el momento de salir de ese entorno que conozco.",
          "Ahora quiero sumar algo que no puedo conseguir construyendo únicamente por mi cuenta:",
          "**trabajar junto a otros buenos ingenieros, aprender otras formas de resolver problemas y enfrentarme a retos que no haya elegido yo.**",
        ],
      },
    ],
    closing:
      "Porque después de aprender durante años resolviendo mis propios problemas, quiero descubrir hasta dónde puedo llegar ayudando a resolver los de otros.",
  },
  en: {
    eyebrow: "Why I started — and where it took me",
    beats: [
      {
        heading: "I've always had more ideas than I knew how to build.",
        paragraphs: [
          "For years I've wanted to **create things, try out businesses, improve processes**, or simply make real some idea that had gotten stuck in my head. And too often I ran into the same wall: **there was a technical piece I didn't know how to solve**.",
          "I'd learned things on my own — searching, trying, taking apart whatever fell into my hands. But at some point I understood that if I really wanted to stop depending on that limit, I had to learn it properly.",
          "**So I decided to study it formally.**",
        ],
      },
      {
        heading: "Learning was one thing. Feeling like I could actually build something was another.",
        paragraphs: [
          "At first I had **a lot of doubts about my own ability**. I could study, do exercises and understand concepts, but I needed to know whether I'd be capable of taking **a real problem** and turning it into something that worked outside of a practice run or a tutorial.",
          "So I started with what I knew best.",
        ],
      },
      {
        heading: "RentOS and PilotOS were, in a way, a test I set for myself.",
        paragraphs: [
          "**RentOS** came out of the needs I had managing my own rental properties. **PilotOS**, out of everything I knew after years working as a taxi driver.",
          "They were **real problems, mine**, with no assignment telling me what to do or what the right answer was.",
          "**I had to figure it out.**",
          "And when they started working, something important happened:",
          "**I stopped asking myself whether I was capable of building something real.**",
          "I started thinking about what else I could build...",
        ],
      },
      {
        heading: "And then NexOS came along.",
        paragraphs: [
          "Because I understood something fairly obvious: if those tools were managing to **save me time, take work off my plate and solve problems** I dealt with every day, I probably wasn't the only person who had them.",
          "That's when everything started to change.",
          "It stopped being just about building tools for myself, and became about **turning what I'd learned into solutions that could help other people too**.",
        ],
      },
      {
        heading: "Since then, every project has also been a way of learning.",
        paragraphs: [
          "Some have grown, others have changed completely, and many have forced me to **rethink decisions I was convinced I'd gotten right**.",
          "And I think that's exactly where I've learned the most: **when something didn't go as expected and I had to go back and understand the problem from scratch**.",
          "But all of them reinforced the same way of working:",
          "**understand the problem first, build a solution, and only then check whether it actually makes things better.**",
        ],
      },
      {
        heading:
          "What still hooks me the most is watching an idea stop living in my head and start actually working.",
        paragraphs: [
          "There's something hard to put into words in that moment.",
          "Watching **a process just happen on its own**, watching a task that used to eat your time disappear, or watching someone use something that started out as just an idea.",
          "That feeling is probably one of the reasons I keep building.",
        ],
      },
      {
        heading:
          "Today NexOS brings together products, automations and agents that have grown around that same idea. And I'm in a different place too.",
        paragraphs: [
          "I've learned a huge amount **building alone, making decisions, getting things wrong and finding a way to push every project forward**.",
          "But that's exactly why I feel it's time to step outside the environment I already know.",
          "Now I want to add something I can't get by building on my own:",
          "**working alongside other good engineers, learning other ways of solving problems, and taking on challenges I didn't choose myself.**",
        ],
      },
    ],
    closing:
      "Because after years of learning by solving my own problems, I want to find out how far I can go helping solve other people's.",
  },
};

/** Devuelve `storyContent` en el idioma activo. Solo usable en cliente. */
export function useStoryContent(): StoryContent {
  const { locale } = useLocale();
  return storyContent[locale];
}
