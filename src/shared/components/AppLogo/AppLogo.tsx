import logo from "@/assets/maroc.svg";

import styles from "./AppLogo.module.scss";

type Props = {
    className?: string;
};

export function AppLogo({ className }: Props) {
    return <img className={className ?? styles.logo} src={logo} alt="Royal Air Maroc" />;
}
