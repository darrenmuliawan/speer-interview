import { cn } from "../../utils";
import { LoadingIndicator } from "../Loading";

interface Props {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  loading?: boolean;
}

export const Button = (props: Props) => {
  const { onClick, className, children, loading } = props;

  return (
    <button
      className={cn(
        "w-full cursor-pointer bg-neutral-50 border border-neutral-200 rounded-lg p-2 text-sm h-10 hover:bg-neutral-100 duration-200",
        loading ? "cursor-not-allowed hover:bg-neutral-50" : "",
        className
      )}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <LoadingIndicator /> : children}
    </button>
  );
};
