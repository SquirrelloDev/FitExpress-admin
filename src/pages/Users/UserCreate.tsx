import inputStyles from '../../sass/components/text-input.module.scss'
import btnStyles from '../../sass/components/button.module.scss'
import classes from "../../sass/components/form.module.scss";
function UserCreate() {
    return (
        <div>
            <h2>Nowy użytkownik</h2>
            <form className={classes.form}>
                <input type='text' className={inputStyles.input} placeholder='Nazwa'/>
                <input type='text' className={inputStyles.input} placeholder='Adres email'/>
                <input type='password' className={inputStyles.input} placeholder='Hasło'/>
                {/*	data ur.*/}
				{/* select z poziomem autoryzacji*/}
                <button type='submit' className={btnStyles.btn}>Stwórz</button>
            </form>
			<p>Dane dotyczące zdrowia są niedostępne do edycji</p>
        </div>
    )
}

export default UserCreate