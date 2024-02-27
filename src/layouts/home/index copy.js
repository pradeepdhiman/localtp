
import curved9 from "assets/images/banners/african-man-black-suit.jpg"
// import curved9 from "assets/images/curved-images/homeBanner.png";
import HomeLayout from "./components/homelayout";


function Home() {



  return (
    <HomeLayout
      title="Welcome to online Training Portal"
      description="Unlock Your AML-Compliance Skills with Compliance360: Your Compliance 
      Training Begins Here! Welcome to an exciting journey of learning and empowerment with 
      Compliance360! We are not just trainers – we're your professional partners in mastering the ever changing world of AML/CFT Compliance"
      image={curved9}
    >
    </HomeLayout>
  );
}

export default Home;
