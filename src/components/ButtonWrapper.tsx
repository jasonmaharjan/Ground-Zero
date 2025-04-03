import "../styles/styles.css";

interface ButtonWrapperProps {
    children: React.ReactNode;
}
const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ children }) => {
    return <div className="button-wrapper">{children}</div>;
};

export default ButtonWrapper;
