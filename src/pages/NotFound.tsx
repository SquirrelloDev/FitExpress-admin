import {useNavigate} from "react-router-dom";
import {appRoutes} from "../utils/routes";

function NotFound() {
	const navigate = useNavigate()
	const returnToSafe = () => {
		navigate(appRoutes.login)
	}
	return (
		<main>
			<h1>Zawróć!</h1>
			<p>Zawędrowałeś tam, gdzie diabeł idzie spać</p>
			<p>Użyj przycisku poniżej, by szybko stąd uciec!</p>
			<button onClick={returnToSafe}>Powrót</button>
		</main>
	)
}
export default NotFound