import {useNavigate} from "react-router-dom";
import {appRoutes} from "../utils/routes";

function Unauthorized() {
	const navigate = useNavigate()
	const returnToSafe = () => {
	  navigate(appRoutes.login)
	}
	return (
		<main>
			<h1>Zawróć!</h1>
			<p>Nie możesz wykonać tej akcji</p>
			<p>Zaloguj się ponownie lub skontaktuj się z administratorem</p>
			<button onClick={returnToSafe}>Powrót do logowania</button>
		</main>
	)
}
export default Unauthorized