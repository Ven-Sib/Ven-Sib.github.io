import Water from './components/Water';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Postings from './components/Postings';
import Admin from './components/Admin';
import { useRoute } from './lib/route';

export default function App() {
  const { page, sub } = useRoute();

  if (page === 'admin') {
    return (<><Water /><Admin /></>);
  }

  let view;
  switch (page) {
    case 'about': view = <About />; break;
    case 'experience': view = <Experience />; break;
    case 'projects': view = <Projects />; break;
    case 'leadership': view = <Leadership />; break;
    case 'postings': view = <Postings sub={sub} />; break;
    default: view = <Home />;
  }

  return (
    <>
      <Water />
      <Nav page={['about','experience','projects','leadership','postings'].includes(page) ? page : 'home'} />
      <main>{view}</main>
      <Footer />
    </>
  );
}
