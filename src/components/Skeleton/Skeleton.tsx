import "react-loading-skeleton/dist/skeleton.css";
import ReactLoadingSkeleton from "react-loading-skeleton";
import { cn } from "../../utils";

interface Props {
  className?: string;
  count?: number;
}
export const Skeleton = (props: Props) => {
  const { className = "", count = 1 } = props;

  return (
    <ReactLoadingSkeleton
      baseColor="#dedede"
      className={cn("rounded-lg", className)}
      count={count}
    />
  );
};
