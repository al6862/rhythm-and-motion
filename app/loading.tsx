import SpinningLogo from "./components/SpinningLogo";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <SpinningLogo />
    </div>
  );
}
