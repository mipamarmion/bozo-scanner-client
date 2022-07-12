import SneakerForm from "../components/scan/SneakerForm.jsx";
import Layout from "../containers/Layout.jsx";
import { authenticatePage } from "../controllers/authenticate";

function Scan(props) {
  return (
      <Layout>
          <SneakerForm user={props.user} />
      </Layout>
  );
}

export async function getServerSideProps(context) {
  return await authenticatePage(context);
}

export default Scan;
