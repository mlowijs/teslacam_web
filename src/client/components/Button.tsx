import * as styles from "../index.scss";
import * as React from "react";
import classNames from "classnames";

interface Props {
    onClick: () => void;
}

const Button: React.FunctionComponent<Props> = (props) =>
    <button className={classNames(styles.button)} onClick={props.onClick}>{props.children}</button>;

export default Button;