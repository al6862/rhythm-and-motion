import SpinningLogo from "./components/SpinningLogo";

export default function Loading() {
  return (
    <div className="bg-black w-full h-screen flex justify-center items-center">
      <SpinningLogo />
    </div>
  )
}