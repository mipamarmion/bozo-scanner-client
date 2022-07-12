import Head from 'next/head'
import Image from 'next/image'
import bozoImg from '../../public/Bozo_Logo.jpg'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function Home(props) {
  const handleLogin = () => {
    window.location.href = props.redirectUrl;
  }
  
  return (
    <div className={"login-page"}>
      <Head>
        <title>Bozo Scanner</title>
      </Head>
      <div className={"login-container"}>
        <div style={{alignSelf: "center", marginTop: "2em"}}>
          <Image 
            style={{borderRadius: "100%"}} 
            src={bozoImg} 
            width="150px" 
            height="150px" 
            alt="Login" />
        </div>
        <div style={{
          display:"flex", 
          alignSelf: "center", 
          height: "100%"
        }}>
          <Button 
            className={"login-button"}
            onClick={handleLogin}>
              Login&nbsp;
              <FontAwesomeIcon icon={faDiscord} />
            </Button>
        </div>
      </div>
      <div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 200, 1,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255, 200, 1,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255, 200, 1,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#ffc801" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export function getStaticProps() {
  return {props: {redirectUrl: process.env.API_URL + '/auth/discord'}};
}
