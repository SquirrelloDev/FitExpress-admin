import {NavButton} from "../../utils/navButtons";
import {IconChevronDown, IconChevronUp, TablerIconsProps} from "@tabler/icons-react";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import classes from "../../sass/components/nav.module.scss";

interface NavItemProps {
    label: string,
    url?: string,
    Icon?: (props: TablerIconsProps) => JSX.Element,
    children?: NavButton[]
}
const activeLink = `${classes.nav__container__item} ${classes['nav__container__item--active']}`;

export function NavItem({label, Icon, url, children}: NavItemProps) {
    const [expanded, setExpanded] = useState<boolean>(false);
    if (url) {
        return (
            <NavLink to={url} className={({isActive}) => isActive ? activeLink : classes.nav__container__item}>
                {Icon && <Icon className={classes.nav__container__item__icon}/>}
                <p className={!Icon ? classes.nav__container__item__text : undefined}>{label}</p>
            </NavLink>
        )
    }
    return (
        <>
            <button className={`${classes.nav__container__item} ${classes.nav__container__btn}`} type='button' onClick={() =>{
                setExpanded(prevState => !prevState)}
            }>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/*@ts-expect-error*/}
                <Icon />
                {label}
                {expanded ? <IconChevronUp/> : <IconChevronDown/>}
            </button>
            {expanded && (
                <div>
                    {children?.map(child => <NavItem label={child.label} url={child.path}/>)}
                </div>
            )}

        </>
    )
}

export default NavItem;