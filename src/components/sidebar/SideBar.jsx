import { Row } from "react-bootstrap";
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import bozo from '../../../public/Bulk_Bozo_Banner.png';

export default function SideBar() {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <div style={{padding: "0", width: "22em", borderRight: "1px solid #111111"}}>
      <Row>
        <Image alt={"Bozo"} src={bozo} />
      </Row>
      <Row>
        <Link style={{width: "97%", height: "2.5em", fontSize: "2.5em", textDecoration: "none", color: "white", padding: "1em 0em 0em 0.9em",
            borderBottom: pathName === "/scan" ? "2px solid #ffc801" : "2px solid", fontFamily: "BasicFont"}} href="/scan">Scan</Link>
      </Row>
      <Row>
        <Link style={{width: "97%", height: "2.5em", fontSize: "2.5em", textDecoration: "none", color: "white", padding: "1em 0em 0em 0.9em",
            borderBottom: pathName === "/inventory" ? "2px solid #ffc801" : "2px solid",fontFamily: "BasicFont"}} href="/inventory">Inventory</Link>
      </Row>
    </div>
  );
}
