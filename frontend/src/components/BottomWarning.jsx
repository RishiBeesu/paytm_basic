import { Link } from "react-router-dom";

export function BottomWarning({ description, buttonText, to }) {
  return (
    <div className="flex justify-center py-2 text-sm">
      <div>{description}</div>
      <Link to={to} className="pl-1 underline">
        {buttonText}
      </Link>
    </div>
  );
}
