import { cn } from "../../utils";

interface Props {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const Button = (props: Props) => {
  const { onClick, className, children } = props;

  return (
    <button
      className={cn(
        "w-full cursor-pointer bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-sm h-10 hover:bg-neutral-100 duration-200",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
