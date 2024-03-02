// pages/login.jsx

import Home from '../componets/home';
import Navbar from '../componets/navbar/navbar';

const Home1 = () => {
  return (
    <div>
      <style jsx global>{`
      body {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap" rel="stylesheet"></link>
      <Navbar />
      <Home />
    </div>
  )
};

export default Home1;
