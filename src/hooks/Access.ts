interface Props {
    children: any;
    accessible: boolean;
}

const Access = ({ children, accessible }: Props) => accessible ? children : null;

export default Access;
