import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/ui/Layout';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { About } from './components/sections/About';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<>
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Contact />
        </>} />
      </Routes>
    </Layout>
  );
}
