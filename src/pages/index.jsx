import Head from 'next/head'
import Image from 'next/image'
import bozoImg from '../../public/Bozo_Logo.jpg'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/api/auth/discord';
  }
  return (
    <div style={{backgroundColor: "#202020", display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100vh", width: "100vw", minHeight: "100vh", height: "100vh"}}>
      <Head>
        <title>Bozo Scanner</title>
      </Head>
      <div style={{
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-start", 
        minHeight: "18em", 
        height: "18em", 
        width: "15em", 
        minWidth: "15em", 
        backgroundColor: "#171717", 
        border: "1px solid #2d2d2d", 
        borderRadius: "3px"
      }}>
        <div style={{alignSelf: "center", marginTop: "2em"}}>
          <Image 
            style={{borderRadius: "5px"}} 
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
            style={{
              alignSelf: "flex-end", 
              marginBottom: "2em", 
              backgroundColor: "#6985d9", 
              border: "none"
            }}
            onClick={handleLogin}>
              Login&nbsp;
              <FontAwesomeIcon icon={faDiscord} />
            </Button>
        </div>
      </div>
    </div>
  )
}
