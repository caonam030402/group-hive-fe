import { usePathname, useRouter } from "next/navigation";

export default function useJump() {
  const router = useRouter();
  const pathname = usePathname();

  const handleJump = ({ url }: { url: string }) => {
    router.push(url);
  };

  const isActive = ({ url }: { url: string }) => {
    return pathname.includes(url);
  };

  return { handleJump, isActive };
}
