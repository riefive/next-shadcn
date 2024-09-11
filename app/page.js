import { Input } from "@/components/ui/input";

export function InputDemo() {
  return <Input type="email" placeholder="Email" />;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <InputDemo />
    </main>
  );
}
