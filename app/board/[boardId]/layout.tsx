interface BoardLayoutProps {
  children: React.ReactNode;
}

function BoardLayout({ children }: BoardLayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

export default BoardLayout;
