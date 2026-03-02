export default function Button({
  children,
  textOnly,
  className = "",
  ...props
}) {
  let cssClass =
    " px-4 py-2 bg-primary cursor-pointer border-1 border-primary rounded text-dark";
  if (textOnly) {
    cssClass = " text-xl cursor-pointer hover:opacity-90 ";
  }
  return (
    <button className={`${cssClass}  ${className} `} {...props}>
      {children}
    </button>
  );
}
